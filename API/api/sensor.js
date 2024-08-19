const router = require('express').Router();
const crawler = require('./../utilities/crawler.js');

// processing request
router.get('/', async function(req, res) {
    try {
	// const search = {"type" : "sensor", "method" : "get"};
	// const result = await crawler.crawlMapConsole('http://163.22.17.184:8123/lovelace/0', search);
	// console.log(result);
	// res.json(result);

	const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4OTI2YzE0OTI2YzY0ZTBmYWQ5MGJhNDc1YjBkYTM2NiIsImlhdCI6MTcyMjI0MjAwNiwiZXhwIjoyMDM3NjAyMDA2fQ.DfwflG8zTXQOy5QCy_xn1QjPApSSgqKFV4bYNzpyAjY";
        
        // 使用 Home Assistant API 進行請求以獲取所有設備狀態
        const response = await fetch('http://163.22.17.184:8123/api/states', {
            headers: { 
                Authorization: 'Bearer ' + apiKey, // 替換為你的實際訪問令牌
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const body = await response.json();
        
        // 過濾家電狀態
        const applianceStates = body.filter(entity => entity.entity_id.startsWith('sensor.'));
        
        
        
        console.log(applianceStates);
        res.json(applianceStates);
    }
    catch(e) {
	const result = {"suc" : false, "msg" : "sth going wrong : " + e};
	console.error(e);
	res.json(result);
    }
});

module.exports = router;
