const router = require('express').Router();
const crawler = require('./../utilities/crawler.js');

// processing request
router.get('/', async function(req, res) {
    try {
	    console.log("aaa");
	const search = {"type" : "sensor", "method" : "get"};
	const result = await crawler.crawlMapConsole('http://163.22.17.184:8123/lovelace/0', search);
	console.log(result);
	res.json(result);
    }
    catch(e) {
	const result = {"suc" : false, "msg" : "sth going wrong : " + e};
	console.error(e);
	res.json(result);
    }
});

module.exports = router;
