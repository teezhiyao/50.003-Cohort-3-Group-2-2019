import { Router } from "express";
import apitoken from "../../nopush";
import config from "../config";
import Issue from "../models/post";

const router = new Router();
const userUrl =
  "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users";
var request = require("request");

router.route("/userRegister").post(function(req, res, next) {
  var options = {
    method: "POST",
    url: userUrl,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "Content-Type": "application/json"
    },
    body: req.body,
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

router.route("/userRegister").post(function(req, res, next) {
  console.log("I have reached here");
  console.log(req.body);
  var options = {
    method: "POST",
    url: userUrl,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "Content-Type": "application/json"
    },
    body: req.body.post,
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

router.route("/queryAll").get(function(req, res, next) {
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

router.route("/getCurrentUser").get(function(req, res, next) {
  var options = {
    method: "GET",
    url: `${userUrl}/me`,
    headers: {
      "cache-control": "no-cache",
      "X-Parse-Session-Token": sessionToken,
      "Server-Token": token,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

router.route("/deleteUser").delete(function(req, res, next) {
  const username = user;
  const sessionToken = 1029382;
  var options = {
    method: "DELETE",
    url: `${userUrl}/${username}`,
    headers: {
      "cache-control": "no-cache",
      "X-Parse-Session-Token": sessionToken,
      "Server-Token": token,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

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

export default router;
