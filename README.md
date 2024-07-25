# HomeAssisstant-Integration
## Intro
- 建立並整合 Home Assisstant 部分功能，並提供前端需要顯示的資訊
### API
- note
  - 只要有關於會爬取 home assistant web 的資料的 API，大約會等 10s 
- GET `api/turn_gate`
  - 回傳所有開關的設備的資訊
  - ![image](https://github.com/user-attachments/assets/20ff97fc-8095-42e7-bc2f-80f45e515238)
- POST `api/turn_gate`
  - 開啟/關閉 所有開關的設備
  - ![image](https://github.com/user-attachments/assets/132c630e-af7e-4e24-b256-ac00b431095d)
- GET `api/sensor`
  - 回傳所有 sensor 的資訊
  - ![image](https://github.com/user-attachments/assets/a269b246-e95f-43e5-ba97-4e7d5872d14c)
## Prerequisite
- python3
- node : v16 up
## Usage
- Create ssh tunnel (On Home Assistant Web Terminal)
  - `cd HaWebTunnelling`
  - `python3 main.py &`
- Create API Server
  - `cd API`
  - `node index.js`
