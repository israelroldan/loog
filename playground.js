let boxen = require('boxen');
let log = require('.');

console.log(`
   _                 
  | |                
  | |  __   __   __, 
  |/  /  \\_/  \\_/  | 
 /|__/\\__/ \\__/ \\_/|/
  1 simple log,   /| 
  1 extra letter  \\| 
  `)

header = (text) => {
    console.log(boxen(text, {margin: {top: 1}, style: 'double'}))
}

header("Default settings\n\n    let loog = require('loog');");
[ 'error',
  'warn',
  'warning',
  'http',
  'info',
  'verbose',
  'debug',
  'silly',
  'log' ].forEach(level => {
      log[level](`loog.${level}`)
  });

header("Emoji mode\n\n    let loog = require('loog')({\n        prefixStyle: 'emoji'\n    });");
log = log({
    prefixStyle: 'emoji'
});

[ 'error',
  'warn',
  'warning',
  'http',
  'info',
  'verbose',
  'debug',
  'silly',
  'log' ].forEach(level => {
      log[level](`loog.${level}`)
  });
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
console.log("");
header("No prefix, colorized\n\n    let loog = require('loog')({\n        prefixStyle: 'none'\n    });");
log = log({
    prefixStyle: 'none'
});

[ 'error',
  'warn',
  'warning',
  'http',
  'info',
  'verbose',
  'debug',
  'silly',
  'log' ].forEach(level => {
      log[level](`loog.${level}`)
  });

header("No prefix, no colors\n\n    let loog = require('loog')({\n        prefixStyle: 'emoji'\n        color: false\n    });");
log = log({
    prefixStyle: 'none',
    color: false
});

[ 'error',
  'warn',
  'warning',
  'http',
  'info',
  'verbose',
  'debug',
  'silly',
  'log' ].forEach(level => {
      log[level](`loog.${level}`)
  });