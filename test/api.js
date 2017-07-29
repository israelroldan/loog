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

    describe('log methods', function () {
        let loog = require('..')();
        loog.setLogLevel('all');
        let msg = 'Hi, ';    
        loog.$methods.forEach(m => {
            it(`should provide a '${m}' method`, function () {
                loog[m](`${msg}${m}`);
                expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors[m](loog.$prefixes.text[m])}${(m !== 'log') ? " " : ""}Hi, ${m}`);
            });
        });
    });

    describe('process name', function () {
        let loog = require('..')({
            process: 'foo'
        });
        it(`should optionally display a process name before the prefixes`, function () {
            loog.info('Hi');
            expect(console.log.firstCall.args[0]).to.equal(`foo ${loog.$colors.info(loog.$prefixes.text.info)} Hi`);
        });
        it(`should not be afected by indentation`, function () {
            loog.indent().indent();
            loog.info('Hi');
            loog.resetIndentation();
            expect(console.log.firstCall.args[0]).to.equal(`foo    ${loog.$colors.info(loog.$prefixes.text.info)} Hi`);
        });
        it(`should apply to utility methods as well`, function () {
            loog.count('hi');
            expect(console.log.firstCall.args[0]).to.equal(`foo hi: 1`);
            loog.track('foo');
            loog.track('bar');
            loog.report();
            expect(console.log.secondCall.args[0]).to.equal(`foo bar: 1, foo: 1`);
        });
    })
});