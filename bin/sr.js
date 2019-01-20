#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program.version(pkg.version, '-v, --version')
    .usage('<command> [项目名称]')
    .command('test', 'this will run sr-test.js')
    .command('init', 'this will run sr-init.js')
    .parse(process.argv)



