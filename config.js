var path = require('path'),
    fs = require('fs'),
    futoncli = require('./futoncli');

var _load = futoncli.config.load;

try {
  futoncli.config.file({
    file: futoncli.argv.futoncliconf || futoncli.argv.q || '.futoncliconf',
    dir: process.env.HOME,
    search: true
  });
}
catch (err) {
  console.log('Error parsing ' + futoncli.config.stores.file.file.magenta);
  console.log(err.message);
  console.log('');
  console.log('This is most likely not an error in futoncli.');
  console.log('Please check your futoncliconf and try again.');
  console.log('');
  process.exit(1);
}


var defaults = {
  colors: true,
  debug: true,
  loglevel: 'info',
  loglength: 110,
  root: process.env.HOME,
  userconfig: '.futoncliconf',
  modes: {
    exec: 0777 & (~022), 
    file: 0666 & (~022),
    umask: 022
  }
};

futoncli.config.defaults(defaults);

futoncli.use(require('flatiron-cli-config'), {
  store: 'file',
  restricted: [
    'root', 
    'userconfig'
  ],
  before: {
    list: function () {
      var configFile = futoncli.config.stores.file.file;

      var display = [
        'Here is your ' + configFile.grey + ' file:',
        'If you\'d like to change a property try:',
        'futoncli config set <key> <value>'
      ];

      display.forEach(function (line) {
        futoncli.log.help(line);
      });

      return true;
    }
  }
});


futoncli.config.load = function (callback) {
  _load.call(futoncli.config, function (err, store) {
    if (err) {
      return callback(err, true, true, true);
    }

    futoncli.config.set('userconfig', futoncli.config.stores.file.file);

    callback(null, store);
  });
};