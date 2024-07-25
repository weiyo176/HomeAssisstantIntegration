const puppeteer = require("puppeteer");

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function setTurnGate(page, search) {
    let result;

    if (search.method == "get") {
	// get all turn gates info
        result = await page.evaluate( () => Array.from( document.getElementsByTagName("HOME-ASSISTANT")[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].children[1].children, element => element.children[0].renderRoot.children[0].renderRoot.children[1].innerText) );
    }
    else if (search.method == "post") {
	// click all turn gates
    	//result = await page.evaluate( () => Array.from( document.getElementsByTagName( 'HOME-ASSISTANT' ), element => element.renderRoot.children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].click()) );
	result = await page.evaluate( () => Array.from( document.getElementsByTagName("HOME-ASSISTANT")[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].children[1].children, element => element.children[0].renderRoot.children[0].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].click()) );
    }
    return result;
}

async function setSensor(page, search) {
    let result;

    if (search.method == "get") {	
       result = {};
       result['key'] = await page.evaluate( () => Array.from( document.getElementsByTagName("home-assistant")[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[1].children[1].renderRoot.children[0].children[1].children, element => element.children[0].renderRoot.children[0].renderRoot.children[1].innerText) );
       result['val'] = await page.evaluate( () => Array.from( document.getElementsByTagName("home-assistant")[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[1].children[1].renderRoot.children[0].children[1].children, element => element.children[0].renderRoot.children[0].children[0].innerText) ); 
    }
    return result;
}

async function login(page) {
    const title = await page.evaluate( () => Array.from( document.getElementsByTagName( 'title' ), element => element.innerHTML) );
    if (title == "Home Assistant") {
	return false;
    }
    else {
	return true;
    }
}

async function crawlMapConsole(url, search) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('response', response => {
        //console.log(response.status, response.url);
    });

    page.on('requestfailed', request => {
        console.log(request.failure().errorText, request.url);
    });

    await page.goto(url);
    // set the login info in localStorage after first load the page
    await page.evaluate(() => {
	//localStorage.setItem('hassTokens', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxYzVlMWIwY2RhMzc0NzIwYjJhYjg3ZDExZjcxZGE0NyIsImlhdCI6MTcyMTg3NjkxOSwiZXhwIjoxNzIxODc4NzE5fQ.13uURefdsUSmnlFWdKLLQnV0E886iQJSC3NB_qHd3uA","token_type":"Bearer","refresh_token":"4a08b2a5447781007d10c0e4e2c7e2a11d0e194566fb72982c3e133053544dd003e22976fc5c3290ee321fb86a390fa6ca8272e47b8024f323ac844515394bda","expires_in":1800,"ha_auth_provider":"homeassistant","hassUrl":"http://163.22.17.184:8123","clientId":"http://163.22.17.184:8123/","expires":1721878719247}');
        localStorage.setItem('hassTokens', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhNDAwNjZmNmNkNGM0YjMwYTY1ZGI0YWJhMjE5N2I1YSIsImlhdCI6MTcyMTg3OTk5MywiZXhwIjoxNzIxODgxNzkzfQ.1PeBTBCq7yGhInJ0vTSiAPmY0O7zn0z398kyjKOK9Jk","token_type":"Bearer","refresh_token":"2e8c0bf8972fe27ad78fdb9cada06182e7495f874955285cd5804be3012e0831210739036a98b274e062085796ae141dbcce7da3f816b941da8ee4892af07292","expires_in":1800,"ha_auth_provider":"homeassistant","hassUrl":"http://163.22.17.184:8123","clientId":"http://163.22.17.184:8123/","expires":1721881793335}');
    });
    await page.goto(url);

    let elementHandle = await page.evaluate( () => Array.from( document.getElementsByTagName( '*' ), element => element.tagName) );
    console.log(elementHandle, elementHandle.length);

    // wait the page fully loaded
    await sleep(7000);
    let result = {"suc" : true};

    // debug
    //const b = await page.evaluate( () => Array.from( document.getElementsByTagName( 'HOME-ASSISTANT' ), element => element.renderRoot.children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[1].children[0].renderRoot.children[0].children[1].children[0].children[0].renderRoot.children[0].children[0].renderRoot.children[0].renderRoot.children[0].children[1].children[0].children[0].ariaLabel) );
    elementHandle = await page.evaluate( () => Array.from( document.getElementsByTagName( '*' ), element => element.tagName) );
    console.log(elementHandle, elementHandle.length);

    // check whether login into the home assistant web successfully
    if (!login(page)) {
	result["suc"] = false;
	result["msg"] = "login failed";
	return Promise.resolve(result);
    }
	
    const ha = await page.evaluate( () => Array.from( document.getElementsByTagName( 'HOME-ASSISTANT' ), element => element.outerHTML) );
    console.log(ha);

	console.log(search.type, search.method);
    if (search.type == "turn_gate") {
	result = await setTurnGate(page, search);
    }
    else if (search.type == "sensor") {
        result = await setSensor(page, search);
    }

    await sleep(3000);
    await browser.close();
    return result;
};

//crawlMapConsole('https://imwarehouse.im.ncnu.edu.tw');

async function test() {
let search = {"type" : "sensor", "method" : "get"};
a = await crawlMapConsole('http://163.22.17.184:8123/lovelace/0', search);
console.log(a);
}
test()
