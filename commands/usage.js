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
  '  futoncli <resource> <action> <param1> <param2> ...',
  '',
  'Common Commands:'.cyan.bold.underline,
  '',
  '  futoncli config (e.g. to set your couchdb endpoint)'
];