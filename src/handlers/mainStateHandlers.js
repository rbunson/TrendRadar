/*jslint node:true */

var Alexa = require('alexa-sdk');
var OpearloAnalytics = require('opearlo-analytics');

var text = require('../lib/helper/text');
var constants = require ('../lib/helper/constants');
var trendData = require('../lib/helper/trendData');
var trendDataHelpers = require('../lib/helper/trendDataHelpers');
var promptHelpers = require('../lib/helper/promptHelpers');

var mainStateHandlers = Alexa.CreateStateHandler(constants.states.MAIN, {
    'whatIsTrendRadarIntent': function () {
        'use strict';

        this.attributes [constants.intents.WHAT_IS_TREND_RADAR] = constants.intentSpoken;
        this.attributes ['currentTrend'] = '';

        var prompt = promptHelpers.createPrompt(text.whatisTrendRadar, this.attributes);
        this.emit(':ask', prompt.main, prompt.choices);
    },
    'describeTheDiagramIntent': function () {
        'use strict';
        this.attributes [constants.intents.DESCRIBE_THE_DIAGRAM] = constants.intentSpoken;
        this.attributes ['currentTrend'] = '';

        var prompt = promptHelpers.createPrompt(text.diagramDescription, this.attributes);
        this.emit(':ask', prompt.main, prompt.choices);
    },
    'topTrendsIntent': function () {
        'use strict';

        this.attributes [constants.intents.TOPTRENDS] = constants.intentSpoken;
        this.attributes ['currentTrend'] = '';

        var prompt = promptHelpers.createTopTrendsPrompt(text.topTrendsIntro, this.attributes);

        this.emit(':ask', prompt.main, prompt.choices);
    },
    'trendIntent': function () {
        'use strict';

        var slotValue = this.event.request.intent.slots.specificTrend.value,
            output,
            trend;

        trend = trendDataHelpers.findByNameOrAlias (slotValue);
        if (trend) {
            this.handler.state = constants.states.TREND_DETAILS;
            this.attributes ['currentTrend'] = trend.name;
            
            var prompt = promptHelpers.createTrendPrompt (trend, this.attributes);
            this.emit(':ask', prompt.main, prompt.choices);
        } else {
            this.emit(':ask', text.noTrendErrorMessage);
        }
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

module.exports = mainStateHandlers;
