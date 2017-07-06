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
        expect(console.log.firstCall.args[0]).to.equal(`${loog.$prefixes.text.debug} I should be visible`);
    });

    it('should not fail if an empty log level is passed', function () {
        let loog = require('..')();
        loog.setLogLevel();
        loog.log('Hi');
        expect(console.log.called).to.be.truthy();
        expect(console.log.firstCall.args[0]).to.equal(`Hi`);
    });

    it('The default log level should be info', function () {
        let loog = require('..')();
        loog.debug('I should not be visible!');
        expect(console.log.called).to.not.be.truthy();
        loog.setLogLevel();
        loog.info('Hi');
        expect(console.log.called).to.be.truthy();
        expect(console.log.firstCall.args[0]).to.equal(`${loog.$prefixes.text.info} Hi`);
    });

    it('Should provide a log level to mute everything', function () {
        let loog = require('..')();
        loog.setLogLevel('silent');
        loog.error('I should not be visible!');
        expect(console.log.called).to.not.be.truthy();
    });
});

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

describe('mute', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('Should provide a mute method', function () {
        let loog = require('..')();
        loog.log('I should be visible!');
        loog.mute();
        loog.log('I should not be visible!');
        loog.unmute();
        loog.log('I should be visible again!');
        expect(console.log.callCount).to.equal(2);
    });
});

describe('reflection-based tests', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    describe('log methods', function () {
        let loog = require('..')();
        loog.setLogLevel('all');
        let msg = 'Hi';    
        loog.$methods.forEach(m => {
            it(`should provide a '${m}' method`, function () {
                loog[m](msg);
                expect(console.log.firstCall.args[0]).to.equal(`${loog.$prefixes.text[m]} Hi`);
            });
        });
    });

    describe('prefixes', function () {
        let loog = require('..')();
        let msg = 'Hi';    
        describe('text', function () {
            it('should have \'text\' as default prefix style', function () {
                loog.info(msg);
                expect(console.log.calledWith(`${loog.$prefixes.text.info} ${msg}`)).to.be.truthy();
            });
        });
        describe('ascii', function () {
            it('should have \'ascii\' as possible prefix style', function () {
                loog = loog({
                    prefixStyle: 'ascii'
                })
                loog.info(msg);
                expect(console.log.calledWith(`${loog.$prefixes.ascii.info} ${msg}`)).to.be.truthy();
            });
        });
        describe('emoji', function () {
            it('should have \'emoji\' as possible prefix style', function () {
                loog = loog({
                    prefixStyle: 'emoji'
                })
                loog.info(msg);
                expect(console.log.calledWith(`${loog.$prefixes.emoji.info} ${msg}`)).to.be.truthy();
            });
        });
        describe('none', function () {
            it('should provide a way to skip having prefixes, but show colors', function () {
                loog = loog({
                    prefixStyle: 'none'
                })
                loog.info(msg);
                expect(console.log.calledWith(loog.$colors.info(msg))).to.be.truthy();
                loog.log(msg);
            });
            it('should provide a way to skip having prefixes, without colors', function () {
                loog = loog({
                    prefixStyle: 'none',
                    color: false
                })
                loog.info(msg);
                expect(console.log.calledWith(msg)).to.be.truthy();
            });
        })
    });
});