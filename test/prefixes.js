const Assert = require('assertly');
const expect = Assert.expect;
const sinon = require('sinon');
const chalk = require('chalk');

describe('prefixes', function () {
  beforeEach(function () {
    sinon.spy(console, 'log');
    sinon.spy(process.stdout, 'write');
  });

  afterEach(function () {
    console.log.restore();
    process.stdout.write.restore();
  });

  let loog = require('..')();
  let msg = 'Hi';

  describe('text', function () {
    it('should have \'text\' as default prefix style', function () {
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.info(loog.$prefixes.text.info)} ${msg}`);
    });
    it('should allow for no colors', function () {
      loog = loog({
        colors: {}
      });
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(`${loog.$prefixes.text.info} ${msg}`);
    })
  });

  describe('ascii', function () {
    it('should have \'ascii\' as possible prefix style', function () {
      loog = loog({
        prefixStyle: 'ascii'
      })
      loog.info(msg);

      expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.info(loog.$prefixes.ascii.info)} ${msg}`);
    });
  });

  describe('emoji', function () {
    it('should have \'emoji\' as possible prefix style', function () {
      loog = loog({
        prefixStyle: 'emoji'
      })
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.info(loog.$prefixes.emoji.info)} ${msg}`);
    });
  });

  describe('npm', function () {
    it('should have \'npm\' as possible prefix style', function () {
      loog = loog({
        prefixStyle: 'npm'
      })
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.info(loog.$prefixes.npm.info)} ${msg}`);
    });
  });

  describe('custom', function () {
    it('should allow specifying custom prefixes', function () {
      loog = loog({
        prefixes: {
          error: 'e',
          warn: 'w',
          warning: 'w',
          http: 'h',
          info: 'i',
          notice: 'n',
          timing: 't',
          verbose: 'v',
          debug: 'd',
          silly: 's',
          log: 'l'
        }
      });
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.info('i')} ${msg}`);
      loog.error(msg);
      expect(console.log.secondCall.args[0]).to.equal(`${loog.$colors.error('e')} ${msg}`);
    });
    it('should allow specifying custom colors', function () {
      loog = loog({
        colors: {
            error: chalk.magenta,
            warn: chalk.magenta,
            warning: chalk.magenta,
            http: chalk.magenta,
            info: chalk.magenta,
            notice: chalk.magenta,
            timing: chalk.magenta,
            verbose: chalk.magenta,
            debug: chalk.magenta,
            silly: chalk.magenta,
            log: chalk.magenta
        }
      });
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(`${chalk.magenta(loog.$prefixes.text.info)} ${msg}`);
    });
  });

  describe('none', function () {
    it('should provide a way to skip having prefixes, but show colors', function () {
      loog = loog({
        prefixes: {}
      });
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(loog.$colors.info(msg));
    });

    it('should provide a way to skip having prefixes, without colors', function () {
      loog = loog({
        prefixes: {},
        colors: {}
      })
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(msg);
      loog.info(msg);
      expect(console.log.secondCall.args[0]).to.equal(msg);
    });

    it('should not fail if an invalid value is passed to prefixStyle', function () {
      loog = loog({
        prefixStyle: 'foo'
      });
      loog.info(msg);
      expect(console.log.firstCall.args[0]).to.equal(`${loog.$colors.info(msg)}`);
    });
  });
});