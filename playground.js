let boxen = require('boxen');
let chalk = require('chalk');

console.log(`
   _                 
  | |                
  | |  __   __   __, 
  |/  /  \\_/  \\_/  | 
 /|__/\\__/ \\__/ \\_/|/
  1 simple log,   /| 
  1 extra letter  \\| 
  `)

let header = (text) => {
    console.log(boxen(text, {margin: {top: 1}, style: 'double'}))
}

let showcase = (title, cfg) => {
    header(title);
    [ 'error',
        'warn',
        'warning',
        'http',
        'info',
        'verbose',
        'debug',
        'silly',
        'log' ].forEach(level => {
            require('.')(cfg)[level](`loog.${level}`)
        });
}

showcase("Default settings\n\n    let loog = require('loog');",{});

showcase("Emoji mode\n\n    let loog = require('loog')({\n        prefixStyle: 'emoji'\n    });", {
    prefixStyle: 'emoji'
});

showcase("No prefix, colorized\n\n    let loog = require('loog')({\n        prefixStyle: 'none'\n    });", {
    prefixStyle: 'none'
});

showcase("Custom prefixes\n\n    let loog = require('loog')({\n        prefixStyle: 'custom',\n        prefixes: {\n            error: chalk.red.bold('[ERR]'),\n            //...\n        }\n    });", {
    prefixStyle: 'custom',
    prefixes: {
        'error': chalk.red.bold('[ERR]'),
        'warn': chalk.yellow.bold('[WRN]'),
        'warning': chalk.yellow.bold('[WRN]'),
        'http': chalk.cyan.bold('[NET]'),
        'info': chalk.green.bold('[INF]'),
        'verbose': chalk.magenta.bold('[VRB]'),
        'debug': chalk.gray.bold('[DBG]'),
        'silly': chalk.white.bold('[LOL]'),
        'log': ''
    }
});

showcase("No prefix, no colors\n\n    let loog = require('loog')({\n        prefixStyle: 'emoji'\n        color: false\n    });", {
    prefixStyle: 'none',
    color: false
});

header("Indentation example\n\n    loog.indent();\n    //statements, more indent/outdent\n    loog.outdent();");
let log = require('.');
log.info("Statement at the root level");
log.indent();
log.info("First level");
log.indent();
log.info("Second level");
log.debug("Second level");
log.outdent();
log.error("First level");
log.outdent();
log.warning("Root level");