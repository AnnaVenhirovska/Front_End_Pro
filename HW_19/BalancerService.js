const http = require('http');
const url = require('url');
const telegramWrapper = require('./BotApiWrapperService');
let port = 7274;

http.createServer(function (req, res) {
    const queryObject = url.parse(req.url, true);

    let targetPathName = queryObject.pathname;
    if (targetPathName.endsWith('/'))
        targetPathName = targetPathName.substr(0, targetPathName.length - 1);

    if (targetPathName === "/weather/current") {
        telegramWrapper.CurrentWeather();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ Result: "OK" }));
    }
    else if (targetPathName === "/weather/forecast/24h") {
        telegramWrapper.ForecastWeather();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ Result: "OK" }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ Result: "EndPoint Not Found" })); 
    }
    res.end();
}).listen(port);

console.log(`Server running on port ${port}`);