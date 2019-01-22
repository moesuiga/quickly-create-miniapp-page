const path = require('path');

function absPath(p) {
  return path.isAbsolute(p) ? p : path.join(process.cwd(), p);
}

function toCamelCase(name) {
  const arr = name.split('-');
  return arr.reduce((CamelCase, name) => {
    return CamelCase + name.replace(/\w/, (match, index) => index === 0 ? match.toUpperCase() : match);
  }, '')
}

module.exports = {
  absPath,
  toCamelCase,
  extensions: ['wxml', 'wxss', 'js', 'ts', 'json']
}
