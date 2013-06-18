var colors = require('colors');

module.exports = [
  ''
].concat(
  require('../couchdb.json')
    .join('')
    .split('\n')
).concat([
  '',
  'Futon on your command line',
  '',
  'Usage:'.cyan.bold.underline,
  '',
  '  futon <resource> <action> <param1> <param2> ...',
  '',
  'More help:'.cyan.bold.underline,
  '',
  '  futon config',
  '  futon document',
  '  futon design',
  '  futon document',
  '  futon database',
  '  futon endpoint'
]);
