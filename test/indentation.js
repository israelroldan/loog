const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('indentation', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('should provide a way to indent log statements', function () {
        let loog = require('..')();
        loog.log('Level 1');
        loog.indent();
        loog.log('Level 2');
        loog.indent();
        loog.log('Level 3');
        expect(console.log.firstCall.args[0]).to.equal('Level 1');
        expect(console.log.secondCall.args[0]).to.equal('  Level 2');
        expect(console.log.thirdCall.args[0]).to.equal('   Level 3');
    });

    it('should provide a way to outdent log statements', function () {
        let loog = require('..')();
        loog.log('Level 1');
        loog.indent();
        loog.log('Level 2');
        loog.outdent();
        loog.log('Level 1');
        loog.outdent(); // should not fail
        expect(console.log.firstCall.args[0]).to.equal('Level 1');
        expect(console.log.secondCall.args[0]).to.equal('  Level 2');
        expect(console.log.thirdCall.args[0]).to.equal('Level 1');
    });

    it('should provide a way to pause and resume indentation', function () {
        let loog = require('..')();
        loog.indent();
        loog.indent();
        loog.log('Level 3');
        loog.pauseIndentation();
        loog.log('Level 1');
        loog.resumeIndentation();
        loog.log('Level 3');
        expect(console.log.firstCall.args[0]).to.equal('   Level 3');
        expect(console.log.secondCall.args[0]).to.equal('Level 1');
        expect(console.log.thirdCall.args[0]).to.equal('   Level 3');
    });

    it('should provide a way to reset indentation completely', function () {
        let loog = require('..')();
        loog.indent();
        loog.indent();
        loog.log('Level 3');
        loog.resetIndentation();
        loog.log('Level 1');
        loog.resumeIndentation();
        loog.log('Level 1');
        expect(console.log.firstCall.args[0]).to.equal('   Level 3');
        expect(console.log.secondCall.args[0]).to.equal('Level 1');
        expect(console.log.thirdCall.args[0]).to.equal('Level 1');
    });
});