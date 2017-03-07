
/*jslint node:true */
var trendDataHelper = require('./trendDataHelpers');
var constants = require('./constants');

var text = {
        welcomeMessage:  "Okay. I can tell you what the trend radar is, give you some top trends, or you can ask me about a specific trend.  You can also tell me to stop. What will it be?",
        welcomeReprompt: "I can tell you what the trend radar is, give you some top trends, or you can ask me about a specific trend.  You can also tell me to stop. What will it be?",
        whatisTrendRadar: "The IT trend radar is a comprehensive view on technology trends, their maturity and relevance for Munich RE, ERGO, and MEAG",
        topTrendsIntro: "Three top trends are digital identity, smart home, and cyber security.  Adoptions of these trends are strongly recommended. Digital Identity is about openly accessible personal information from online and offline sources.  Smart Home is about integrated home control systems with devices that interact with each other and the outside world, and can be controlled remotely.  Cybersecurity focuses on protecting digital networks and computers from unauthorized access and other attacks.",
        topTrendsIntroPrompt: "I can give you examples and current initiatives within the company for any of these trends.  Just say digital identity details, smart home details, or cyber security details",
        diagramDescription: "Reading the diagram is simple. First, the radar is divided into quadrants.  These represent trend categories.  Next, there are four concentric rings labeled: hold, assess, trial, and adopt.  These indicate stages in the adoption life-cycle, with Adopt in the near term and hold being the farthest out.  Last, are the blips on the radar.  These are individual trend names.  Trend blips are plotted by their category and their maturity and relevance to the company.  The closer a trend is to the base of the innermost ring, the stronger the recommendation to start initiatives using that trend now",
        helpMessage: `Here are some things you  can say: What is the trend radar. how do I read the diagram.  name the top trends. Tell me about ${trendDataHelper.getRandomTrend().name}, or some other trend. what will it be?`,
        goodbyeMessage: "Good bye",
        noTrendErrorMessage: "I did not understand this trend, please try again.",
        promptOptions: [
            {name: constants.intents.WHAT_IS_TREND_RADAR, text: "tell you what the trend radar is"},
            {name: constants.intents.DESCRIBE_THE_DIAGRAM, text: "explain the diagram"},
            {name: constants.intents.TOPTRENDS, text: "give you some top trends"},
            {name: constants.intents.SPECIFIC_TREND, text: "tell you about a specific trend"}
        ]
    };


module.change_code = 1;
module.exports = text;
