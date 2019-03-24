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

// To-Do - Get all Replies from a Post using API
router.route("/queryPostReplies").get(function(req, res, next) {});

// Add a new Reply and sends out email notification to user
// To-Do 1: Add a new Reply using API
// To-Do 2: Email trigger alongside reply
router.route("/postNewReply").reply(function(req, res, next) {});

// To-Do - Delete one reply by objectId(reply) using API
router.route("/reply/:objectId").delete(function(req, res, next) {});

// To-Do - Delete all replies related to post by objectId(post) using API
router.route("/reply/:objectId").delete(function(req, res, next) {});

export default router;
