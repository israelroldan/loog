let boxen = require('boxen');

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
    let log = require('.')(cfg);
    log.setLogLevel('all');
    [ 'error',
        'warn',
        'warning',
        'info',
        'notice',
        'http',
        'timing',
        'verbose',
        'debug',
        'silly', 
        'log' ].forEach(level => {
            log[level](`loog.${level}`)
        });
}

showcase("Default settings (text mode)\n\n    let loog = require('loog');  ",{});

showcase("Emoji mode\n\n    let loog = require('loog')({  \n        prefixStyle: 'emoji'\n    });", {
    prefixStyle: 'emoji'
});
/*console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")*/
showcase("Ascii mode (Windows safe)\n\n    let loog = require('loog')({  \n        prefixStyle: 'ascii'\n    });", {
    prefixStyle: 'ascii'
});

showcase("No prefix, colorized\n\n    let loog = require('loog')({  \n        prefixStyle: 'none'\n    });", {
    prefixStyle: 'none'
});
/*console.log("")
console.log("")
console.log("")
console.log("")
console.log("")*/
showcase("No prefix, no colors\n\n    let loog = require('loog')({  \n        prefixStyle: 'emoji'\n        color: false\n    });", {
    prefixStyle: 'none',
    color: false
});

header("Indentation example\n\n    loog.indent();\n    //statements, more indent/outdent  \n    loog.outdent();");
let log = require('.');
log.setLogLevel('all');
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
/*console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")*/