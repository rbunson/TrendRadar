/*jslint node:true */

var Alexa = require('alexa-sdk');
var OpearloAnalytics = require('opearlo-analytics');

var newSessionHandlers = require('./handlers/newSessionHandlers');
var mainStateHandlers = require('./handlers/mainStateHandlers');
var trendDetailsHandlers = require('./handlers/trendDetailsHandlers');

exports.handler = function (event, context) {
    'use strict';
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.cf0d14cd-495f-43ee-ad1d-16fd526cac73";

      // Opearlo Analytics - Initialise
    if(event.session.new) {
        OpearloAnalytics.initializeAnalytics(process.env.OPEARLO_USER_ID, 'trend-radar', event.session);
    }

    // Opearlo Analytics - Track Launch Request
    if(event.request.type === "LaunchRequest") {
        OpearloAnalytics.registerVoiceEvent(event.session.user.userId, "LaunchRequest");
    }

    // Opearlo Analytics - Track All Intents
    if(event.request.type === "IntentRequest") {
        OpearloAnalytics.registerVoiceEvent(event.session.user.userId, "IntentRequest", event.request.intent);
    }

    alexa.registerHandlers(newSessionHandlers, mainStateHandlers, trendDetailsHandlers);
    alexa.execute();
};


