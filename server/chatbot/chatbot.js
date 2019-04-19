"use strict";
const dialogflow = require("dialogflow");
const structjson = require("./structjson.js");
const config = require("../../config/keys");

const projectID = config.googleProjectID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

export function textQuery(text, parameters = {}) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: config.dialogFlowSessionLanguageCode
      }
    },
    queryParams: {
      payload: {
        data: parameters
      }
    }
  };
  let responses = sessionClient.detectIntent(request);
  responses = handleAction(responses);
  console.log("I am in text query");
  console.log(responses);
  return responses;
}

export function eventQuery(event, parameters = {}) {
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: event,
        parameters: structjson.jsonToStructProto(parameters),
        languageCode: config.dialogFlowSessionLanguageCode
      }
    }
  };
  let responses = sessionClient.detectIntent(request);
  responses = handleAction(responses);
  return responses;
}

export function handleAction(responses) {
  return responses;
}
