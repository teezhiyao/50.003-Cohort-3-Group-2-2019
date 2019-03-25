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

// Get all Replies from a Post
router.route("/queryPostReplies").get(function(req, res, next) {});

// Add a new Reply and sends out email notification to user
router.route("/postNewReply").reply(function(req, res, next) {});

// Delete one reply by objectId(reply)
router.route("/reply/:objectId").delete(function(req, res, next) {});

// Delete all replies related to post by objectId(post)
router.route("/reply/:objectId").delete(function(req, res, next) {});

export default router;