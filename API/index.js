//基於 Node.js Express 的主要設定檔
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = require('http').Server(app);

//bodyParser: 解析 HTTP 請求的 body
app.use(bodyParser.urlencoded({ extended: false }));
//express.json: 處理 JSON 資料
app.use(express.json());
app.use(cookieParser()); //解析 HTTP 請求的 cookie
const cors = require('cors');
app.use(cors({origin: true, credentials: true}));


// routing
// api
app.use('/api/sensor', require('./api/sensor.js'));
app.use('/api/turn_gate', require('./api/turn_gate.js'));
app.use('/api/history_data', require('./api/history_data.js'));
app.use('/api/conversation', require('./api/conversation.js'));
app.use('/api/one_time_automation', require('./api/one_time_automation.js'));

// static files
app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));

server.listen(8122, function () {
    console.log('Node server is running..');
});
