# VCT 賽事分析與預測研究室

大學專題原型：中國區 Kickoff 30場300筆資料、歷史戰績、選手比較、Elo對局模擬，以及Stage 1的48場時間外推回測。跨賽區尚未匯入。

## 目前狀態

既有版本已在 Red228922/vct-research 與 https://vctresearch.falix.org/ 上線。本機多賽區06版本需提交到GitHub後才會更新公開網站。

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


## 2026-10-23 近期表現比較更新

新增獨立Stage 2驗證區與三方法對局模擬。方法固定為80% Elo分數＋20%近期戰績比較；最近5場邊界同日全數納入。Kickoff及Stage1作歷史，Stage2每日先預測再更新；不含期間國際賽。66場來源中62場符合歷史門檻、4場冷啟動；Elo與近期模型均34/62，基準34/61。三方法共同61場，Elo及近期模型33/61、基準34/61，未顯示新模型優勢。不能因加入新方法就宣稱更準。設定於下載Stage2前保存，未依Stage2結果調參。首頁查詢仍只含Kickoff，本區模擬另使用截至Stage2的歷史。


## 多賽區研究版06

新增中國、太平洋、EMEA的Kickoff賽區切換，共90場900筆。隊伍篩選、戰績、選手比較與對局模擬皆依所選賽區限定。每區獨立初始化評分；中國Stage1/Stage2延伸研究只在選中國時顯示。太平洋/EMEA仍只有Kickoff單賽事回測，尚非較晚賽事獨立驗證。

太平洋Elo 7/12、EMEA 9/11；符合門檻但平手時棄權。三方法共同樣本只有9場與3場，不可只依高百分比宣稱較好或比較賽區強弱。所有區的未確認開賽時刻保留待核對。npm test涵蓋HTTP檔案、Stage2計算、三賽區隔離及90場瀏覽器/Python一致性。


## 多賽區研究版07
對局預測移至首頁賽區資訊下方、分析分頁之前；EMEA顯示為歐洲、中東及非洲。新增太平洋與歐洲中東非洲各42場Stage1後續驗證，與Kickoff回測分開呈現。上方模擬仍只用Kickoff歷史。太平洋Elo28/42、近期29/42；另一區Elo26/40、近期25/40，另2場冷啟動。近期模型無一致改善證據。
