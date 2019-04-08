import { Router } from "express";
import Issue from "../models/post";
import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";
import apitoken from "../../nopush";

const router = new Router();
const token = apitoken;
const replyUrl =
  "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Replies";
var request = require("request");

// Get all Replies Using PostId
router.route("/queryReplies/:postId").get(function(req, res, next) {
  console.log("Getting all replies for post");
  // console.log(req.params);
  var options = {
    method: "GET",
    url: replyUrl + `?where={"postId":"${req.params.postId}"}`,
    // qs: { where: "{%22postId%22:%22ZEcLQzpX8e%22}" },
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": apitoken
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    // console.log(JSON.parse(body));
    res.json({ replies: JSON.parse(body) });
  });
});

// To-Do Add a new Reply and sends out email notification to user
router.route("/postNewReply").post(function(req, res, next) {
  console.log("Posting New Reply");
  console.log(req.body.reply);

  var options = {
    method: "POST",
    url:
      "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/classes/Replies",
    headers: {
      "cache-control": "no-cache",
      "Server-Token": apitoken,
      "Content-Type": "application/json"
    },
    body: {
      content: req.body.reply.content,
      postId: req.body.reply.content.postId
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    res.json(options.body);
  });
});

// To-Do Delete one reply by objectId(reply)
router.route("/reply/:objectId").delete(function(req, res, next) {});

// To-Do Delete all replies related to post by objectId(post)
router.route("/reply/:objectId").delete(function(req, res, next) {});

export default router;
