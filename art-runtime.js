/* Original pixel art and animation. Visual state never uses gameplay RNG. */
(function(){
 'use strict';
 const defaults={spriteSize:128,lowSpriteSize:64,attackFrameMs:140,idleFrameMs:500,enabled:true};
 const art=Object.assign({},defaults,CFG.art||{});
 for(const [key,min,max] of [['spriteSize',32,256],['lowSpriteSize',32,128],['attackFrameMs',60,300],['idleFrameMs',150,2000]])art[key]=Math.max(min,Math.min(max,Number(art[key])||defaults[key]));
 const rows=window.GameDatabase?.tables.artProfiles||[];
 const profiles=Object.fromEntries(rows.map(row=>[row.id,row]));
 const classes={WARRIOR:'sword',MAGE:'staff',FAIRY:'bow',ROGUE:'daggers'};
 const names={sword:'長劍',staff:'法杖',bow:'弓',daggers:'雙刃',blade:'火刃',hammer:'戰鎚'};
 const images=new Map(),actors=new Map(),strikes=new Map();
 let timer=0;
 const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const oldHero=SpriteSystem.hero.bind(SpriteSystem),oldEnemy=SpriteSystem.enemy.bind(SpriteSystem),oldPortrait=NPCSystem.render.bind(NPCSystem);
 function weapon(unit){const item=(unit?.gear||GameState.data?.hero?.gear||[]).find(g=>g.id===unit?.equipped?.weapon);return item&&Content.equipmentBases[item.base]?.weaponStyle;}
 function profile(unit,cls){return profiles[weapon(unit)]||profiles[classes[cls]]||profiles.sword;}
 function imageFor(src){
  if(!images.has(src)){const img=new Image();images.set(src,img);img.onload=()=>{redraw();};img.onerror=()=>{img.failed=true;};img.src=src;}
  return images.get(src);
 }
 function paint(canvas,unit,cls,id,now=performance.now()){
  paintFrame(canvas,profile(unit,cls),id,now,()=>oldHero(canvas,cls));
 }
 function monsterProfile(monsterId){const monster=Content.monsters.find(m=>m.id===monsterId);return profiles[monster?.spriteProfile]||profiles['monster_'+monsterId];}
 function paintEnemy(canvas,monsterId,id,now=performance.now()){
  paintFrame(canvas,monsterProfile(monsterId),id,now,()=>oldEnemy(canvas,monsterId));
 }
 function paintFrame(canvas,p,id,now,fallback){
  if(!canvas)return;
  const img=p&&imageFor(p.src);
  if(!art.enabled||!p||!img?.complete||!img.naturalWidth){canvas.classList.remove('pixel-actor');fallback();return;}
  const size=QualitySystem.low?art.lowSpriteSize:art.spriteSize;
  if(canvas.width!==size||canvas.height!==size){canvas.width=size;canvas.height=size;}
  const ctx=canvas.getContext('2d');ctx.clearRect(0,0,size,size);ctx.imageSmoothingEnabled=false;
  const started=strikes.get(id),elapsed=started===undefined?Infinity:now-started;
  const frame=reduced()?0:elapsed<art.attackFrameMs*3?1+Math.floor(elapsed/art.attackFrameMs):0;
  const bob=frame===0&&!reduced()&&Math.floor(now/art.idleFrameMs)%2?1:0;
  const w=img.naturalWidth/p.columns,h=img.naturalHeight/p.rows;
  ctx.save();if(!!p.flipX!==!!p.flipFrames?.[frame]){ctx.translate(size,0);ctx.scale(-1,1);}
  ctx.drawImage(img,frame*w,p.row*h,w,h,0,bob,size,size-bob);ctx.restore();
  canvas.dataset.artProfile=p.id;canvas.dataset.artFrame=String(frame);canvas.classList.add('pixel-actor');
 }
 function redraw(now=performance.now()){
  for(const [id,a] of actors){if(!a.canvas.isConnected){actors.delete(id);continue;}if(a.monsterId)paintEnemy(a.canvas,a.monsterId,id,now);else paint(a.canvas,a.unit,a.cls,id,now);}
 }
 function loop(now){timer=0;if(document.hidden||!BattleSystem.active)return;redraw(now);timer=requestAnimationFrame(loop);}
 function start(){if(!timer&&!document.hidden&&BattleSystem.active&&!reduced())timer=requestAnimationFrame(loop);}
 SpriteSystem.hero=function(canvas,cls){
  if(!canvas)return;const index=/^mercSprite(\d+)$/.exec(canvas.id),unit=index?MercenarySystem.battleMercs[+index[1]]:GameState.data?.hero;
  const id=index?'merc:'+unit?.id:'hero';actors.set(id,{canvas,unit,cls});paint(canvas,unit,cls,id);start();
 };
 SpriteSystem.enemy=function(canvas,monsterId){
  if(!canvas)return;const id='enemy:'+canvas.id.replace('enemySprite','');
  actors.set(id,{canvas,monsterId});paintEnemy(canvas,monsterId,id);start();
 };
 const animate=SpriteSystem.animate.bind(SpriteSystem);
 SpriteSystem.animate=function(attacker,index=BattleSystem.targetIndex){strikes.set(attacker==='hero'?'hero':'enemy:'+index,performance.now());animate(attacker,index);redraw();start();};
 // The attack pose also plays when an enemy targets a mercenary or misses.
 const enemyAct=BattleSystem.enemyAct.bind(BattleSystem);
 BattleSystem.enemyAct=function(index){const e=this.enemies[index];if(this.active&&e?.hp>0&&!['mark','summon','howl'].includes(e.intent)){strikes.set('enemy:'+index,performance.now());redraw();start();}return enemyAct(index);};
 const confusedAct=BattleSystem.confusedAct.bind(BattleSystem);
 BattleSystem.confusedAct=function(index){if(this.active&&this.enemies[index]?.hp>0){strikes.set('enemy:'+index,performance.now());redraw();start();}return confusedAct(index);};
 const act=MercenarySystem.act.bind(MercenarySystem);
 MercenarySystem.act=function(battle){for(const m of this.battleMercs)if(m.hp>0)strikes.set('merc:'+m.id,performance.now());return act(battle);};
 const stop=BattleSystem.stop.bind(BattleSystem);
 BattleSystem.stop=function(...args){if(timer)cancelAnimationFrame(timer);timer=0;actors.clear();strikes.clear();return stop(...args);};
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(timer);timer=0;}else start();});
 const draw=SpriteSystem.draw.bind(SpriteSystem);
 SpriteSystem.draw=function(){draw();const h=GameState.data?.hero,label=$('#heroWeapon');if(h&&label){const p=profile(h,h.cls);label.textContent=`武器：${names[p?.id]||'職業預設'} · ${EquipmentSystem.weaponElement()||'無'}屬性`;}};

 // Images survive innerHTML replacement; canvases lose their painted bitmap.
 NPCSystem.markup=function(key){const p=this.profiles[key];if(!p)return '';const row=window.GameDatabase?.tables.npcPortraits.find(r=>r.id===key),src=row?.src||`assets/npc-${key}.png`;return `<div class="npc-dialogue"><img class="npc-pixel-portrait" data-npc="${esc(key)}" src="${esc(src)}" width="128" height="128" alt="${esc(p.name)}的頭像"><div><strong>${esc(p.name)}</strong><small>${esc(p.role)}</small><p>「${esc(p.line)}」</p></div></div>`;};
 document.addEventListener('error',event=>{
  const img=event.target;if(!img?.classList?.contains('npc-pixel-portrait')||img.dataset.fallback)return;
  img.dataset.fallback='1';const canvas=document.createElement('canvas');oldPortrait(canvas,img.dataset.npc);img.src=canvas.toDataURL();
 },true);
 const resolve=NPCSystem.resolve.bind(NPCSystem);
 NPCSystem.resolve=function(title){if(/藥鋪|補給/.test(title))return 'herbalist';if(/商人|行商/.test(title))return 'merchant';return resolve(title);};
 const applyQuality=QualitySystem.apply.bind(QualitySystem);
 QualitySystem.apply=function(redraw=true){applyQuality(redraw);const button=$('#qualityBtn');button.textContent=this.low?'畫質・簡化':'畫質・標準';button.title=this.low?'切換標準畫質':'切換簡化畫質';button.setAttribute('aria-label',this.low?'簡化畫質：角色與怪物 64px':'標準畫質：角色與怪物 128px');};
 QualitySystem.apply(false);
 const create=renderCreate;
 renderCreate=function(){create();const keys=Object.keys(Content.classes);document.querySelectorAll('#classGrid .class-icon').forEach((icon,i)=>{const cls=keys[i],canvas=document.createElement('canvas'),unit={gear:[],equipped:{}};canvas.style.width='64px';canvas.style.height='64px';canvas.style.imageRendering='pixelated';canvas.setAttribute('aria-label',Content.classes[cls].name+'造型');icon.replaceChildren(canvas);actors.set('class:'+cls,{canvas,unit,cls});paint(canvas,unit,cls,'class:'+cls);});};
 function thumb(monsterId){const p=monsterProfile(monsterId);if(!p)return '';const y=p.rows>1?100*p.row/(p.rows-1):0;return `<span class="monster-thumb" aria-hidden="true" style="background-image:url('${p.src}');background-size:${p.columns*100}% ${p.rows*100}%;background-position:0 ${y}%;${!!p.flipX!==!!p.flipFrames?.[0]?'transform:scaleX(-1);':''}"></span>`;}
 window.PixelArtSystem={profile,paint,monsterProfile,paintEnemy,thumb,settings:art,profiles,redraw};
 for(const p of rows)imageFor(p.src);
 if(BattleSystem.active)SpriteSystem.draw();
})();
