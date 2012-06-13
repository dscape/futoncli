var colors = require('colors');

var g = "grey";
var r = "green";

module.exports = [
  '',
  '   ****           **                    '[r],
  '  ' + '/'[g] + '**'[r] + '/'[g] + '           ' + '/'[g] + '**'[r],
  ' ****** **   ** ******  ******  ******* '[r],
  '///'[g] + '**'[r] + '/'[g] + ' ' + '/'[g] + '**  '[r] + '/'[g] +
  '**'[r] + '///'[g] + '**'[r] + '/'[g] + '  **'[r] + '////'[g] +
  '**'[r] + '//'[g] + '**'[r] + '///'[g] + '**'[r],
  '  ' + '/'[g] + '**  '[r] + '/'[g] + '**  '[r] + '/'[g] + 
  '**  '[r] + '/'[g] + '**  '[r] + '/'[g] + '**   '[r] + '/'[g] + 
  '** '[r] + '/'[g] + '**  '[r] + '/'[g] + '**'[r],
  '  ' + '/'[g] + '**  '[r] + '/'[g] + '**  '[r] + '/'[g] + 
  '**  '[r] + '/'[g] + '**  '[r] + '/'[g] + '**   '[r] + '/'[g] + 
  '** '[r] + '/'[g] + '**  '[r] + '/'[g] + '**'[r],
  '  ' + '/'[g] + '**  '[r] + '//'[g] + '******  '[r] + '//'[g] +
  '** '[r] + '//'[g] + '******  ***  '[r] + '/'[g] +'**'[r],
  '  //    //////    //   //////  ///   // '[g],
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
  '  futon database'
];