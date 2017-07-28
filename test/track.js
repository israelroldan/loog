const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('track', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(process.stdout, 'write');
    });

    afterEach(function() {
        console.log.restore();
        process.stdout.write.restore();
    });

    it('should provide track / report methods', function () {
        let loog = require('..')();
        loog.track('foo');
        loog.track('bar');
        expect(console.log.firstCall).to.be.falsy();
        loog.report();
        expect(console.log.firstCall.args[0]).to.equal('bar: 1, foo: 1');
    });

    it('should provide a way to report on a single tracker', function () {
        let loog = require('..')();
        loog.track('foo');
        loog.track('bar');
        loog.report('foo');
        expect(console.log.firstCall.args[0]).to.equal('foo: 1');
    });

    it('should not track anything if no label is passed', function () {
        let loog = require('..')();
        loog.track();
        loog.track();
        loog.report();
        expect(console.log.firstCall).to.be.falsy();
    });

    it('should provide a way to untrack a label', function () {
        let loog = require('..')();
        loog.track('foo');
        loog.track('bar');
        loog.untrack(); // nothing happens
        loog.untrack('foo');
        loog.report();
        expect(console.log.firstCall.args[0]).to.equal('bar: 1');
    });
});