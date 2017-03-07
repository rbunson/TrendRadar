/*jslint node: true */

var trendRelevanceLevels = {
    HOLD: {
        name: "Hold",
        shortDescription: "Watch list",
        description: "This trend might affect your business unit, but not at this point in time.  Keep it on your watch list"
    },
    ASSESS: {
        name: "Assess",
        shortDescription: "Evaluation needed",
        description: "This trend is worth exploring with the goal of understanding and evaluating how it will affect your business unit"
    },
    TRIAL: {
        name: "Trial",
        shortDescription: "Initiatives in affected units",
        description: "This trend will affect your business, but only those units acquainted with risk should activate resources for adequate initiatives"
    },
    ADOPT: {
        name: "Adopt",
        shortDescription: "Start initiatives in your unit",
        description: "An adoption of this trend is strongly recommened.  Start initiatives and consider facets and implications of this trend on your business unit"
    }
};
module.change_code = 1;
module.exports = trendRelevanceLevels;
