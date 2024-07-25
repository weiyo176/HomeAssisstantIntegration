//基於 Node.js Express 的主要設定檔
const express = require('express');
const app = express();
const bodyParser = require(body-parser);
const cookieParser = require('cookie-parser');
const server = require('http').Server(app);

//bodyParser: 解析 HTTP 請求的 body
app.use(bodyParser.urlencoded({ extended: false }));
//express.json: 處理 JSON 資料
app.use(express.json());
app.use(cookieParser()); //解析 HTTP 請求的 cookie

// routing
// pages
app.use('/main', require('./pages/main.js'));

// static files
app.use('/js', express.static('./js'));
app.use('/css', express.static('./css'));

server.listen(8122, function () {
    console.log('Node server is running..');
});
