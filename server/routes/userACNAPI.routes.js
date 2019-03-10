import { Router } from "express";
import apitoken from "../../nopush";
const router = new Router();
const token = apitoken;
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

export default router;
