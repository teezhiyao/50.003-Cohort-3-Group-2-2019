import { Router } from "express";
import apitoken from "../../nopush";
import config from "../config";
import Issue from "../models/post";

const router = new Router();
const userUrl =
  "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users";
var request = require("request");

//Create User account using ACNAPI
router.route("/createUser").post(function(req, res, next) {
  console.log("I have reached here");
  console.log(req.body.user);
  //To-Do username & password are all the same now before login page is set-up
  var options = {
    method: "POST",
    url: userUrl,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": apitoken,
      "Content-Type": "application/json"
    },
    body: {
      username: req.body.user.username,
      password: req.body.user.password,
      email: req.body.user.email,
      name: req.body.user.name,
      age: req.body.user.age,
      userType: "user"
    },
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    else {
      console.log("insfdlkasdfl");

      console.log(body);
      res.json(body);

      var options2 = {
        method: "POST",
        url: "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
        headers: {
          "cache-control": "no-cache",
          "Content-Type": "application/json",
          "Server-Token": apitoken
        },
        body: {
          subject: "New Signup" + req.body.user.username,
          sender: "teezhiyao@mymail.accenture.com",
          recipient: "teezhiyao@gmail.com",
          html:
            "<h3>" +
            "New Signup: " +
            "<br></br>" +
            "username: " +
            req.body.user.username +
            "<br></br>" +
            "password: " +
            req.body.user.password +
            "<br></br>" +
            "email: " +
            req.body.user.email +
            "<br></br>" +
            "name: " +
            req.body.user.name +
            "<br></br>" +
            "age: " +
            req.body.user.age +
            "<br></br>" +
            "</h3>"
        },
        json: true
      };
      request(options2, function(error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
    }
  });
});

//Try logging in , To-Do : Refine after connecting with front-end
//Returns fail/success response based on validity of credentials
router.route("/userLogin/:username/:password").get(function(req, res, next) {
  console.log("Printing Params");
  console.log(req.params);
  var options = {
    method: "GET",
    url: `https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login`,
    qs: { username: req.params.username, password: req.params.password },
    headers: {
      "cache-control": "no-cache",
      "Server-Token": apitoken,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(JSON.parse(body));
    res.json({ user: JSON.parse(body) });
  });
});

//To retrieve all user, To Do : Confirm if needed
router.route("/queryAllUser").get(function(req, res, next) {
  var options = {
    method: "GET",
    url: `${userUrl}/users`,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

//To Do : Not implemented as no context for updating information yet
router.route("/updateUser").put(function(req, res, next) {
  const username = user;
  const sessionToken = 1029382;
  var options = {
    method: "PUT",
    url: `${userUrl}/${username}`,
    headers: {
      "cache-control": "no-cache",
      "X-Parse-Session-Token": sessionToken,
      "Server-Token": token,
      "Content-Type": "application/json"
    },
    body: req.body
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

//To Do: Implement floating bar for emailing to admin/user , Not sure where to place on UI
router.route("/email").post(function(req, res, next) {
  console.log("Email trying hard");

  var options = {
    method: "POST",
    url: "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": apitoken
    },
    body: {
      subject: req.body.post.title,
      sender: "teezhiyao@gmail.com",
      recipient: "teezhiyao@gmail.com",
      html: "<h1>" + req.body.post.content + "</h1>"
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

//User can only delete self, Can't be used without Master Token
// router.route("/deleteUser").delete(function(req, res, next) {
//   const username = user;
//   const sessionToken = 1029382;
//   var options = {
//     method: "DELETE",
//     url: `${userUrl}/${username}`,
//     headers: {
//       "cache-control": "no-cache",
//       "X-Parse-Session-Token": sessionToken,
//       "Server-Token": token,
//       "Content-Type": "application/json"
//     }
//   };
//   request(options, function(error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body);
//   });
// });

//Don't think getCurrent User will be needed
// router.route("/getCurrentUser").get(function(req, res, next) {
//   var options = {
//     method: "GET",
//     url: `${userUrl}/me`,
//     headers: {
//       "cache-control": "no-cache",
//       "X-Parse-Session-Token": sessionToken,
//       "Server-Token": token,
//       "Content-Type": "application/json"
//     }
//   };
//   request(options, function(error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body);
//   });
// });

export default router;
