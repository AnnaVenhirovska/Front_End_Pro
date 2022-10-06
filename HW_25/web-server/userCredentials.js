const crypto = require('crypto')
const algorithm = 'aes-128-cbc'
const key = Buffer.from('7538782F413F4428472B4B6150645367', 'hex')
const iv = Buffer.from('5A7234753778214125442A472D4B614E', 'hex')

const setUser = (userindex) => {
    const authcookie = { userID: userindex };
    return EncryptData(JSON.stringify(authcookie));
}

const getUser = (authcookie) => {
    try {
        const { userID } = JSON.parse(DecryptData(authcookie));
        return userID;
    }
    catch
    {

    }
    return -1;
}

const EncryptData = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    text = Buffer.from(text)
    let crypted = cipher.update(text, 'utf-8', 'base64')
    crypted += cipher.final('base64');
    return crypted;
}

const DecryptData = (text) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    dec = decipher.update(text, 'base64', 'utf-8');
    dec += decipher.final();
    return dec;
}

module.exports =
{
    SetUser: setUser,
    GetUserIndex: getUser
}