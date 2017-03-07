/*jslint node:true */

var textHelper = {
    sentence: function (myString) {
        'use strict';
        return "<s>" + myString + "</s>";
    },
    paragraph: function (myString) {
        'use strict';
        return "<p>" + myString + "</p>";
    },
    convertArrayToReadableString: function (array) {
        'use strict';
        var readableString = "",
            i;
        for (i = 0; i < array.length; i += 1) {
            if (i === (array.length - 1) && array.length > 1) {
                readableString += `and ${array[i]}`;
            } else {
                readableString += `${array[i]}`;
                if (i < array.length-1) {
                    readableString += ", ";
                }
            }
        }
        return readableString;
    },
    phraseResponse: function (text) {
        'use strict';
        var response = text;
        return response;
    }
};

module.exports = textHelper;