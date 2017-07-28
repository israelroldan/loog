const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('mute', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('Should provide mute / unmute methods', function () {
        let loog = require('..')();
        loog.log('I should be visible!');
        loog.mute();
        loog.log('I should not be visible!');
        loog.unmute();
        loog.log('I should be visible again!');
        expect(console.log.callCount).to.equal(2);
    });
});