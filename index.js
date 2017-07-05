const chalk = require('chalk');

const logLevels = [
    'silly',
    'debug',
    'verbose',
    'info',
    'quiet',
    'silent'
];

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
    logLevel: process.env.npm_config_loglevel || 'info'
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
            if (logFn.enable && !me._mute) {
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
        if (this._indentation > 0) {
            this._indentation--;
        }
    }

    pauseIndentation () {
        this._indentWas = this._indentation;
    }

    resumeIndentation () {
        this._indentation = this._indentWas;
    }

    resetIndentation () {
        this._indentation = 0;
    }

    mute () {
        this._mute = true;
    }

    unmute () {
        this._mute = false;
    }

    setLogLevel(newLevel) {
        let me = this;
        if (logLevels.indexOf(newLevel) === -1) {
            newLevel = 'quiet';
        }
        switch (newLevel) {
            case "all":
            case "silly":
                me.silly.enable = true;
            case "debug":
            case "verbose":
                me.debug.enable = true;
                me.http.enable = true;
                me.verbose.enable = true;
            case "timing":
            case "http":
            case "notice":
            case "info":
                me.info.enable = true;
            case "warn":
                me.warn.enable = true;
                me.warning.enable = true;
            case "quiet":
            case "quiet":
            case "error":
                me.error.enable = true;                
                me.log.enable = true;
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