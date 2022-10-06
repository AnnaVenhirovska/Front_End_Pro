const fs = require('fs');
const express = require('express');
const app = express();
const port = 7676;

app.all(["/users", "/users/all"], (req, res) => {
listAllUsers(req, res)
})

app.all("/users/first", (req, res) => {
    fs.readdir(`./mock/user`, (error, data) => {
        if (error || data.length === 0) {
            res.send('No mock data.')
        }
        else {
            let firstUser = data[0];
            const path = `./mock/user/${firstUser}/${req.method.toLowerCase()}.json`;
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    res.send('No mock data.')
                } else {
                    res.json(JSON.parse(data))
                }
            })
        }
    })
})

app.all("/users/last", (req, res) => {
    fs.readdir(`./mock/user`, (error, data) => {
        if (error || data.length === 0) {
            res.send('No mock data.')
        }
        else {
            let firstUser = data[data.length - 1];
            const path = `./mock/user/${firstUser}/${req.method.toLowerCase()}.json`;

            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    res.send('No mock data.')
                }
                else {
                    res.json(JSON.parse(data))
                }
            })
        }
    })
})

app.all('/*', (req, res) => {
    const path = `./mock${req.originalUrl}/${req.method.toLowerCase()}.json`;
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            res.send('No mock data.')
        } else {
            res.json(JSON.parse(data))
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


function listAllUsers(req, res) {
    fs.readdir(`./mock/user`, (error, data) => {
        if (error || data.length === 0) {
            res.send('No mock data.')
        } else {
            let outputUsers = [];

            const finishedReading = function () {
                res.json(outputUsers)
            }

            let runningTasks = data.length;

            data.forEach((userID) => {
                const path = `./mock/user/${userID}/${req.method.toLowerCase()}.json`;
                let myUserId = parseInt(userID) - 1;

                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        res.send('No mock data.')
                        return;
                    }

                    outputUsers[myUserId] = JSON.parse(data)
                    runningTasks--;
                    if (runningTasks === 0) {
                        finishedReading()
                    }
                })
            });
        }
    });
}