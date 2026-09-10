/* 將 game-config.js 的設定接到遊戲系統。修改 CONFIG 後不必改核心程式。 */
(function(){
 'use strict';
 const C=window.GameConfig;if(!C)return;
 const E=C.exploration,R=C.recovery,L=C.loot,D=C.difficulty,B=C.battle;
 const boundedInt=(value,min,max)=>Math.max(min,Math.min(max,Math.floor(Number(value)||min)));
 E.mapWidth=boundedInt(E.mapWidth,7,41);E.mapHeight=boundedInt(E.mapHeight,7,31);
 if(E.mapWidth%2===0)E.mapWidth++;if(E.mapHeight%2===0)E.mapHeight++;

 DifficultySystem.lootMultiplier=function(){return this.hard()?L.hardMultiplier:L.normalMultiplier};
 DifficultySystem.chance=function(base){return Math.min(L.maximumChance,Math.max(0,base*this.lootMultiplier()))};
 DifficultySystem.questMultiplier=function(){return (this.hard()?D.hard:D.normal).questReward};
 DifficultySystem.enemy=function(){return {...(this.hard()?D.hard:D.normal)}};
 MarketSystem.discount=C.economy.villageSaleMultiplier;
 MarketSystem.roll=function(){const f=GameState.data.flags||(GameState.data.flags={});f.marketSale=Math.random()<C.economy.villageSaleChance;f.saleNoticePending=f.marketSale;return f.marketSale};
 ElementSystem.multiplier=function(weapon,enemy){if(!weapon||!enemy)return 1;if(this.beats[weapon]===enemy)return B.elementAdvantage;if(this.beats[enemy]===weapon)return B.elementDisadvantage;return 1};
 EquipmentSystem.dropChance=function(enemy){const q=L.equipment;return enemy.boss?q.boss:Math.min(q.normalCap,q.normalBase+(enemy.tier||1)*q.normalTier+dFloor()*q.normalFloor)};
 EquipmentSystem.setChance=function(enemy){const q=L.equipment;return enemy.boss?q.bossSet:Math.min(q.setCap,q.setBase+(enemy.tier||1)*q.setTier+dFloor()*q.setFloor)};
 EquipmentSystem.rollNecklace=function(enemy){if(!enemy.boss||Math.random()>=DifficultySystem.chance(L.equipment.necklaceBoss))return null;return this.create(`autoNecklace${this.dropLevel(enemy)}`,['automatic'],'boss')};
 LootSystem.fullRestoreChance=function(enemy){const tier=enemy?.tier||1,q=L.fullRestoreChance,base=enemy?.boss?q.boss:tier>=3?q.tier3:tier>=2?q.tier2:q.tier1;return DifficultySystem.chance(base)};
 RecoverySystem.tick=function({incense=false,log=false}={}){const h=GameState.data.hero;if(h.hp<=0)return;const hp=Math.min(h.maxHp-h.hp,Math.floor(h.stats.vit/R.vitalityPerStep)*R.hpPerVitalityStep),mp=Math.min(h.maxMp-h.mp,Math.floor(h.stats.spr/R.spiritPerStep)*R.mpPerSpiritStep+EquipmentSystem.effects().mp+(incense?R.incenseMp:0));h.hp+=hp;h.mp+=mp;if(log&&(hp||mp))UI.log(`體力與精神恢復 ${hp} HP、${mp} MP。`,'good');return{hp,mp}};

 DungeonSystem.generate=function(floor,depth=1,difficulty='normal'){
  const region=Content.regions[floor],hard=difficulty==='hard',width=E.mapWidth,height=E.mapHeight,lastX=width-2,lastY=height-2;
  RNG.set((Date.now()^(floor*7919)^(depth*1543)^(hard?0x5f3759df:0))>>>0);
  const grid=Array.from({length:height},()=>Array(width).fill(1));for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++)grid[y][x]=0;
  const obstacles=Math.floor(E.obstacleBase+floor*E.obstaclePerFloor+depth*E.obstaclePerDepth);for(let i=0;i<obstacles;i++){const x=RNG.int(1,lastX),y=RNG.int(1,lastY);if(x+y>4)grid[y][x]=1}
  for(let x=1;x<=lastX;x++)grid[1][x]=0;for(let y=1;y<=lastY;y++)grid[y][1]=0;grid[2][2]=0;
  const reachable=this.bfs(grid,1,1),far=[...reachable].map(k=>k.split(',').map(Number)).sort((a,b)=>(b[0]+b[1])-(a[0]+a[1])),exit=far[0]||[lastX,lastY],startPos=depth>1?{x:1,y:2}:{x:1,y:1},exitKey=`${exit[0]},${exit[1]}`,events={};
  const available=far.slice(1).map(([x,y])=>`${x},${y}`).filter(k=>k!==exitKey&&k!=='1,1'&&k!==`${startPos.x},${startPos.y}`);for(let i=available.length-1;i>0;i--){const j=RNG.int(0,i);[available[i],available[j]]=[available[j],available[i]]}
  const bossKey=available.shift();if(bossKey)events[bossKey]='boss';
  const monsterBase=E.normalMonsterBase+floor*E.monsterPerFloor+depth*E.monsterPerDepth+(hard?E.hardExtraMonsters:0),monsterCount=Math.ceil(monsterBase*E.monsterMultiplier),plan=[...Array(E.npcEvents).fill('npc'),...Array(E.merchantEvents).fill('merchant'),...Array(E.recoveryEvents).fill('recovery'),...Array(E.chestEvents).fill('chest'),...Array(monsterCount).fill('monster')];
  for(const event of plan){const key=available.shift();if(key)events[key]=event}if(depth<3||floor<5)events[exitKey]='lockedExit';if(depth>1)events['1,1']='up';
  return{floor,depth,difficulty,region:region.key,grid,pos:startPos,seen:{},events,restCount:0,steps:0,seed:RNG.seed,quest:null,bossCleared:false,hasKey:false,keyRules:1,bossKey,exitKey,mapWidth:width,mapHeight:height}
 };
 DungeonSystem.resetEnemies=function(d){this.normalizeLayer(d);for(const [k,v] of Object.entries(d.events))if(v==='monster')delete d.events[k];const candidates=[...this.bfs(d.grid,1,1)].filter(k=>!d.events[k]&&k!==d.exitKey&&k!==`${d.pos.x},${d.pos.y}`&&k!=='1,1'),base=E.resetMonsterBase+d.floor*E.monsterPerFloor+(d.difficulty==='hard'?E.hardExtraMonsters:0),count=Math.ceil(base*E.monsterMultiplier);for(let i=0;i<count&&candidates.length;i++){const j=RNG.int(0,candidates.length-1);d.events[candidates.splice(j,1)[0]]='monster'}};
 DungeonSystem.spendStep=function({recover=true}={}){const d=GameState.data.dungeon,h=GameState.data.hero;if(!d)return true;d.steps++;if(recover)RecoverySystem.tick();if(d.steps>E.safeSteps){const loss=Math.max(1,Math.ceil(h.maxHp*E.overtimeHpRate));h.hp=Math.max(0,h.hp-loss);UI.log(`探索逾時（${d.steps}/${E.safeSteps}）：失去 ${loss} HP。`,'bad');EquipmentSystem.tryAutoSalve()}if(h.hp>0)return true;if(BattleSystem.active){BattleSystem.defeat();return false}if(h.items.scroll>0&&confirm('是否使用復歸卷原地恢復？')){h.items.scroll--;h.hp=Math.max(1,Math.floor(h.maxHp*.5));h.mp=Math.floor(h.maxMp*.5);return true}const lost=Math.floor(h.gold*C.economy.retreatGoldLossRate);h.gold-=lost;h.hp=h.maxHp;h.mp=h.maxMp;UI.close();this.retreat();UI.log(`探索耗盡體力，被送回村落，損失 ${lost} 金。`,'bad');return false};
 DungeonSystem.camp=function(){const d=GameState.data.dungeon,h=GameState.data.hero;if(!d||BattleSystem.active)return;d.restCount=(d.restCount||0)+1;h.hp=Math.min(h.maxHp,h.hp+Math.floor(h.maxHp*R.campHpRate));h.mp=Math.min(h.maxMp,h.mp+Math.floor(h.maxMp*R.campMpRate));MercenarySystem.recover(R.campHpRate,R.campMpRate);UI.log(`簡易休整第 ${d.restCount} 次${d.restCount>R.freeCampsPerFloor?'，步數 +1':'，不增加步數'}。`,'good');if(d.restCount>R.freeCampsPerFloor&&!this.spendStep())return;GameState.save();this.render()};
 const render=DungeonSystem.render.bind(DungeonSystem);DungeonSystem.render=function(){render();const d=GameState.data.dungeon;if(!d)return;const map=$('#map');map.style.setProperty('--map-columns',d.grid[0].length);map.setAttribute('aria-label',`${Content.regions[d.floor].n}，${d.grid[0].length}欄${d.grid.length}列地圖`);const info=$('#dungeonInfo');if(info)info.innerHTML=info.innerHTML.replace(/步數：<strong>\d+\/\d+<\/strong>/,`步數：<strong>${d.steps}/${E.safeSteps}</strong>`);$('#campBtn').textContent=(d.restCount||0)<R.freeCampsPerFloor?`休整（免費${R.freeCampsPerFloor-(d.restCount||0)}次）`:'休整（步數+1）'};
 console.info(`亂世殘卷設定已載入｜CONFIG v${C.schemaVersion}｜DB v${window.GameDatabase?.schemaVersion||'內建'}`);
})();
