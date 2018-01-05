let boxen = require('boxen');

let loog;

let header = (text) => {
    console.log(boxen(text, {margin: {top: 1}, style: 'double'}))
}
let showcase = (title, cfg) => {
    loog = loog ? loog(cfg) : require('.')(cfg);
    header(title);
    loog.$methods.forEach(level => {
        loog[level](`loog.${level}`)
    });
}

showcase('npm copycat', {
    process: 'npm',
    prefixStyle: 'npm'
})