# 遊戲資料維護方式

## 數值設定

調整 `game-config.js`。機率以小數表示，例如 `0.03` 代表 3%。地圖寬高建議使用奇數，且寬度、長度至少為 7。

主要區塊：

- `loot`：難度掉寶倍率、稀有道具、裝備與套裝機率。
- `recovery`：體力回血、精神回魔、休整效果與免費次數。
- `exploration`：地圖尺寸、障礙量、怪物數、步數與疲勞傷害。
- `difficulty`：普通／困難敵人與獎勵倍率。
- `economy`：村莊特價及戰敗金幣損失。
- `battle`：自動技能、道具次數與屬性相剋倍率。
- `art`：原生像素尺寸、攻擊影格速度、待機速度與 NPC 肖像尺寸。

## 資料表

調整 `game-database.js` 的 `tables`，結構類似 SQL 資料表：

- `materials`：素材主檔。
- `consumables`：消耗品主檔與商店價格。
- `equipment`：裝備主檔。
- `monsters`：怪物基礎能力；`artRole` 決定像素造型及武器模組。
- `lootDrops`：怪物與素材的掉落關聯。
- `regionalDrops`：所有怪物共用的消耗品掉落。
- `regions`、`quests`、`affixes`、`sets`：區域、任務、詞綴與套裝。

每列的 `id` 是主鍵。`lootDrops.monsterId` 對應 `monsters.id`，`itemId` 對應 `materials.id`；`quests.floor` 對應 `regions.id`，每個區域樓層只能有一筆任務。

`monsters.artRole` 可用值目前包含 `wolf`、`boar`、`claws`、`cleaver`、`talisman`、`spear`、`glaiveBoss`、`spider`、`mantis`、`beetle`、`hawk`、`bat`、`raptor`、`daggersLizard`、`staffLizard`、`shieldLizard` 與各首領變體。主角職業對應維護於 `pixel-art.js` 的 `HERO_ROLES`。

## 新增欄位

1. 先在 `schemas` 對應資料表新增欄位與預設值。
2. 在新資料列填入新欄位。
3. 載入遊戲時 `migrate()` 會替過往未填資料列補上預設值。
4. `validate()` 會檢查重複主鍵、遺失外鍵與不合法掉落率。
5. 每次改版同步更新遊戲內 `ChangeLogSystem` 與 `CHANGELOG.md`。

## 每次發布前檢查

- 確認新功能是否需要新增或調整 `game-config.js` 參數。
- 確認資料表欄位與 `schemas` 預設值一致。
- 確認新舊資料列都具備必要欄位，並執行 `migrate()` 補齊。
- 執行 `validate()` 檢查主鍵、外鍵、樓層關聯與機率範圍。


## v0.22.1 美術維護

- `game-config.js` 的 `art`：`enabled` 控制戰鬥像素角色；`spriteSize`／`lowSpriteSize` 控制標準／簡化解析度；`attackFrameMs` 控制每個攻擊影格毫秒，`idleFrameMs` 控制待機節奏。
- `equipment.weaponStyle`：`sword`、`bow`、`staff`、`blade`、`hammer`；未裝備時由職業預設選取，盜賊預設 `daggers`。武器造型優先，換裝不變更職業或戰鬥能力。同類不同等級共用動作。
- `artProfiles`：`id` 主鍵、`src` PNG 圖集路徑、`row` 零起算角色列、`columns` 固定4、`rows` 圖集列數。四欄依序為待機、預備、出手、收勢。
- `npcPortraits`：`id` 對應 NPCSystem.profiles、`src` 為獨立頭像檔。新增 NPC 時同時補資料列及圖片。
- Schema v4 的遷移會補 `weaponStyle`，並為既有五種武器主鍵補對應造型；新增武器須填入明確造型。驗證檢查外鍵及圖集座標。
- 頭像使用 `<img>`，不可重新改成只繪製一次的 Canvas，否則對話內容重寫會清空影像。
- 此版是戰鬥四幀造型，沒有新增四方向行走骨架；地圖操作保持既有規則。

## v0.23.0 怪物美術維護

- `monsters.spriteProfile` 外鍵指向 `artProfiles.id`。20 種既有怪物都各有獨立圖集列，包含首領。
- `artProfiles.flipX` 是水平翻轉旗標，預設 false；圖集中的怪物預設朝左，若新素材朝右可改 true。
- `artProfiles.flipFrames` 為四個布林值，逐幀控制額外水平翻轉，與 flipX 疊加；用於修正個別動作朝向，預設均 false。
- 每個怪物圖集為 4 欄 × 4 列；四欄為待機、預備、攻擊、收勢。五個 `assets/monsters-*.png` 各對應一族。
- 舊資料缺少 spriteProfile 時，會以 `monster_` 加怪物 id 找到同名圖集並補齊。新怪物需先建立圖集資料，外鍵缺失會阻擋資料驗證。
- 主角與敵人共用 `art.spriteSize`、`lowSpriteSize`、`attackFrameMs`、`idleFrameMs`。此次 CONFIG 結構不變，維持 v3。
- `artRole` 仍保留供圖片載入失敗時的舊繪製容錯使用，不影響怪物能力。
