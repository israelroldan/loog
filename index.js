const chalk = require('chalk');

const logLevels = [
    'all',
    'silly',
    'debug',
    'verbose',
    'timing',
    'http',
    'notice',
    'info',
    'warn',
    'quiet',
    'error',
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

/** Loog: A simple logger with one extra character */
class Loog {
    /**
     * Create a Loog instance.
     * @param {Object} config - The initial configuration
     * @param {string} [config.prefixStyle=text] - The prefix style, one of ['text', 'emoji', 'ascii', 'none'].
     * @param {string} [config.logLevel=info] - The log level, one of ['silly', 'debug', 'info', 'warn', 'error', 'silent'].
     */
    constructor (config) { 
        this._indentation = 0;
        this.cfg = Object.assign({}, config);
        switch (this.cfg.prefixStyle) {
            case "text":
                this.cfg.prefixes = textPrefixes;
                break;
            case "emoji":
                this.cfg.prefixes = emojiPrefixes;
                break;
            case "ascii":
                this.cfg.prefixes = asciiPrefixes;
                break;
            case "none":
                this.cfg.prefixes = {};
                if (!this.cfg.color) {
                    this.cfg.colorStyle = {};
                } else {
                    this.cfg.colorStyle = {
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
                }
                break;
        }
        this.setLogLevel(config.logLevel);
    }

    /** @private */
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

    /**
     * Indent subsequent log statements one level deeper.
     * @see {@link Loog#outdent}
     * @see {@link Loog#pauseIndentation}
     * @see {@link Loog#resumeIndentation}
     */
    indent () {
        this._indentation++;
    }

    /**
     * Outdent subsequent log statements one level.
     * @see {@link Loog#indent}
     * @see {@link Loog#pauseIndentation}
     * @see {@link Loog#resumeIndentation}
     * @see {@link Loog#resetIndentation}
     */
    outdent () {
        if (this._indentation > 0) {
            this._indentation--;
        }
    }

    /**
     * Temporarily pause indentation, subsequent statements will be logged at the root level.
     * Use `resumeIndentation()` to recover the indent level.
     * @see {@link Loog#resumeIndentation}
     * @see {@link Loog#indent}
     * @see {@link Loog#outdent}
     * @see {@link Loog#resetIndentation} 
     */
    pauseIndentation () {
        this._indentWas = this._indentation;
    }

    /**
     * Resumes the previously paused indentation.
     * @see {@link Loog#pauseIndentation}
     * @see {@link Loog#indent}
     * @see {@link Loog#outdent}
     * @see {@link Loog#resetIndentation}
     */
    resumeIndentation () {
        this._indentation = this._indentWas;
    }

    /**
     * Resets the indent level to 0.
     * @see {@link Loog#indent}
     * @see {@link Loog#outdent}
     * @see {@link Loog#pauseIndentation}
     * @see {@link Loog#resumeIndentation}
     */
    resetIndentation () {
        this._indentation = 0;
    }

    /**
     * Mutes all subsequent log statements
     * @see {@link Loog#unmute}
     */
    mute () {
        this._mute = true;
    }

    /**
     * Unmutes all subsequent log statements
     * @see {@link Loog#mute}
     */
    unmute () {
        this._mute = false;
    }

    /**
     * Changes the log level for subsequent statements
     * @param {string} [newLevel=quiet] - The log level to set. One of ['silly', 'debug', 'info', 'warn', 'error', 'silent']
     */
    setLogLevel(newLevel) {
        let me = this;
        if (!newLevel || logLevels.indexOf(newLevel) === -1) {
            newLevel = 'info';
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
    Object.defineProperty(Loog.prototype, level, {
        /** @private */
        get: function () { 
            if (!this[`_${level}`]) {
                this[`_${level}`] = this._getLogFn(level);
            }
            return this[`_${level}`];
        }
    });
});

const defaultCfg = {
    prefixStyle: 'text',
    color: true,
    colorStyle: {},
    logLevel: process.env.npm_config_loglevel || 'info'
};

let _instance = new Loog(defaultCfg);
/** @private */
function wrap () {
    let ex = function reconfigure (cfg) {
        _instance = new Loog(Object.assign({}, defaultCfg, cfg));
        return wrap();
    }
    Object.getOwnPropertyNames(Loog.prototype).forEach((method)=> {
        if (method !== "constructor" && method.charAt(0) !== "_") {
            ex[method] = _instance[method].bind(_instance);
        }
    });
    return ex;
}

module.exports = wrap();