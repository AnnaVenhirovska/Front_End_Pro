const crypto = require('crypto')
const fs = require('fs')

const userResponse =
{
    UserExists: -1,
    UserNotFound: -2,
    WrongPassword: -3,
    Success: -4
}

let usersList = [];

const loadUsers = () => {
    const usersFile = "users-in-system.json";

    if (fs.existsSync(usersFile)) {
        try {
            usersList = JSON.parse(fs.readFileSync(usersFile));

            console.log(usersList.length + " Users were loaded.")
        }
        catch
        {
            usersList = [];

            console.log(usersList.length + " Users were reseted.")
        }
    }
    else {
        usersList = [];

        console.log("0 Users were loaded.")
    }
}

const verifyUser = (UserIdentifier, UserPassword) => {
    UserIdentifier = UserIdentifier.toLowerCase();
    const user = usersList.findIndex(item => item.login.toLowerCase() === UserIdentifier)
    if (user != -1) {
        const sha256Password = GetHashedString(UserPassword, usersList[user].creationTime);
        if (usersList[user].password == sha256Password) {
            usersList[user].lastLoginTime = new Date().toUTCString();
            updateUsers()
            return user;
        }
        else {
            return userResponse.WrongPassword;
        }
    }
    else if (user === -1) {
        return userResponse.UserNotFound;
    }
}

const registerUser = (UserIdentifier, UserPassword) => {
    const searchUser = UserIdentifier.toLowerCase();
    const user = usersList.findIndex(item => item.login.toLowerCase() === searchUser)
    if (user === -1) {

        const registerDate = new Date().toUTCString();
        const sha256Password = GetHashedString(UserPassword, registerDate);

        const userData =
        {
            login: UserIdentifier,
            password: sha256Password,
            creationTime: registerDate,
            lastLoginTime: registerDate,
        }

        usersList.push(userData)
        updateUsers()

        return usersList.length - 1;
    }
    else {
        return userResponse.UserExists;
    }
}

const updateUsers = () => {
    const usersFile = "users-in-system.json";
    fs.writeFile(usersFile, JSON.stringify(usersList), function (err) {
        if (err) {
            console.error("Users file could not be updated");
        }
    })
}

const getAllUsers = () => {
    let outputArray = [];
    for (let i = 0; i < usersList.length; i++) {
        let pushUser =
        {
            login: usersList[i].login,
            creationTime: usersList[i].creationTime,
            lastLoginTime: usersList[i].lastLoginTime
        }
        outputArray.push(pushUser);
    }
    return outputArray;
}

const getUserLogin = (userID) => {
    if (userID >= 0 && userID < usersList.length) {
        return usersList[userID].login;
    }
    return "NULL";
}

module.exports =
{
    UserResponse: userResponse,
    LoadUsers: loadUsers,
    VerifyUser: verifyUser,
    RegisterUser: registerUser,
    GetAllUsers: getAllUsers,
    GetUserLogin: getUserLogin
}

const GetHashedString = (targetString, DynamicSalt = "") => {
    const uniqueSALT = "z@59Lr.aB0";
    let where = targetString.length / 2;
    targetString = targetString.substr(0, where) + uniqueSALT + DynamicSalt + targetString.substr(where);
    return crypto.createHash('sha256').update(targetString).digest('hex');
}