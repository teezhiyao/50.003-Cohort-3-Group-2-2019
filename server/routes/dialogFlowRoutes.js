"use strict";

import { Router } from "express";
import Issue from "../models/post";
import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";
import apitoken from "../../nopush";

const router = new Router();
var request = require("request");

router.route("/chatbot").get(function(req, res, next) {
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

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ hello: "johnny" });
  });

  app.post("/api/df_text_query", (req, res) => {
    let responses = chatbot.textQuery(
      req.body.text,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });

  app.post("/api/df_event_query", (req, res) => {
    let responses = chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });
};

export default router;
