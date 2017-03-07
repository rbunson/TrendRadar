/*jslint node:true */
var trendData = require('./trendData');
var trendRelevanceLevels = require('./trendRelevanceLevels');

var trendDataHelpers = {
    findByName: function (name) {
        'use strict';
        if (!name) {
            return null;
        }
        var i;
        for (i = 0; i < trendData.length; i += 1) {
            if (trendData[i].name.toLowerCase() === name.toLowerCase()) {
                return trendData[i];
            }
        }
        return null;
    },
    findByNameOrAlias: function (name) {
        if (!name) {
            return null;
        }
        var trend = this.findByName (name);
        if (trend) {
            return trend;
        }
        var i;
        for (i = 0; i < trendData.length; i += 1) {
            var a;
            for (a = 0; a < trendData [i].aliases.length; a += 1) {
                if (trendData[i].aliases [a].toLowerCase() === name.toLowerCase()) {
                    return trendData[i];
                }
            }
        }
        return null;
    },
    getTrendsByRelevanceLevel: function (level) {
        var trends = [];
        for (i = 0; i < trendData.length; i += 1) {
            if (trendData[i].relevanceLevel === level) {
                trends.push (trendData [i]);
            }
        }
        return trends;
    },
    getRandomTrend: function () {
        return trendData[Math.floor(Math.random() * trendData.length)];
    },
   getRandomTopTrend: function () {
        var topTrends = this.getTrendsByRelevanceLevel (trendRelevanceLevels.ADOPT.name);
        return topTrends[Math.floor(Math.random() * topTrends.length)];
    },
    getTopRandomTrends: function (trendCount) {
        var topTrends = [],
            count = 0;
        do {
           var trend = this.getRandomTopTrend ();
           topTrends.push (trend);
           count += 1;
        }
        while (count <= trendCount);
        return topTrends ();
    }

};

module.exports = trendDataHelpers;