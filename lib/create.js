const path = require('path');
const { readFile, writeFile } = require('./file');
const { absPath, toCamelCase } = require('./util');

const tempJsonFile = path.join(__dirname, '../temp/page/tmp-json');
const tempJsFile = path.join(__dirname, '../temp/page/tmp-js');
const tempTsFile = path.join(__dirname, '../temp/page/tmp-ts');
const tempWxmlFile = path.join(__dirname, '../temp/page/tmp-wxml');
const tempWxssFile = path.join(__dirname, '../temp/page/tmp-wxss');
const thTsFile = path.join(__dirname, '../temp/page/th-ts');

function createPage(paths, cmd) {
  const isTs = cmd.script === 'ts';
  const isTH = cmd.th;

  const temps = [
    tempJsonFile,
    tempWxmlFile,
    tempWxssFile,
    isTs ?
      isTH ? thTsFile : tempTsFile
      : tempJsFile
  ]

  if (paths.length === 0) {
    return;
  }
  paths.forEach(filePath => {
    temps.forEach(temp => {
      readFile(temp).then(data => {
        const type = temp.split(path.sep).pop().split('-')[1];
        const filename = path.basename(filePath);
        const absFile = absPath(`${filePath}.${type}`);
        const nameReg = /\{\{name\}\}/g;
        data = data.replace(nameReg, toCamelCase(filename));
        writeFile(absFile, data);
      })
    })
  })
}

function create(cmd) {
  if (cmd.page === 'page' || cmd.page === 'P') {
    createPage(cmd.args, cmd);
  }
}

module.exports = create;
