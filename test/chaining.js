const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');

describe('chaining', function () {
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('Should allow chaining function calls', function () {
        let loog = require('..')();
        loog.log('hi')
            .indent()
            .info('info')
            .indent()
            .warn('warn')
            .outdent()
            .error('error')
            .outdent()
            .log('bye');
        expect(console.log.callCount).to.equal(5);
        expect(console.log.thirdCall.args[0]).to.equal(`   ${loog.$prefixes.text.warn} warn`);
    });
});