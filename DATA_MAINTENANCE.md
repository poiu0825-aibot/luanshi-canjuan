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

## 資料表

調整 `game-database.js` 的 `tables`，結構類似 SQL 資料表：

- `materials`：素材主檔。
- `consumables`：消耗品主檔與商店價格。
- `equipment`：裝備主檔。
- `monsters`：怪物基礎能力。
- `lootDrops`：怪物與素材的掉落關聯。
- `regionalDrops`：所有怪物共用的消耗品掉落。
- `regions`、`quests`、`affixes`、`sets`：區域、任務、詞綴與套裝。

每列的 `id` 是主鍵。`lootDrops.monsterId` 對應 `monsters.id`，`itemId` 對應 `materials.id`。

## 新增欄位

1. 先在 `schemas` 對應資料表新增欄位與預設值。
2. 在新資料列填入新欄位。
3. 載入遊戲時 `migrate()` 會替過往未填資料列補上預設值。
4. `validate()` 會檢查重複主鍵、遺失外鍵與不合法掉落率。
5. 每次改版同步更新遊戲內 `ChangeLogSystem` 與 `CHANGELOG.md`。
