const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('mute', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(process.stdout, 'write');
    });

    afterEach(function() {
        console.log.restore();
        process.stdout.write.restore();
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

    it('should not clear the screen while muted', function () {
        let loog = require('..')();
        loog.log('hi').mute().clear().unmute().log('bye');
        expect(process.stdout.write.secondCall.args[0]).to.equal('bye\n');
    });

    it('should not clear the last line while muted', function () {
        let loog = require('..')();
        loog.log('hi').mute().clearLine().unmute().log('bye');
        expect(process.stdout.write.secondCall.args[0]).to.equal('bye\n');
    });
});