const chalk = require('chalk');

const logLevels = ['silly', 'debug', 'verbose', 'info', 'quiet', 'silent'];

const textPrefixes = {
    'error': chalk.red.bold('[ERR]'),
    'warn': chalk.yellow.bold('[WRN]'),
    'warning': chalk.yellow.bold('[WRN]'),
    'http': chalk.cyan.bold('[NET]'),
    'info': chalk.green.bold('[INF]'),
    'verbose': chalk.blue.bold('[VRB]'),
    'debug': chalk.gray.bold('[DBG]'),
    'silly': chalk.white.bold('[LOL]'),
    'log': ''
};
    
const asciiPrefixes = {
    error: chalk.red(process.platform === 'win32' ? '►' : '✖'),
    warn: chalk.yellow(process.platform === 'win32' ? '‼' : '⚠'),
    warning: chalk.yellow(process.platform === 'win32' ? '‼' : '⚠'),
    http: chalk.cyan(process.platform === 'win32' ? '≡' : '☷'),
    info: chalk.green(process.platform === 'win32' ? 'i' : 'ℹ'),
    verbose: chalk.blue(process.platform === 'win32' ? 'i' : 'ℹ'),
    debug: chalk.gray(process.platform === 'win32' ? 'i': 'ℹ'),
    silly: chalk.white(process.platform === 'win32' ? '☺' : '☺'),
    log: ''
};

const emojiPrefixes = {
    error: '❌ ',
    warn: '〽️ ',
    warning: "〽️ ",
    http: '🌐 ',
    info: '➡️ ',
    verbose: '🎤 ',
    debug: '🔬 ',
    silly: '🙃 ',
    log: ''
};

const defaultColors = {
    error: chalk.red,
    warn: chalk.yellow,
    warning: chalk.yellow,
    http: chalk.cyan,
    info: chalk.green,
    verbose: chalk.gray,
    debug: chalk.blue,
    silly: chalk.white,
    log: t => t
};

const defaultCfg = {
    prefixStyle: 'text',
    color: true,
    colorStyle: {},
    logLevel: 'info'
};

class Log {
    constructor (cfg) { 
        this._indentation = 0;
        this.cfg = Object.assign({}, cfg);
        if (this.cfg.prefixStyle === 'text') {
            this.cfg.prefixes = textPrefixes;
        } else if (this.cfg.prefixStyle === 'emoji') {
            this.cfg.prefixes = emojiPrefixes;
        } else if (this.cfg.prefixStyle === 'ascii') {
            this.cfg.prefixes = asciiPrefixes;
        } else if (this.cfg.prefixStyle === 'none') {
            this.cfg.prefixes = {};
            if (!this.cfg.color) {
                this.cfg.colorStyle = {};
            } else {
                this.cfg.colorStyle = defaultColors;
            }
        }
        this.setLogLevel(cfg.logLevel);
    }

    _getLogFn(level) {
        let me = this;
        return function logFn () {
            if (logFn.enable) {
                let args = Array.prototype.slice.call(arguments);
                if (me.cfg.prefixes[level]) {
                    args.unshift(me.cfg.prefixes[level]);
                }
                if (this._indentation > 0) {
                    args.unshift(" ".repeat(this._indentation));
                }
                if (me.cfg.colorStyle[level]) {
                    console.log(me.cfg.colorStyle[level](args.join(' ')));
                } else {
                    console.log(args.join(' '));
                }
            }
        }
    }

    indent () {
        this._indentation++;
    }

    outdent () {
        this._indentation--;
    }

    mute () {
        this._mute++;
    }

    unmute () {
        this._mute--;
    }

    setLogLevel(newLevel) {
        let me = this;
        if (logLevels.indexOf(newLevel) === -1) {
            throw new Error(`Unknown log level '${newLevel}', must be one of: ${logLevels.join(', ')}`)
        }
        switch (newLevel) {
            case "silly":
                me.silly.enable = true;
            case "debug":
                me.debug.enable = true;
            case "verbose":
                me.http.enable = true;
                me.verbose.enable = true;
            case "info":
                me.info.enable = true;
            case "quiet":
                me.error.enable = true;                
                me.warn.enable = true;
                me.warning.eable = true;
                break;
            case "silent":
                me.mute();
                break;
        }
    }
}

Object.keys(textPrefixes).forEach(level => {
    Object.defineProperty(Log.prototype, level, {
        get: function () { 
            if (!this[`_${level}`]) {
                this[`_${level}`] = this._getLogFn(level);
            }
            return this[`_${level}`];
        }
    });
});

let _instance = new Log(defaultCfg);
function wrap () {
    let ex = function reconfigure (cfg) {
        _instance = new Log(Object.assign({}, defaultCfg, cfg));
        return wrap();
    }
    Object.getOwnPropertyNames(Log.prototype).forEach((method)=> {
        if (method !== "constructor" && method.charAt(0) !== "_") {
            ex[method] = _instance[method].bind(_instance);
        }
    });
    return ex;
}

module.exports = wrap();