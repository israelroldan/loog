const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('api', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
        sinon.spy(process.stdout, 'write');
    });

    afterEach(function() {
        console.log.restore();
        process.stdout.write.restore();
    });

    describe('clear', function () {
        it('should provide a clear method', function () {
            let loog = require('..')();
            loog.log('hi');
            loog.clear();
            loog.log('bye');
            expect(process.stdout.write.secondCall.args[0]).to.equal('\x1Bc');
        });
        it('should provide a clearLine method', function () {
            let loog = require('..')();
            loog.log('hi');
            loog.clearLine();
            loog.log('bye');
            expect(process.stdout.write.secondCall.args[0]).to.equal('\u001B[A\u001B[K');
        });
    });

    describe('count', function () {
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
            expect(console.log.firstCall.args[0]).to.equal(`${loog.$prefixes.text.warn} foo: 1`);
        });
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