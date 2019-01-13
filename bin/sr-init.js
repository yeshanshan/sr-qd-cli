#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const fs = require('fs')
const glob = require('glob') 


// 根据输入，获取项目名称
let projectName = program.args[1]

if (!projectName) {
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help() 
  return
}

const list = glob.sync('*')  // 遍历当前目录
let rootName = path.basename(process.cwd())

if (list.length) {  // 如果当前目录不为空
    if (list.filter(name => {
        const fileName = path.resolve(process.cwd(), path.join('.', name))
        let isDir = false;
        fs.stat(fileName,function(err,stats){
            isDir = stats.isDirectory()
        })
        return name.indexOf(projectName) !== -1 && isDir
      }).length !== 0) {
      console.log(`项目${projectName}已经存在`)
      return
    }
    rootName = projectName
  } else if (rootName === projectName) {
      rootName = '.'
  } else {
      rootName = projectName
  }

  console.log(rootName)
  
  