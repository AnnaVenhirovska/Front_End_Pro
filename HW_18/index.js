var http = require('http');
const url = require('url');
var static = require('node-static');
var file = new static.Server('.');
let port = 9923;


    http.createServer(function (req, res) {
    const queryObject = url.parse(req.url, true);

    var targetPathName = queryObject.pathname;
    if (targetPathName.endsWith('/'))
        targetPathName = targetPathName.substr(0, targetPathName.length - 1);

    if (targetPathName === "/person") {
        return onPersonInfo(queryObject, res);
    }
    else if (targetPathName === "/person/name") {
        return onPersonInfo({
            query: {name: null}
        }, res);
    }
    else if (targetPathName === "/person/address") {
        return onPersonInfo({
            query: { city: null, street: null, postCode: null}
        }, res);
    }
    else if (targetPathName === "/person/post/recipient") {
        return onPersonInfo({
            query: { name: null, surname: null, city: null, street: null, postCode: null }
        }, res);
    }
    file.serve(req, res);
}).listen(port);

console.log(`Server running on port ${port}`);

const _peopleData = [
    { name: "John", age: 38, surname: "Albert", height: 182, weight: 100, degree: "B.A", city: "Odessa", street: "Pushkinskaya", postCode: 65125 },
    { name: "Anna", age: 22, surname: "Ven", height: 165, weight: 55, degree: "M.A", city: "Lviv", street: "High Castle", postCode: 79000 },
    { name: "Teacher", age: 28, surname: "Coder", height: 175, weight: 80, degree: "P.h.D", city: "Kyiv", street: "Olympic", postCode: 14071 }
];

function onPersonInfo(queryObject, res) {
    const queryKeys = Object.keys(queryObject.query);
    const personIndex = getRandomInt(0, _peopleData.length);
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (queryKeys.length === 0) {
        res.write(JSON.stringify(_peopleData[personIndex]));
    }
    else {
        const outputJSON = {};
        for (let i = 0; i < queryKeys.length; i++) {
            if (queryKeys[i] in _peopleData[personIndex]) {
                outputJSON[queryKeys[i]] = _peopleData[personIndex][queryKeys[i]]
            }
        }
        res.write(JSON.stringify(outputJSON));
    }
    res.end();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}