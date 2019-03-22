import { Router } from "express";
import * as PostController from "../controllers/post.controller";
import config from "../config";
import Issue from "../models/post";
import Reply from "../models/reply";

import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";
import issueSchema from "../models/post";
import apitoken from "../../nopush";

const router = new Router();
const mongo = require("mongodb");
const assert = require("assert");
const url = config.mongoURL;

const token = apitoken;
const userUrl =
  "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/users";
const postUrl =
  "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Posts";
var request = require("request");

// Get all Posts
router.route("/queryAllPost").get(function(req, res, next) {
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

// Add a new Post and send out email notification to admin
router.route("/postNewPost").post(function(req, res, next) {
  console.log(req.body.post);
  var tempSlug = slug(req.body.post.title.toLowerCase(), { lowercase: true });
  const newPost = new Issue({
    title: req.body.post.title,
    content: req.body.post.content,
    name: req.body.post.name,
    slug: tempSlug,
    cuid: cuid()
  });

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
      name: req.body.post.name,
      userID: "1002845",
      category: "Client Login Issue",
      title: req.body.post.title,
      content: req.body.post.content,
      url: "www.mywebsite.com",
      slug: tempSlug,
      cuid: cuid,
      dateAdded: Date.now.toString,
      resolveStatus: false,
      replyscuid: {}
    },
    json: true
  };
  request(options, function(error, response, body) {
    // console.log(response.body.objectId);
    if (error) throw new Error(error);
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

// router.route("/queryAllPost").get(function(req, res, next) {
//   var options = {
//     method: "GET",
//     url: postUrl,
//     headers: {
//       "cache-control": "no-cache",
//       "Server-Token": token,
//       "Content-Type": "application/json"
//     }
//   };
//   request(options, function(error, response, body) {
//     if (error) throw new Error(error);
//     res.json({ posts: JSON.parse(body) });
//   });
// });

// Get one post by objectId
router.route("/posts/:objectId").get(function(req, res, next) {
  console.log("saying hello");

  console.log(req.params);
  var options = {
    method: "GET",
    url: `https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Posts/${
      req.params.objectId
    }`,
    headers: {
      "cache-control": "no-cache",
      "Server-Token": token,
      "Content-Type": "application/json"
    }
  };

  request(options, function(error, reponse, body) {
    if (error) throw new Error(error);
    console.log(JSON.parse(body));
    // console.log(res.json({ posts: JSON.parse(body) }));
    res.json({ post: JSON.parse(body) });
  });
});

// Delete a post by cuid
// router.route("/posts/:cuid").delete(function(req, res) {
//   mongo.connect(url, function(err, MongoClient) {
//     const db = MongoClient.db("Issue");
//     console.log(req.params.cuid);
//     db.collection("issues").findOneAndDelete(
//       { cuid: req.params.cuid },
//       (err, result) => {
//         if (err) return res.send(500, err);
//         res.send("Deleted");
//       }
//     );
//   });
// });

export default router;
