let boxen = require('boxen');

let loog;

let header = (text) => {
    console.log(boxen(text, {margin: {top: 1}, style: 'double'}))
}
let showcase = (title, cfg) => {
    loog = loog ? loog(cfg) : require('.')(cfg);
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
            loog[level](`loog.${level}`)
        });
}

showcase('Default log level (info)', {});

showcase("Custom log level\n\n    let loog = require('loog')({  \n        logLevel: 'debug'\n    });", {logLevel: 'debug'});

showcase("Adjust log level at runtime\n\n    loog.setLogLevel('quiet');",{logLevel: 'quiet'});