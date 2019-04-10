import { Router } from "express";
import { textQuery, eventQuery, handleAction } from "../chatbot/chatbot";

const router = new Router();
var request = require("request");

router.route("/api/df_text_query").post(function(req, res, next) {
  let responses = textQuery(
    req.body.text,
    req.body.userID,
    req.body.parameters
  );
  console.log("I am in the text query api");
  console.log(responses);
  res.send(responses.then(res => res));
});

router.route("/api/df_event_query").post(function(req, res, next) {
  let responses = eventQuery(
    req.body.event,
    req.body.userID,
    req.body.parameters
  );
  res.send(responses[0].queryResult);
});

export default router;
