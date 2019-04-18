import { Router } from "express";
import Issue from "../models/post";
import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";
import apitoken from "../../nopush";

const router = new Router();
const token = apitoken;
const postUrl =
  "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Posts";

var request = require("request");

// Get all Posts
router.route("/queryAllPost").get(function(req, res, next) {
  // console.log(res);
  var options = {
    method: "GET",
    url: postUrl,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json({ posts: JSON.parse(body) });
  });
});

// Get all Allowed Posts
router.route("/queryAllowedPost/:sessionToken").get(function(req, res, next) {
  console.log("In query Allowed");
  console.log(req.params);
  var options = {
    method: "GET",
    url: postUrl,
    headers: {
      "cache-control": "no-cache",
      "X-Parse-Session-Token": req.params.sessionToken,
      "Server-Token": token,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json({ posts: JSON.parse(body) });
  });
});

// Add a new Post and sends out email notification to admin
router.route("/postNewPost").post(function(req, res, next) {
  var options = {
    method: "POST",
    url: postUrl,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "Content-Type": "application/json"
    },
    body: {
      userType: "User",
      username: req.body.post.username,
      category: req.body.post.category,
      title: req.body.post.title,
      content: req.body.post.content,
      imageData: req.body.post.imageData,
      dateAdded: Date.now.toString,
      resolveStatus: false,
      replyscuid: {},
      ACL: {
        "2ZtufYEUQd": { read: true },
        "role:Admin": { read: true, write: true },
        "*": {}
      }
    },
    json: true
  };
  request(options, function(error, response, body) {
    // console.log(response.body.objectId);
    if (error) throw new Error(error);
    console.log("reqqq");
    console.log(options.body);
    res.json(options.body);
  });
  // Sanitize inputs
  // newPost.title = sanitizeHtml(newPost.title);
  // newPost.name = sanitizeHtml(newPost.name);
  // newPost.content = sanitizeHtml(newPost.content);
  // // newPost.slug = tempSlug
  // newPost.save((err, saved) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   res.json({ post: saved });
  // });

  var options2 = {
    method: "POST",
    url: "https://ug-api.acnapiv3.io/swivel/email-services/api/mailer",
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": apitoken
    },
    body: {
      subject: "New issue added by " + req.body.post.username,
      sender: "ZhiYao@mymail.accenture.com",
      recipient: "teezhiyao@gmail.com",
      html:
        "<h3>" +
        "There is a new issue: " +
        req.body.post.title +
        " posted by " +
        req.body.post.name +
        "</h3></h3>" +
        " Content of the issue is " +
        req.body.post.content +
        "</h3>"
    },
    json: true
  };
  request(options2, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});

// Get one post by objectId
router.route("/posts/:objectId").get(function(req, res, next) {
  var options = {
    method: "GET",
    url: `${postUrl}/${req.params.objectId}`,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, reponse, body) {
    if (error) throw new Error(error);
    // console.log(JSON.parse(body));
    res.json({ post: JSON.parse(body) });
  });
});

// Update one post by objectId (To-Do)
router.route("/posts/:objectId").put(function(req, res, next) {});

// Delete one post by objectId
router.route("/posts/:objectId/:sessionToken").delete(function(req, res, next) {
  console.log(req.params);
  var options = {
    method: "DELETE",
    url: `${postUrl}/${req.params.objectId}`,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "X-Parse-Session-Token": req.params.sessionToken,
      "Content-Type": "application/json"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log("Deleted");
    console.log(body);
  });
});

export default router;
