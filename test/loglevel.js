const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('log level', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('should provide a way to configure the log level', function () {
        let loog = require('..')();
        loog.debug('I should not be visible!');
        expect(console.log.called).to.not.be.truthy();
        loog.setLogLevel('debug');
        loog.debug('I should be visible');
        expect(console.log.called).to.be.truthy();
        expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.debug(loog.$prefixes.text.debug)} I should be visible`);
    });

    it('should not fail if an empty log level is passed', function () {
        let loog = require('..')();
        loog.setLogLevel();
        loog.log('Hi');
        expect(console.log.called).to.be.truthy();
        expect(console.log.firstCall.args[0]).to.equal(`Hi`);
    });

    it('should assume info as default level', function () {
        let loog = require('..')();
        loog.debug('I should not be visible!');
        expect(console.log.called).to.not.be.truthy();
        loog.setLogLevel();
        loog.info('Hi');
        expect(console.log.called).to.be.truthy();
        expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.info(loog.$prefixes.text.info)} Hi`);
    });

    it('should provide a log level to mute everything', function () {
        let loog = require('..')();
        loog.setLogLevel('silent');
        loog.error('I should not be visible!');
        expect(console.log.called).to.not.be.truthy();
    });
});