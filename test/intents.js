////////////////////////////////////////////////////////////////////////////////
// Copyright (c) 2015-2016 Rick Wargo. All Rights Reserved.
//
// Licensed under the MIT License (the "License"). You may not use this file
// except in compliance with the License. A copy of the License is located at
// http://opensource.org/licenses/MIT or in the "LICENSE" file accompanying
// this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
// OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
////////////////////////////////////////////////////////////////////////////////

/*jslint node: true */
/*jslint todo: true */
/*global describe */
/*global it */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    should = require('chai').should(),
    request = require('./helper/request'),
    Text = require('../src/lib/helper/text'),
    trendDataHelpers = require('../src/lib/helper/trendDataHelpers'),
    trendData = require('../src/lib/helper/trendData'),
    textHelper = require('../src/lib/helper/textHelper'),
    promptHelpers = require('../src/lib/helper/promptHelpers');

chai.use(chaiAsPromised);


describe('starting up', function () {
    it('should fail if an unknown application id is provided', function () {
        var result = request.badAppId();
        return result.should.eventually.be.rejected;
    });

    it('should respond what to ask for', function () {
        var result = request.launchRequest();
        return result.should.eventually.equal('<speak> ' + Text.welcomeMessage + ' </speak>');
    });
});

describe('filtering', function () {
    it('should find record in trend data', function () {
        var myArray = [];
        var slotValue = "blockchain",
            trend = trendDataHelpers.findByNameOrAlias(slotValue);
        return trend.name.should.equal("Blockchain Technology");
    });

});

