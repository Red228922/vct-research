# VCT 賽事分析與預測研究室

大學專題原型：中國區 Kickoff 30場300筆資料、歷史戰績、選手比較、Elo對局模擬，以及Stage 1的48場時間外推回測。跨賽區尚未匯入。

## 目前狀態

這是已備妥的部署專案，尚未上傳到 Red228922 的 GitHub，亦尚未部署到使用者的 Falix。

- 所有網站檔案位於 `public/`。`index.js` 以 Node.js 內建模組提供靜態檔案，無第三方依賴。
- `npm start` 或 `node index.js` 啟動；`npm test` 執行HTTP檢查。建議Node.js 22或24。
- 本機預設網址 `http://localhost:8080`。
- Falix 使用 `SERVER_PORT`，監聽 `0.0.0.0`；其他平台也支援 `PORT`。
- 網站訪客不需ChatGPT帳號。舊Sites的私人存取設定不會隨檔案搬移，新網址是否公開依新平台設定。
- 網站不會自動蒐集資料，也沒有真正的AI API後端。預測由瀏覽器依歷史資料計算。

## 1. 上傳 GitHub

1. 使用 Red228922 帳號建立儲存庫，建議名稱 `vct-research`。公開網站不一定要求程式公開；可按小組需求選Public或Private。
2. 將本資料夾內的 `index.js`、`package.json`、`test.cjs`、`README.md`、`.gitignore` 與整個 `public/` 上傳到儲存庫根目錄。
3. **先解壓縮再上傳檔案，不要只上傳ZIP。** 上傳後根目錄應直接看見 `index.js`；不要多包一層 `vct-research/`。
4. 建議主分支為 `main`。完成後複製GitHub實際顯示的儲存庫網址。

## 2. Falix 設定

1. 登入Falix，建立或選取能執行 **Node.js應用** 的伺服器。不要將現有Minecraft伺服器直接重裝，以免影響其他專案。
2. 選Node.js 22或24；Main file設定 `index.js`。啟動命令若可編輯，使用 `node index.js`。
3. 進入該應用的Git設定，使用Falix提供的連接方式選取GitHub儲存庫與 `main` 分支。公開儲存庫可用公開URL；私人儲存庫依Falix官方流程授權連接GitHub。
4. 部署到應用根目錄；本專案無需build命令。Falix啟動時可能自動執行npm install，本專案沒有外部套件。
5. 保留Falix配置的 `SERVER_PORT`，不要硬改為3000或8080。啟動後主控台應顯示 `Listening on port ...`。
6. 按Falix的網域/HTTPS設定取得實際公開網址，測試首頁與 `/health`，並讓組員使用另一個裝置或未登入狀態測試。

免費方案可能需要維持計時器，不能保證全天候上線；請以帳號面板的實際方案為準。不需要為測試先購買付費方案。

## Falix 官方文件（2026-10-22查閱）

- https://client.falixnodes.net/guides/languages/nodejs
- https://client.falixnodes.net/guides/deploy
- https://falixnodes.net/app-hosting

## 資料與研究限制

資料來源為VLR.gg公開比賽頁。Kickoff整體統計已依All Maps的All欄重新核對；Rating、KAST各缺50筆，顯示破折號而不補0。開賽時刻仍待確認，只使用比賽日期做回測。Stage1只在獨立驗證區呈現，不混入首頁Kickoff查詢資料。

Elo初始1500、K=32，雙方各至少2場歷史才評估；同日先預測再更新。Stage1 Elo判對34/48；與基準共同判斷的44場皆判對31場，尚未證明優於基準。此為已結束比賽的回溯驗證，不是事前公開的即時預測。模型未納入版本、陣容及期間國際賽，資料最晚到2026年5月，不能當作現在的隊伍實力。

第三方賽事資料的權利歸原權利人；未包含任何第三方資料的再授權承諾。
"# vct-research" 
