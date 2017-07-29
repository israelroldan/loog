const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('count', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(process.stdout, 'write');
    });

    afterEach(function() {
        console.log.restore();
        process.stdout.write.restore();
    });

    it('should provide a count method', function () {
        let loog = require('..')();
        loog.count();
        loog.count();
        expect(console.log.secondCall.args[0]).to.equal('2');
    });
    it('should provide a count method for multiple labels', function () {
        let loog = require('..')();
        loog.count('foo');
        loog.count('bar');
        loog.count('foo');
        expect(console.log.thirdCall.args[0]).to.equal('foo: 2');
    });
    it('should allow skipping the log call if desired', function () {
        let loog = require('..')();
        loog.count('foo', null);
        loog.count('foo', null);
        loog.count('foo');
        expect(console.log.firstCall.args[0]).to.equal('foo: 3');
    });
    it('should provide a way to clear a given counter', function () {
        let loog = require('..')();
        loog.count('foo', null);
        loog.count('foo', null);
        loog.clearCount('foo');
        loog.count('foo');
        expect(console.log.firstCall.args[0]).to.equal('foo: 1');
        loog = require('..')();
        loog.count(null, null);
        loog.count(null, null);
        loog.clearCount();
        loog.count(null);
        expect(console.log.secondCall.args[0]).to.equal('1');
    });

    it('should allow specifying a custom log type', function () {
        let loog = require('..')();
        loog.count('foo', 'warn');
        expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.warn(loog.$prefixes.text.warn)} foo: 1`);
    });
});