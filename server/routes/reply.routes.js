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

// Get all Replies To Do: Figure out how to filter replies
router.route("/queryAllReplies").get(function(req, res, next) {
  var options = {
    method: "GET",
    url: replyUrl,
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

// Add a new Reply and sends out email notification to user
router.route("/postNewReply").reply(function(req, res, next) {});

// Delete one reply by objectId(reply)
router.route("/reply/:objectId").delete(function(req, res, next) {});

// Delete all replies related to post by objectId(post)
router.route("/reply/:objectId").delete(function(req, res, next) {});

export default router;
