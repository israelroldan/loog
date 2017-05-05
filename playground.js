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

header("Default settings (prefixStyle: 'emoji')");
[ 'error',
  'warn',
  'warning',
  'http',
  'info',
  'verbose',
  'debug',
  'silly',
  'log' ].forEach(level => {
      log[level](`log.${level}`)
  });

header("Text mode (prefixStyle: 'text')");
log = log({
    prefixStyle: 'text'
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
      log[level](`log.${level}`)
  });

header("No prefix, colorized (prefixStyle: 'none')");
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
      log[level](`log.${level}`)
  });

header("No prefix, no colors (prefixStyle: 'none', color: false)");
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
      log[level](`log.${level}`)
  });