/*jslint node:true */

var Alexa = require('alexa-sdk');
var OpearloAnalytics = require('opearlo-analytics');

var text = require('../lib/helper/text');
var textHelper = require ('../lib/helper/textHelper');
var constants = require ('../lib/helper/constants');

var newSessionHandlers = {
    'LaunchRequest': function () {
        'use strict';
        this.handler.state = constants.states.MAIN;
        this.emit(':ask', text.welcomeMessage, text.welcomeReprompt);
    },
    'whatIsTrendRadarIntent': function () {
        'use strict';
        this.handler.state = constants.states.MAIN;
        this.emitWithState('whatIsTrendRadarIntent');
    },
    'describeTheDiagramIntent': function () {
        'use strict';
        this.handler.state = constants.states.MAIN;
        this.emitWithState('describeTheDiagramIntent');
    },
    'topTrendsIntent': function () {
        'use strict';
        this.handler.state = constants.states.MAIN;
        this.emitWithState('topTrendsIntent');
    },
    'trendIntent': function () {
        'use strict';
        this.handler.state = constants.states.MAIN;
        this.emitWithState('trendIntent');
    },
    'Unhandled': function () {
        'use strict';
        this.emit(':ask', text.helpMessage);
    },
    'SessionEndedRequest': function () {
        'use strict';
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        'use strict';
        this.emit(':ask', text.helpMessage, text.helpMessage);
    },
    'AMAZON.StopIntent': function () {
        'use strict';
        OpearloAnalytics.recordAnalytics(this.event.session.user.userId, process.env.OPEARLO_API_KEY, (result)=> {
            this.emit(':tell', text.goodbyeMessage);
        });
    },
    'AMAZON.CancelIntent': function () {
        'use strict';
        OpearloAnalytics.recordAnalytics(this.event.session.user.userId, process.env.OPEARLO_API_KEY, (result)=> {
            this.emit(':tell', text.goodbyeMessage);
        });
    }
};

module.exports = newSessionHandlers;
