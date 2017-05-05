const chalk = require('chalk');

const textPrefixes = {
    error: chalk.red(process.platform === 'win32' ? '×' : '✖'),
    warn: chalk.yellow(process.platform === 'win32' ? '‼' : '⚠'),
    warning: chalk.yellow(process.platform === 'win32' ? '‼' : '⚠'),
    http: chalk.cyan(process.platform === 'win32' ? '≡' : '☷'),
    info: chalk.green(process.platform === 'win32' ? 'i' : 'ℹ'),
    verbose: chalk.blue(process.platform === 'win32' ? 'i' : 'ℹ'),
    debug: chalk.dim(process.platform === 'win32' ? 'i': 'ℹ'),
    silly: chalk.inverse(process.platform === 'win32' ? '☺' : '☺'),
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
    verbose: chalk.blue,
    debug: chalk.dim,
    silly: chalk.white,
    log: t => t
};

const defaultCfg = {
    prefixStyle: 'text',
    color: true,
    colorStyle: {}
};

class Log {
    constructor (cfg) { 
        this._indentation = 0;
        this.cfg = Object.assign({}, cfg);
        if (this.cfg.prefixStyle === 'text') {
            this.cfg.prefixes = textPrefixes;
        } else if (this.cfg.prefixStyle === 'emoji') {
            this.cfg.prefixes = emojiPrefixes;
        } else if (this.cfg.prefixStyle === 'none') {
            this.cfg.prefixes = {};
            if (!this.cfg.color) {
                this.cfg.colorStyle = {};
            } else {
                this.cfg.colorStyle = defaultColors;
            }
        }
    }

    _getLogFn(level) {
        let me = this;
        return function () {
            let args = Array.prototype.slice.call(arguments);
            if (me.cfg.prefixes[level]) {
                args.unshift(me.cfg.prefixes[level]);
            }
            args.unshift(" ".repeat(this._indentation));
            if (me.cfg.colorStyle[level]) {
                console.log(me.cfg.colorStyle[level](args.join(' ')));
            } else {
                console.log.apply(null, args);
            }
        }
    }

    indent () {
        this._indentation++;
    }

    outdent () {
        this._indentation--;
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

module.exports =wrap();