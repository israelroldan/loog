let boxen = require('boxen');

console.log(`   _                 
  | |                
  | |  __   __   __, 
  |/  /  \\_/  \\_/  | 
 /|__/\\__/ \\__/ \\_/|/
  1 simple log,   /| 
  1 extra letter  \\|`)

let header = (text) => {
    console.log(boxen(text, {margin: {top: 1}, padding: {left: 1}, borderStyle: 'round'}))
}

let showcase = (title, cfg) => {
    header(title);
    let log = require('.')(cfg);
    log.setLogLevel('all');
    log.$methods.forEach(level => {
        log[level](`loog.${level}`)
    });
}

showcase("Default settings (text mode)\n\n    let loog = require('loog');  ",{});

showcase("Emoji mode\n\n    let loog = require('loog')({  \n        prefixStyle: 'emoji'\n    });", {
    prefixStyle: 'emoji'
});

showcase("Ascii mode (Windows safe)\n\n    let loog = require('loog')({  \n        prefixStyle: 'ascii'\n    });", {
    prefixStyle: 'ascii'
});

showcase("No prefix, colorized\n\n    let loog = require('loog')({  \n        prefixes: {}\n    });", {
    prefixes: {}
});

showcase("No colors\n\n    let loog = require('loog')({  \n        colors: {}\n    });", {
    colors: {}
});

showcase("No prefix, no colors\n\n    let loog = require('loog')({  \n        prefixes: {}\n        colors: {}\n    });", {
    prefixes: {},
    colors: {}
});

header("Indentation example\n\n    loog.indent();\n    //statements, more indent/outdent  \n    loog.outdent();");
require('.')
    .setLogLevel('all')
    .info("Statement at the root level")
    .indent()
    .info("First level")
    .indent()
    .info("Second level")
    .debug("Second level")
    .outdent()
    .error("First level")
    .outdent()
    .warning("Root level");

header("Clear last line\n\n    loog.info('Doing stuf...');\n    //do your thing  \n    loog.clearLine().info('Stuff is done!');");
require('.')
    .info('Doing stuff');
var waitTill = new Date(new Date().getTime() + 3 * 1000);
while(waitTill > new Date()){}
require('.')
    .clearLine()
    .info('Stuff is done');

header("Count stuff\n\n    loog.count('Apple');\n    loog.count('Orange');\n    loog.count('Apple');");
require('.')
    .count('Apple')
    .count('Orange')
    .count('Apple');

header("Track and report labels\n\n    loog.track('Apple');\n    loog.track('Orange');\n    loog.track('Apple');\n    loog.report();");
require('.')
    .track('Apple')
    .track('Orange')
    .track('Apple')
    .report();

header("Track and report a single label\n\n    loog.track('Apple');\n    loog.track('Orange');\n    loog.track('Apple');\n    loog.report('Orange');");
require('.')
    .track('Apple')
    .track('Orange')
    .track('Apple')
    .report('Orange');

showcase("Process name prefix\n\n    let loog = require('loog')({  \n        process: 'npm'\n    });", {
    process: 'npm'
});