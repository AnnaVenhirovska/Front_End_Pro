const fs = require('fs')

let booksList = [];

function BKH_Initialise()
{  
    if (!fs.existsSync("booksdir")) {
        fs.mkdirSync("booksdir")
    }
    
    if (fs.existsSync("booksdir/books.json")) {
        try
        {
            booksList = JSON.parse(fs.readFileSync("booksdir/books.json"));
        }
        catch
        {
            console.error("Parsing books file has failed!");
        }
    }
    else {
        console.error("Books file doesn't exist!");
    }
}

function BKH_GetBooksList() {
    return {BookName: booksList};
}


function BKH_GetUserBooksList(userID) {
    let userBooks = {BookName: [], BookProgress: [] };
    try
    {
        userBooks = JSON.parse(fs.readFileSync("booksdir/userid" + userID + "books.json"));
    }
    catch
    {

    }
    return userBooks;
}

function BKH_AddUserBook(userID, BookName) {
    let userBooks = {BookName: [], BookProgress: [] };
    try
    {
        userBooks = JSON.parse(fs.readFileSync("booksdir/userid" + userID + "books.json"));
    }
    catch
    {

    }

    let bookIndex = userBooks.BookName.findIndex(t => t == BookName);
    if (IsBookValid(BookName) && bookIndex == -1) {
        userBooks.BookName.push(BookName);
        userBooks.BookProgress.push(0);
        
        fs.writeFile("booksdir/userid" + userID + "books.json", JSON.stringify(userBooks), function (error) {
            if (error) {
                console.error("BKH_AddUserBook: " + error.message);
            }
        });
    }
    return userBooks;
}

function BKH_ModifyUserBook(userID, BookName, Progress) {
    let userBooks = {BookName: [], BookProgress: [] };
    try
    {
        userBooks = JSON.parse(fs.readFileSync("booksdir/userid" + userID + "books.json"));
    }
    catch
    {

    }

    let bookIndex = userBooks.BookName.findIndex(t => t == BookName);
    if (bookIndex != -1) {
        userBooks.BookProgress[bookIndex] = Progress;

        fs.writeFile("booksdir/userid" + userID + "books.json", JSON.stringify(userBooks), function (error) {
            if (error) {
                console.error("BKH_ModifyUserBook: " + error.message);
            }
        });
    }
    return userBooks;
}

function BKH_RemoveUserBook(userID, BookName) {
    let userBooks = {BookName: [], BookProgress: [] };
    try
    {
        userBooks = JSON.parse(fs.readFileSync("booksdir/userid" + userID + "books.json"));
    }
    catch
    {

    }

    let bookIndex = userBooks.BookName.findIndex(t => t == BookName);
    if (bookIndex != -1) {
        userBooks.BookName.splice(bookIndex, 1);
        userBooks.BookProgress.splice(bookIndex, 1);

        fs.writeFile("booksdir/userid" + userID + "books.json", JSON.stringify(userBooks), function (error) {
            if (error) {
                console.error("BKH_ModifyUserBook: " + error.message);
            }
        });
    }
    return userBooks;
}

function IsBookValid(BookName)
{
    return (booksList.findIndex(t => t == BookName) != -1);
}

module.exports = 
{
    BKH_AddUserBook,
    BKH_GetBooksList,
    BKH_GetUserBooksList,
    BKH_Initialise,
    BKH_ModifyUserBook,
    BKH_RemoveUserBook
}