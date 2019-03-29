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
router.route("/queryReplies").get(function(req, res, next) {
  console.log("Reached queryReplies");
  console.log(req);
  var options = {
    method: "GET",
    url: replyUrl + '?where={"postId":"ZEcLQzpX8e"}',
    // qs: { where: "{%22postId%22:%22ZEcLQzpX8e%22}" },
    headers: {
      "cache-control": "no-cache",
      "Content-Type": "application/json",
      "Server-Token": apitoken
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(JSON.parse(body));
    res.json({ replies: JSON.parse(body) });
  });
});

// Add a new Reply and sends out email notification to user
router.route("/postNewReply").get(function(req, res, next) {});

// Delete one reply by objectId(reply)
router.route("/reply/:objectId").delete(function(req, res, next) {});

// Delete all replies related to post by objectId(post)
router.route("/reply/:objectId").delete(function(req, res, next) {});

export default router;
