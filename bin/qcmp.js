#!/usr/bin/env node
const program = require('commander');
const colors = require('colors');
const create = require('../lib/create');

const package = require('../package.json')

colors.enable();

program
  .version(package.version)
  .usage('<pages/components> [options]')
  .description(`
  Quickly Create pages for miniapp.

  ${'e.g.'.blue}

    ${'$'.grey} ${'qcmp index/index'.green}

  Out:

    - ${'index/index.json'.magenta}
    - ${'index/index.ts'.magenta}
    - ${'index/index.wxml'.magenta}
    - ${'index/index.wxss'.magenta}
  `);

program
  .option('-s, --script [type]', 'The type of script file. [js/ts]', 'ts')
  .option('-C, --comp', 'Create component(s)')
  .option('--th', 'Use with my company')
  .option('-t, --temp <templatePath>', 'User defined template',)
  .parse(process.argv);

if (!program.args || program.args.length === 0) {
  program.help();
} else {
  create(program);
}
