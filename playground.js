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
const console = require('.');
console.error('Hi asdfasdfasdf asdfasdf asdf').clearLine().info('Test');
