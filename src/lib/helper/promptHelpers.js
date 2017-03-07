/*jslint node: true */
var text = require('./text');
var textHelper = require('./textHelper');
var constants = require ('./constants');

var buildPromptOptions = function (alreadyPrompted) {
    'use strict';

    if (!alreadyPrompted) {
        alreadyPrompted = [];
    }
    var unusedPrompts = [],
        prompt = "I can ",
        i;

    for (i = 0; i < text.promptOptions.length; i += 1) {
        if (!alreadyPrompted[text.promptOptions[i].name]) {
            unusedPrompts.push(text.promptOptions[i].text);
        }
    }
    for (i = 0; i < unusedPrompts.length; i += 1) {
        prompt += unusedPrompts[i];

        if (i < unusedPrompts.length - 1) {
            prompt += ', ';
        }

        if (i === unusedPrompts.length - 2) {
            prompt += " or ";
        }
    }
    prompt += ". What will it be?";

    return prompt;
};

var buildInitiatives = function (trend) {
    if (trend.initiatives.length === 0) {
        return `There are no current initiatives for this trend`;
    } else if (trend.initiatives.length === 1) {
        return `The current initiative for Munich Re is ${textHelper.convertArrayToReadableString (trend.initiatives)}`;
    } else {
        return `The current Munich Re initiatives are ${textHelper.convertArrayToReadableString (trend.initiatives)}`;
    }
};

var buildTrendDetails = function (trend) {
    return `This is Munich Re's recommendation for ${trend.name}. ${trend.recommendation}. ${buildInitiatives (trend)}`;
};

var buildTrendPromptOptions = function (trend, alreadyPrompted) {
    'use strict';
    return `I can tell you more about ${trend.name}.<break time=\"0.6s\" />${buildPromptOptions(alreadyPrompted)}`;
};

var buildTopTrendPromptOptions = function (trend, alreadyPrompted) {
    'use strict';
    return `I can give you details for these trends. Just say Digital Identity details, Smart Home details, or Cybersecurity details. <break time=\"0.6s\" />${buildPromptOptions(alreadyPrompted)}`;
};

var promptHelpers = {
    createPrompt: function (text, alreadyPrompted) {
        'use strict';
        return {
            main: text + '<break time=\"0.6s\" />' + buildPromptOptions(alreadyPrompted),
            choices: buildPromptOptions(alreadyPrompted)
        };
    },
    createTopTrendsPrompt: function (text, alreadyPrompted) {
        'use strict';
        return {
            main: text + '<break time=\"0.6s\" />' + buildTopTrendPromptOptions(alreadyPrompted),
            choices: buildTopTrendPromptOptions(alreadyPrompted)
        };
    },
    createTrendPrompt: function (trend, alreadyPrompted) {
        'use strict';
        return {
            main: 'Okay. ' + trend.shortDescription + '<break time=\"0.6s\" />' + buildTrendPromptOptions(trend, alreadyPrompted),
            choices: buildTrendPromptOptions(trend, alreadyPrompted)
        };
    },
    createTrendDetailsPrompt: function (trend, alreadyPrompted) {
        'use strict';
        return {
            main: `${buildTrendDetails (trend)}<break time=\"0.6s\" />${buildPromptOptions(alreadyPrompted)}`,
            choices: buildPromptOptions(alreadyPrompted)
        };
    }
};

module.change_code = 1;
module.exports = promptHelpers;
