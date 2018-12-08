const path = require('path');
const { readFile, writeFile } = require('./file');
const { absPath, toCamelCase } = require('./util');
const { page, component } = require('../temp/config');

function readAndWrite(paths, temps) {
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

function createPage(paths, cmd) {
  if (paths.length === 0) {
    return;
  }
  const isTs = cmd.script === 'ts';
  const isTH = cmd.th;

  const temps = [
    page.json,
    page.wxml,
    page.wxss,
    isTs ?
      isTH ? page.thTs : page.ts
      : page.js
  ]

  readAndWrite(paths, temps);
}

function createComponent(paths, cmd) {
  if (paths.length === 0) {
    return;
  }

  const isTs = cmd.script === 'ts';
  const temps = [
    component.json,
    component.wxml,
    component.wxss,
    isTs ? component.ts : component.js
  ];

  readAndWrite(paths, temps);
}

function create(cmd) {
  if (cmd.page === 'page' || cmd.page === 'P') {
    createPage(cmd.args, cmd);
  } else if (cmd.page === 'component' || cmd.page === 'C') {
    createComponent(cmd.args, cmd);
  }
}

module.exports = create;
