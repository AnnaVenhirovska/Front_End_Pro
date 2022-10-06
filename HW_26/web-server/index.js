const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const usersHandler = require("./userhandler")
const userCredentials = require("./userCredentials")
const cookieParser = require('cookie-parser');
const userhandler = require('./userhandler');
const fs = require('fs');
const booksHandler = require("./booksHandler")

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

const port = 9555;

app.post('/auth/login', (req, res) => {
    let response = {
        status: 'Success'
    }
    const { login, password } = req.body;

    if (login != null && password != null && login.length > 2 && password.length > 5) {
        const userLogin = usersHandler.VerifyUser(login, password);

        if (userLogin == usersHandler.UserResponse.UserNotFound) {
            response.status = 'User Not Found'
        }
        else if (userLogin == usersHandler.UserResponse.WrongPassword) {
            response.status = 'Reject'
        }
        else {
            res.cookie("userauth", userCredentials.SetUser(userLogin), { sameSite: "none", secure: true, maxAge: new Date(Date.now() + (100 * 24 * 60)) });
        }
    }
    else {
        response.status = 'Reject'
    }
    res.json(response)
})

app.post('/auth/create', (req, res) => {
    let response = {
        status: 'Success'
    }
    const { login, password } = req.body;

    if (login.length < 3 || password.length < 6) {
        response.status = "Invalid Username/Password";
    }
    else {
        const userRegister = usersHandler.RegisterUser(login, password);

        if (userRegister == usersHandler.UserResponse.UserExists) {
            response.status = "User already registered!";
        }
        else {
            res.cookie("userauth", userCredentials.SetUser(userRegister), { sameSite: "none", secure: true, maxAge: new Date(Date.now() + (100 * 24 * 60)) });
        }
    }
    res.json(response);
})


app.get('/users/all', (req, res) => {
    let response = {
        status: 'Success'
    }

    if ('userauth' in req.cookies) {
        const userID = userCredentials.GetUserIndex(req.cookies.userauth);
        if (userID != -1) {
            response = userhandler.GetAllUsers();
        }
        else {
            response.status = "Access Forbidden";
        }
    }
    else {
        response.status = "Access Forbidden";
    }
    res.json(response)
})
 


app.listen(port, () => {
    usersHandler.LoadUsers();
    booksHandler.BKH_Initialise();
    console.log(`Example app listening on port ${port}`)
});

app.get('/api/books/available', (req, res) => {
    let response = {
        BookName: []
    }

    if ('userauth' in req.cookies) {
        const userID = userCredentials.GetUserIndex(req.cookies.userauth);
        if (userID != -1) {
            response = booksHandler.BKH_GetBooksList();
        }
    }
    res.json(response)
})

app.get('/api/getMyBooks', (req, res) => {
    let response = {
        BookName: [],
        BookProgress: []
    }

    if ('userauth' in req.cookies) {
        const userID = userCredentials.GetUserIndex(req.cookies.userauth);
        if (userID != -1) {
            response = booksHandler.BKH_GetUserBooksList(userID);
        }
    }
    res.json(response)
})

app.post('/api/user/book/add-favorite', (req, res) => {
    let response = {
        BookName: [],
        BookProgress: []
    }

    const { BookName } = req.body;

    if ('userauth' in req.cookies) {
        const userID = userCredentials.GetUserIndex(req.cookies.userauth);
        if (userID != -1) {
            response = booksHandler.BKH_AddUserBook(userID, BookName);
        }
    }
    res.json(response)
})

app.post('/api/user/book/remove-favorite', (req, res) => {
    let response = {
        BookName: [],
        BookProgress: []
    }

    const { BookName } = req.body;

    if ('userauth' in req.cookies) {
        const userID = userCredentials.GetUserIndex(req.cookies.userauth);
        if (userID != -1) {
            response = booksHandler.BKH_RemoveUserBook(userID, BookName);
        }
    }
    res.json(response)
})

app.post('/api/user/book/progress', (req, res) => {
    let response = {
        BookName: [],
        BookProgress: []
    }

    const { BookName, BookProgress } = req.body;

    if ('userauth' in req.cookies) {
        const userID = userCredentials.GetUserIndex(req.cookies.userauth);
        if (userID != -1) {
            response = booksHandler.BKH_ModifyUserBook(userID, BookName, BookProgress);
        }
    }
    res.json(response)
})