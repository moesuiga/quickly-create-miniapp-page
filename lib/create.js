const path = require('path');
const fs = require('fs');
const { readFile, writeFile } = require('./file');
const { absPath, toCamelCase, extensions } = require('./util');
const { page, component } = require('../temp/config');


const userDefTemp = {};

extensions.forEach(ext => {
  userDefTemp[ext] = '';
})

/**
 * 读取模板文件并写入新的文件
 * @param {Array<String>} paths 要生成的文件路径
 * @param {Array<String>} temps 模板文件路径
 */
function readAndWrite(paths, temps) {
  paths.forEach(filePath => {
    temps.forEach(temp => {
      readFile(temp).then(data => {
        const tempFileName = temp.split(path.sep).pop();
        let type = '';
        // user defined temp file
        // e.g. /temp/file/path.json
        if (tempFileName.indexOf('.') > 0) {
          const dotArray = tempFileName.split('.');
          type = dotArray[dotArray.length - 1];
        }

        // default temp file
        if (!type && tempFileName.indexOf('-') > 0) {
          type = tempFileName.split('-')[1];
        }

        if (!type) {
          throw TypeError('Unknown file type', temp);
        }
        const filename = path.basename(filePath);
        const absFile = absPath(`${filePath}.${type}`);
        const nameReg = /\{\{name\}\}/g;
        data = data.replace(nameReg, toCamelCase(filename));
        writeFile(absFile, data);
      })
    })
  })
}

/**
 * 生成页面
 * @param {Array<String>} paths 要写入的页面文件路径
 * @param {Object} cmd
 */
function createPage(paths, cmd) {
  if (paths.length === 0) {
    return;
  }
  const isTs = cmd.script === 'ts';
  const isTH = cmd.th;

  const temps = [
    userDefTemp.json || page.json,
    userDefTemp.wxml || page.wxml,
    userDefTemp.wxss || page.wxss,
    isTs ?
      userDefTemp.ts || (isTH ? page.thTs : page.ts)
      : userDefTemp.js || page.js
  ]

  readAndWrite(paths, temps);
}

/**
 * 生成组件
 * @param {Array<String>} paths 要写入的组件文件路径
 * @param {Object} cmd
 */
function createComponent(paths, cmd) {
  if (paths.length === 0) {
    return;
  }

  const isTs = cmd.script === 'ts';
  const temps = [
    userDefTemp.json || component.json,
    userDefTemp.wxml || component.wxml,
    userDefTemp.wxss || component.wxss,
    isTs ? userDefTemp.ts || component.ts : userDefTemp.js || component.js
  ];

  readAndWrite(paths, temps);
}

function queryUserDefTempFiles(tempPath) {
  const absTempPath = absPath(tempPath);
  extensions.forEach(ext => {
    const filePath = `${absTempPath}.${ext}`;
    if(fs.existsSync(filePath)) {
      userDefTemp[ext] = filePath;
    }
  })
}

function create(cmd) {
  if (cmd.temp) {
    queryUserDefTempFiles(cmd.temp)
  }
  if (!cmd.comp) {
    createPage(cmd.args, cmd);
  } else {
    createComponent(cmd.args, cmd);
  }
}

module.exports = create;
