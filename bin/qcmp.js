#!/usr/bin/env node
const program = require('commander');
const colors = require('colors');
const create = require('../lib/create');

const package = require('../package.json')

program
  .version(package.version)
  .usage('<pages/components> [options]')
  .description(`
  Quickly Create pages for miniapp.

  ${colors.blue('e.g.')}

    ${colors.gray('$')} ${colors.green('qcmp index/index')}

  Out:

    - ${'index/index.json'.magenta}
    - ${'index/index.ts'.magenta}
    - ${'index/index.wxml'.magenta}
    - ${'index/index.wxss'.magenta}
  `);

program
  .option('-s, --script [type]', 'The type of script file. [js/ts]', 'ts')
  .option('-p, --page [type]', 'page/P or component/C', 'page')
  .option('--th', 'Use with my company')
  .parse(process.argv);

if (!program.args || program.args.length === 0) {
  program.help();
} else {
  create(program);
}
