const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersHandler = require("./userhandler");
const userCredentials = require("./userCredentials");
const cookieParser = require("cookie-parser");
const userhandler = require("./userhandler");
const fs = require("fs");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

const port = 9555;

app.post("/auth/login", (req, res) => {
  let response = {
    status: "Success",
  };
  const { login, password } = req.body;

  if (
    login != null &&
    password != null &&
    login.length > 2 &&
    password.length > 5
  ) {
    const userLogin = usersHandler.VerifyUser(login, password);

    if (userLogin === usersHandler.UserResponse.UserNotFound) {
      response.status = "User Not Found";
    } else if (userLogin === usersHandler.UserResponse.WrongPassword) {
      response.status = "Reject";
    } else {
      res.cookie("userauth", userCredentials.SetUser(userLogin), {
        sameSite: "none",
        secure: true,
        maxAge: new Date(Date.now() + 100 * 24 * 60),
      });
    }
  } else {
    response.status = "Reject";
  }
  res.json(response);
});

app.post("/auth/create", (req, res) => {
  let response = {
    status: "Success",
  };
  const { login, password } = req.body;

  if (login.length < 3 || password.length < 6) {
    response.status = "Invalid Username/Password";
  } else {
    const userRegister = usersHandler.RegisterUser(login, password);

    if (userRegister === usersHandler.UserResponse.UserExists) {
      response.status = "User already registered!";
    } else {
      res.cookie("userauth", userCredentials.SetUser(userRegister), {
        sameSite: "none",
        secure: true,
        maxAge: new Date(Date.now() + 100 * 24 * 60),
      });
    }
  }
  res.json(response);
});

app.get("/users/all", (req, res) => {
  let response = {
    status: "Success",
  };

  if ("userauth" in req.cookies) {
    const userID = userCredentials.GetUserIndex(req.cookies.userauth);
    if (userID != -1) {
      response = userhandler.GetAllUsers();
    } else {
      response.status = "Access Forbidden";
    }
  } else {
    response.status = "Access Forbidden";
  }
  res.json(response);
});

app.post("/contact/ask", (req, res) => {
  let response = {
    status: "Success",
  };

  const { question } = req.body;

  if ("userauth" in req.cookies) {
    const userID = userCredentials.GetUserIndex(req.cookies.userauth);
    if (userID != -1) {
      if (question.length < 5) {
        response.status = "Invalid Question String";
        res.json(response);
        return;
      }
      const contactStorage = "contact-questions.json";
      fs.exists(contactStorage, (exists) => {
        if (exists) {
          fs.readFile(contactStorage, function (error, buffer) {
            if (!error) {
              let oldQuestions = [];
              try {
                oldQuestions = JSON.parse(buffer);
              } catch {}
              StoreQuestions(
                contactStorage,
                oldQuestions,
                usersHandler.GetUserLogin(userID),
                question
              );
            } else {
              console.error(error.message);
            }
          });
        } else {
          StoreQuestions(
            contactStorage,
            [],
            usersHandler.GetUserLogin(userID),
            question
          );
        }
      });
    } else {
      response.status = "Access Forbidden";
    }
  } else {
    response.status = "Access Forbidden";
  }

  res.json(response);
});

const StoreQuestions = (ContactStorage, OldQuestions, UserLogin, Question) => {
  const newQuestion = {
    login: UserLogin,
    question: Question,
  };

  OldQuestions.push(newQuestion);

  fs.writeFile(ContactStorage, JSON.stringify(OldQuestions), function (error) {
    if (error) {
      console.error(error.message);
    }
  });
};

app.listen(port, () => {
  usersHandler.LoadUsers();
  console.log(`Example app listening on port ${port}`);
});