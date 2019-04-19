"use strict";
import { Router } from "express";

// const dialogflow = require("dialogflow");
// const structjson = require("../chatbot/structjson");
// const config = require("../../config/keys");

// const projectID = config.googleProjectID;

// const credentials = {
//   client_email: config.googleClientEmail,
//   private_key: config.googlePrivateKey
// };

// const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

// const sessionPath = sessionClient.sessionPath(
//   config.googleProjectID,
//   config.dialogFlowSessionID
// );
import { textQuery, eventQuery, handleAction } from "../chatbot/chatbot";

const router = new Router();
var request = require("request");

router.route("/api/df_text_query").post(async (req, res) => {
  let responses = await chatbot.textQuery(
    req.body.text,
    req.body.userID,
    req.body.parameters
  );
  res.send(responses[0].queryResult);
});
// const request = {
//   session: sessionPath,
//   queryInput: {
//     text: {
//       text: req.body.text,
//       languageCode: config.dialogFlowSessionLanguageCode
//     }
//   },
//   queryParams: {
//     payload: {
//       data: req.body.parameters
//     }
//   }
// };
// let responses = sessionClient.detectIntent(request);
// responses.then(res => console.log(res[0].queryResult));
// return responses;
// console.log("I am in the text query api");
// console.log(
//   responses.then(function(res) {
//     return res[0].queryResult.fulfillmentText;
//   })
// );
// responses
//   .then(function(res) {
//     console.log(res);
//     return this.res.send(res[0].queryResult.fulfillmentText);
//   })
//   .bind(this);
// console.log("I am in the text query asadasdpi");
// console.log(
// responses.then(function(value) {
//   console.log(value[0].queryResult.fulfillmentText);
// });
// );
// responses.then(
//   function(response) {
//     state.resState = response[0].queryResult;
//   }.bind(state)
// );
// console.log(state);
// res.send(resState[0].queryResult);
// router.route("/api/df_event_query").post(function(req, res, next) {
//   let responses = eventQuery(
//     req.body.event,
//     req.body.userID,
//     req.body.parameters
//   );
//   res.send(responses[0].queryResult);
// });

export default router;
