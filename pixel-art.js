/* 亂世殘卷原創 64px 像素角色模組 v1
 * 以程式繪製，不包含外部網站的角色圖或素材。
 * 職業與怪物的 artRole 可在 game-database.js 維護，速度可在 game-config.js 調整。
 */
(function(){
 'use strict';
 const ART=(window.GameConfig&&window.GameConfig.art)||{};
 const SIZE=ART.pixelSize||64,FRAME_MS=ART.attackFrameMs||90;
 const HERO_ROLES={WARRIOR:'greatblade',MAGE:'staff',FAIRY:'bow',ROGUE:'daggers'};
 const NPC_ROLES={herbalist:'herbalist',smith:'smith',elder:'elder',trainer:'trainer',sage:'sage',guide:'guide',merchant:'merchant',inn:'inn',quest1:'herbalist',quest2:'sage',quest3:'scout',quest4:'traveler',quest5:'scholar'};
 const ROLE_COLORS={
  greatblade:['#b54f35','#e7aa55','#f2c694'],staff:['#3e568f','#8a62a2','#edc69a'],bow:['#3e8058','#91b85e','#edc69a'],daggers:['#355f67','#914551','#d9a97f'],
  cleaver:['#814433','#c47745','#d6a37c'],talisman:['#7a453c','#d2ad46','#d5a47e'],spear:['#455d76','#8094a1','#d3a17b'],glaiveBoss:['#283f5f','#a65a42','#d7a47c'],
  claws:['#5e503f','#9b805b','#b68a66'],clawsBoss:['#493a32','#b15d3e','#b88a65'],daggersLizard:['#326052','#6d9b68','#9dbb82'],staffLizard:['#335c54','#6e769f','#a6bf87'],shieldLizard:['#385d50','#879965','#9fbb82'],glaiveLizardBoss:['#25483f','#a45d3d','#a9c687']
 };
 const timers=new WeakMap();
 function ctx(canvas,w=SIZE,h=SIZE){canvas.width=w;canvas.height=h;canvas.style.imageRendering='pixelated';const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,w,h);return c}
 function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
 function poly(c,pts,color){c.fillStyle=color;c.beginPath();c.moveTo(Math.round(pts[0][0]),Math.round(pts[0][1]));for(let i=1;i<pts.length;i++)c.lineTo(Math.round(pts[i][0]),Math.round(pts[i][1]));c.closePath();c.fill()}
 function line(c,x1,y1,x2,y2,color,w=1){c.strokeStyle=color;c.lineWidth=w;c.lineCap='square';c.beginPath();c.moveTo(Math.round(x1)+.5,Math.round(y1)+.5);c.lineTo(Math.round(x2)+.5,Math.round(y2)+.5);c.stroke()}
 function eye(c,x,y,angry=false,color='#18252b'){rect(c,x,y,3,2,'#f3e5ce');rect(c,x+(angry?0:1),y,1,2,color);if(angry)line(c,x-1,y-2,x+3,y-1,'#24272b',1)}
 function shadow(c,boss){rect(c,boss?13:18,56,boss?40:30,3,'#07131988');rect(c,boss?17:21,55,boss?32:24,1,boss?'#d4a65955':'#73958b55')}
 function roleForMonster(id){return Content.monsters.find(m=>m.id===id)?.artRole||id}
 function isLizard(role){return /Lizard/.test(role)}
 function drawWeapon(c,role,frame,flip){
  const ink='#17242b',metal='#d9ddd2',gold='#d3a954',wood='#714b32',push=frame===2?4:frame===1?1:0,s=flip?-1:1,ox=flip?64:0;
  const X=x=>ox+s*x;
  if(role==='greatblade'){
   line(c,X(34),43-push,X(55),17-push,ink,5);line(c,X(34),43-push,X(55),17-push,gold,2);poly(c,[[X(50),20-push],[X(58),8-push],[X(63),8-push],[X(60),17-push],[X(54),23-push]],metal)
  }else if(/staff/.test(role)){
   line(c,X(48),20-push,X(51),57,ink,4);line(c,X(48),20-push,X(51),57,wood,2);rect(c,X(44)-(flip?4:0),13-push,8,8,frame===2?'#f4d16b':'#8bb8d1');rect(c,X(46)-(flip?2:0),15-push,4,4,'#eef3c8')
  }else if(role==='bow'){
   line(c,X(48),16,X(57),47,wood,3);line(c,X(48),16,X(48),49,'#dfd8ae',1);line(c,X(31),34,X(57+push),31,'#d6c09a',2);poly(c,[[X(57+push),29],[X(63+push),31],[X(57+push),33]],metal)
  }else if(/daggers/.test(role)){
   poly(c,[[X(27-push),36],[X(12-push*2),28],[X(17-push),38]],metal);poly(c,[[X(39+push),34],[X(55+push*2),22],[X(49+push),37]],metal);rect(c,X(25)-(flip?3:0),35,5,3,gold);rect(c,X(37)-(flip?3:0),34,5,3,gold)
  }else if(role==='cleaver'){
   line(c,X(41),34-push,X(54),18-push,wood,4);poly(c,[[X(51),20-push],[X(56),9-push],[X(64),13-push],[X(59),25-push]],metal)
  }else if(role==='talisman'){
   rect(c,X(47)-(flip?8:0),20-push,8,13,'#e3c35f');line(c,X(49),23-push,X(53),29-push,'#9e493b',1);line(c,X(53),23-push,X(49),29-push,'#9e493b',1)
  }else if(/glaive|spear/.test(role)){
   line(c,X(28),45,X(57),12-push,wood,4);poly(c,[[X(53),16-push],[X(58),5-push],[X(63),13-push],[X(58),19-push]],metal);if(/glaive/.test(role))poly(c,[[X(49),17-push],[X(58),6-push],[X(55),22-push]],gold)
  }else if(/shield/.test(role)){
   poly(c,[[X(40),29],[X(54),27],[X(57),43],[X(48),51],[X(39),43]],'#7d8e63');rect(c,X(46)-(flip?4:0),34,5,8,gold)
  }else if(/claws/.test(role)){
   for(let i=0;i<3;i++)line(c,X(43),33+i*3,X(58+push),27+i*2,metal,2)
  }
 }
 function drawHuman(canvas,role,frame=0,enemy=false,boss=false){
  const c=ctx(canvas),colors=ROLE_COLORS[role]||['#465a67','#82939a','#d4a37d'],main=colors[0],trim=colors[1],skin=colors[2],ink='#17242b',lizard=isLizard(role),flip=enemy,bob=frame===1?-1:frame===3?1:0,lean=frame===2?(flip?-3:3):0;
  shadow(c,boss);if(boss){rect(c,17,7,30,2,'#b88b46');rect(c,20,5,4,5,'#d8b361');rect(c,30,2,4,8,'#e6c76f');rect(c,40,5,4,5,'#d8b361')}
  rect(c,22+lean,46+bob,8,10,'#263b43');rect(c,35+lean,46+bob,8,10,'#263b43');rect(c,18+lean,54+bob,13,4,'#172b34');rect(c,34+lean,54+bob,14,4,'#172b34');
  poly(c,[[18+lean,28+bob],[45+lean,27+bob],[49+lean,48+bob],[38+lean,51+bob],[32+lean,44+bob],[27+lean,51+bob],[15+lean,47+bob]],main);rect(c,17+lean,38+bob,31,4,trim);rect(c,29+lean,37+bob,6,6,'#d2a951');
  rect(c,14+lean,31+bob,8,14,main);rect(c,43+lean,29+bob,8,14,main);rect(c,17+lean,42+bob,6,5,skin);rect(c,44+lean,40+bob,6,5,skin);
  poly(c,[[20+lean,12+bob],[26+lean,7+bob],[41+lean,8+bob],[47+lean,15+bob],[45+lean,27+bob],[38+lean,34+bob],[25+lean,32+bob],[18+lean,25+bob]],skin);
  if(lizard){poly(c,[[20+lean,16+bob],[18+lean,5+bob],[26+lean,11+bob],[31+lean,3+bob],[35+lean,12+bob],[46+lean,6+bob],[45+lean,19+bob]],'#315b4c');rect(c,23+lean,22+bob,3,2,'#d9bd59');rect(c,38+lean,21+bob,3,2,'#d9bd59')}
  else{poly(c,[[19+lean,18+bob],[20+lean,9+bob],[29+lean,5+bob],[42+lean,7+bob],[48+lean,14+bob],[44+lean,19+bob],[39+lean,13+bob],[34+lean,18+bob],[29+lean,12+bob],[24+lean,20+bob]],'#24343a');eye(c,24+lean,22+bob,enemy);eye(c,38+lean,21+bob,enemy)}
  if(enemy){line(c,27+lean,29+bob,37+lean,27+bob,'#743b38',2)}else if(role==='greatblade'){rect(c,28+lean,28+bob,10,2,'#f0dfc8');rect(c,32+lean,28+bob,1,2,ink)}else line(c,29+lean,28+bob,37+lean,28+bob,'#80574d',1);
  drawWeapon(c,role,frame,flip)
 }
 function drawCreature(canvas,role,frame=0,boss=false){
  const c=ctx(canvas),ink='#17242b',bob=frame===1?-1:frame===3?1:0;shadow(c,boss);
  if(/wolf|boar/.test(role)){
   const boar=role==='boar';rect(c,16,31+bob,33,18,boar?'#7e644e':'#66756d');poly(c,[[42,31+bob],[50,22+bob],[59,28+bob],[57,43+bob],[47,48+bob]],boar?'#88684d':'#72847a');poly(c,[[48,24+bob],[50,16+bob],[54,24+bob]],'#3b443f');rect(c,50,29+bob,3,2,'#e0b557');rect(c,20,47+bob,6,10,ink);rect(c,40,47+bob,6,10,ink);if(boar){line(c,54,38+bob,62,34+bob,'#e4d8b8',2);line(c,54,40+bob,62,44+bob,'#e4d8b8',2)}else poly(c,[[17,34+bob],[7,24+bob],[12,41+bob]],'#53655e')
  }else if(/spider/.test(role)){
   rect(c,25,25+bob,16,22,'#4b4358');rect(c,20,35+bob,26,17,boss?'#8a5164':'#66556f');for(let i=0;i<4;i++){line(c,23,31+i*5,7,22+i*10,ink,2);line(c,43,31+i*5,59,22+i*10,ink,2)}rect(c,28,29+bob,3,3,'#e8c163');rect(c,36,29+bob,3,3,'#e8c163')
  }else if(role==='mantis'||role==='beetle'){
   rect(c,25,19+bob,15,31,role==='mantis'?'#79915f':'#5f718c');rect(c,22,24+bob,21,15,'#879c6c');eye(c,25,22+bob,true,'#7b3438');eye(c,36,22+bob,true,'#7b3438');line(c,25,35,7,22-frame*2,'#99aa78',3);line(c,40,35,58,22-frame*2,'#99aa78',3);line(c,28,45,16,57,ink,2);line(c,38,45,50,57,ink,2)
  }else{
   const bat=role==='bat',col=bat?'#62647f':'#839da3';poly(c,[[30,28+bob],[8,16-frame*2],[15,42+bob],[31,48+bob]],col);poly(c,[[34,28+bob],[56,16-frame*2],[50,42+bob],[33,48+bob]],col);rect(c,27,23+bob,11,25,col);eye(c,27,25+bob,true,'#71413e');eye(c,35,25+bob,true,'#71413e');if(!bat)poly(c,[[37,29+bob],[48,32+bob],[38,35+bob]],'#d5a45f')
  }
  if(boss){rect(c,19,9,26,2,'#c4964c');poly(c,[[21,10],[23,3],[29,9],[33,1],[38,9],[43,3],[44,11]],'#d8b15a')}
 }
 const PixelSpriteSystem={
  roles:HERO_ROLES,
  paint(canvas,type,key,frame=0){if(!canvas)return;const role=type==='hero'?(HERO_ROLES[key]||'spear'):roleForMonster(key),boss=/Boss|Lord|Roc/.test(role)||Content.monsters.find(m=>m.id===key)?.boss;canvas.dataset.pixelRole=role;canvas.dataset.pixelKey=key;canvas.dataset.pixelType=type;if(['wolf','boar','spider','spiderBoss','mantis','beetle','hawk','bat','raptor','rocBoss'].includes(role))drawCreature(canvas,role,frame,boss);else drawHuman(canvas,role,frame,type!=='hero',boss)},
  npc(canvas,key){const p=NPCSystem.profiles[key],role=NPC_ROLES[key]||'scholar',c=ctx(canvas,ART.npcPortraitSize||64,ART.npcPortraitSize||64),skin=p?.skin||'#d5a47e',cloth=p?.cloth||'#536b74',hair=p?.hair||'#30383c',ink='#17242b';canvas.dataset.npc=key;canvas.setAttribute('aria-label',(p?.name||'人物')+'的原創64像素頭像');rect(c,0,0,64,64,'#13242b');rect(c,2,2,60,60,'#1d343d');rect(c,11,47,42,17,cloth);poly(c,[[15,30],[18,15],[28,8],[43,10],[50,20],[48,41],[40,50],[25,49],[15,41]],skin);poly(c,[[15,28],[16,15],[27,7],[43,9],[50,18],[46,27],[41,18],[35,23],[29,16],[23,25]],hair);eye(c,22,31,key==='smith'||key==='trainer');eye(c,39,30,key==='smith'||key==='trainer');line(c,28,40,38,39,key==='merchant'?'#89564c':'#765048',1);if(p?.beard){rect(c,23,40,20,11,hair);rect(c,28,51,10,5,hair)}if(role==='herbalist'){rect(c,46,9,4,11,'#86a56e');rect(c,50,7,5,5,'#a8c286')}if(role==='smith'){rect(c,5,50,15,4,'#b8bab0');rect(c,8,46,4,14,'#70503b')}if(role==='merchant'){rect(c,45,47,9,9,'#d2ac59');rect(c,48,50,3,3,'#6d5432')}if(role==='sage'||role==='scholar'){rect(c,15,11,35,4,cloth);rect(c,21,5,6,8,cloth);rect(c,39,5,6,8,cloth)}if(role==='guide'){poly(c,[[10,30],[14,10],[32,2],[52,15],[55,49],[47,40],[47,21],[31,12],[18,23],[18,44]],cloth)}rect(c,0,0,64,2,'#c1a46b');rect(c,0,62,64,2,'#c1a46b');rect(c,0,0,2,64,'#c1a46b');rect(c,62,0,2,64,'#c1a46b')}
 };
 window.PixelSpriteSystem=PixelSpriteSystem;

 const originalPaint=SpriteSystem.paint.bind(SpriteSystem),originalAnimate=SpriteSystem.animate.bind(SpriteSystem);
 SpriteSystem.paint=function(canvas,type,key){if(QualitySystem.low)return PixelSpriteSystem.paint(canvas,type,key,0);return originalPaint(canvas,type,key)};
 SpriteSystem.animate=function(attacker,index=BattleSystem.targetIndex){originalAnimate(attacker,index);if(!QualitySystem.low||attacker==='hero'||window.PixelArtSystem?.settings.enabled)return;const canvas=attacker==='hero'?document.querySelector('#heroSprite'):document.querySelector('#enemySprite'+index);if(!canvas)return;const old=timers.get(canvas);if(old)clearTimeout(old);let frame=1;const next=()=>{const type=canvas.dataset.pixelType||'hero',key=canvas.dataset.pixelKey||(type==='hero'?GameState.data.hero.cls:BattleSystem.enemies[index]?.id);PixelSpriteSystem.paint(canvas,type,key,frame);frame++;if(frame<=3)timers.set(canvas,setTimeout(next,FRAME_MS));else timers.set(canvas,setTimeout(()=>PixelSpriteSystem.paint(canvas,type,key,0),FRAME_MS))};next()};
 NPCSystem.render=function(canvas,key){if(!canvas||!NPCSystem.profiles[key])return;PixelSpriteSystem.npc(canvas,key)};
 const originalQualityApply=QualitySystem.apply.bind(QualitySystem);
 QualitySystem.apply=function(redraw=true){originalQualityApply(redraw);const b=document.querySelector('#qualityBtn');if(this.low&&b){b.textContent='畫質・像素';b.setAttribute('aria-label','畫質：原生64像素動作模式');b.title='切換回目前的原畫風格'}const portrait=document.querySelector('#npcPortrait'),key=portrait?.dataset.npc;if(portrait&&key)NPCSystem.render(portrait,key)};
 document.body.classList.add('pixel-module-ready');
 QualitySystem.apply(false);
})();

