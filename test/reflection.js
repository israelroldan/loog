const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

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