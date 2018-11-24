"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.database();
const { dialogflow } = require('actions-on-google');
const app = dialogflow({
    debug: true
});


app.intent("Default Welcome Intent", conv => {
    conv.ask("Hi welcome to capital teller.");
});

app.intent("states", conv => {
    let stateName = (conv.parameters['states']);
    return db.ref("capital/").once("value", snapshot => {
        let data = snapshot.val();
        let capital = data[String(stateName)];
        conv.close(`The capital of ${stateName} is ${capital}`);
    });
});

 
exports.googleAction = functions.https.onRequest(app);
 
//return db.ref("name/").once("value", snapshot => {
//  let data = snapshot.val();
//});