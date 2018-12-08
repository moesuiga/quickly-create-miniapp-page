const path = require('path');

module.exports = {
  page: {
    js: path.join(__dirname, './page/tpl-js'),
    json: path.join(__dirname, './page/tpl-json'),
    ts: path.join(__dirname, './page/tpl-ts'),
    thTs: path.join(__dirname, './page/th-ts'),
    wxml: path.join(__dirname, './page/tpl-wxml'),
    wxss: path.join(__dirname, './page/tpl-wxss'),
  },
  component: {
    js: path.join(__dirname, './component/tpl-js'),
    json: path.join(__dirname, './component/tpl-json'),
    ts: path.join(__dirname, './component/tpl-ts'),
    wxml: path.join(__dirname, './component/tpl-wxml'),
    wxss: path.join(__dirname, './component/tpl-wxss'),
  },
}
