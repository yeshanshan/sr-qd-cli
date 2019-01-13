#!/usr/bin/env node

const program = require('commander') 

program.version('1.0.0')
	.usage('<command> [项目名称]')
    .command('test', 'this will run sr-test.js')
    .command('init', 'this will tun sr-init.js')
    .parse(process.argv)

    
    
   