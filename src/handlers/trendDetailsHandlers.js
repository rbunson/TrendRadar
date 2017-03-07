/*jslint node:true */

var Alexa = require('alexa-sdk');
var OpearloAnalytics = require('opearlo-analytics');

var text = require('../lib/helper/text');
var constants = require ('../lib/helper/constants');
var trendData = require('../lib/helper/trendData');
var trendDataHelpers = require('../lib/helper/trendDataHelpers');
var promptHelpers = require('../lib/helper/promptHelpers');

var getTrendName = function (slots, attributes) {
    if (slots.specificTrend.value) {
        return slots.specificTrend.value;
    }
    if (attributes ['currentTrend']) {
        return attributes ['currentTrend'];
    }
    return '';
};

var trendDetailsHandlers = Alexa.CreateStateHandler(constants.states.TREND_DETAILS, {
    'trendDetailsIntent': function () {

        var trendName = getTrendName (this.event.request.intent.slots, this.attributes);
        var trend = trendDataHelpers.findByNameOrAlias (trendName);

        if (trend) {
            this.attributes ['currentTrend'] = trend.name;
            this.attributes [constants.intents.TREND_DETAILS + '-' + trend.name] = constants.intentSpoken;
            
            var prompt = promptHelpers.createTrendDetailsPrompt (trend, this.attributes);
            this.emit(':ask', prompt.main, prompt.choices);
        } else {
            this.emit(':ask', text.noTrendErrorMessage);
        }
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
        this.emit(':ask', text.helpMessage, text.helpMessage);
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
});

module.exports = trendDetailsHandlers;