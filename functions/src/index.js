"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Api = require("./api");
//const Api = require("./api");
admin.initializeApp(functions.config().firebase);
new Api().init().then((app) => {
});
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return 'AA';
});
//# sourceMappingURL=index.js.map