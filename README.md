# HomeAssisstant-Integration
## Intro
- 建立並整合 Home Assisstant 部分功能，並提供前端需要顯示的資訊
- 使用 Express 建立 API Server，前端只需呼叫 API 即可拿到 Home Assisstant 相關資料
- API 格式須符合 Restful API
### API
- note
  - 只要有關於會爬取 home assistant web 的資料的 API，大約會等 10s(現在沒有爬蟲了) 
- GET `api/history_data`
  - 回傳所有開關的設備的歷史資訊
    ```
    testAPI.py
    ```
- GET `api/turn_gate`
  - 回傳所有開關的設備的資訊
    ```
    testAPI.py
    ```
- POST `api/turn_gate`
  - 開啟/關閉 所有開關的設備
    ```
    testAPI.py
    post設為on or off
    ```
- GET `api/sensor`
  - 回傳所有 sensor 的資訊
    ```
    testAPI.py
    ```
## Prerequisite
- python3
- node : v16 up
## Usage
- clone repo
  - `git clone https://github.com/krixi0131/HomeAssisstantIntegration.git`
- Create ssh tunnel (On Home Assistant Web Terminal)
  - `cd HaWebTunnelling`
  - `python3 main.py &`
- Create API Server
  - `cd API`
  - `node node_modules\puppeteer\install.mjs`
  - `node index.js`
  - API Server is open on 127.0.0.1:8122
## Known issues
- 有時候回傳資料錯誤是因為爬取網頁會不成功：可以嘗試把 crawler.js 的 await sleep 設久一點
## Future Work
- API
  - 感應器歷史資料
  - 設備歷史資料
- 可以寫個 test script test API
## 教學
### 新增 API
1. 到 `index.js` 新增 url route (可以參考 `index.js` 裡面的 `api/turn_gate` and `api/sensor`)
2. 新增處理 request 的 js (可以參考 `api/turn_gate.js` and `api/sensor.js`)
3. 針對新的資料去改寫 `utilities/crawler.js`，不同資料用爬蟲做到解析不同的網頁元素
