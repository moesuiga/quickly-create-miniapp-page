const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { absPath } = require('./util');

colors.setTheme({
  write: 'cyan'
})

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(absPath(file), 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  }).catch(err => {
    console.error(err);
  })
}

function writeFile(file, data) {
  if (path.isAbsolute(file)) {
    const arr = file.split(path.sep);
    let p = process.platform === 'win32' ? '' : path.sep;
    while (arr.length > 1) {
      p += arr.shift() + path.sep;
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
      }
    }
  }
  fs.writeFile(absPath(file), data, 'utf-8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(colors.write('[write] '), absPath(file));
  })
}

module.exports = {
  absPath,
  readFile,
  writeFile
}
