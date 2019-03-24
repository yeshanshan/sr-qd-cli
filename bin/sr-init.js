#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const inquirer = require('inquirer')
const download = require('../lib/download')
const chalk = require('chalk') // command color
const logSymbols = require('log-symbols')

try {
    program.usage('<project-name>')
        .parse(process.argv)

    // 根据输入，获取项目名称
    let args = program.args || [];
    let projectName = args.length ? args[0] : '';

    if (!projectName) {
        // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
        program.help()
        return
    }

    const list = glob.sync('*')  // 遍历当前目录
    let rootName = path.basename(process.cwd())
    let next = ''
    
    if (list.length) {  // 如果当前目录不为空
        if (list.filter(name => {
            const fileName = path.resolve(process.cwd(), path.join('.', name))
            let isDir = false;
            fs.stat(fileName, function (err, stats) {
                isDir = stats.isDirectory()
            })
            return name.indexOf(projectName) !== -1 && isDir
        }).length !== 0) {
            console.log(`项目${projectName}已经存在`)
            return
        }
        next = Promise.resolve(projectName)
    } else if (rootName === projectName) {
        next = inquirer.prompt([
            {
                name: 'buildInCurrent',
                message: 'The current directory is empty and the directory name is the same as the project name. Do you want to create a new project directly in the current directory?',
                // message: '当前目录为空，目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
                type: 'confirm',
                default: true
            }
        ]).then(answer => {
            return Promise.resolve(answer.buildInCurrent ? projectName : '.')
        })
    } else {
        next = Promise.resolve(projectName)
    }
    handle();
    function handle() {
        next.then(projectName => {
            if (projectName !== '.') {
                fs.mkdirSync(projectName)
                download(projectName)
            }
        })
    }
} catch (e) {
    console.error('error:', e.message);
}
