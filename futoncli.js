var path = require('path'),
    nano = require('nano'),
    flatiron = require('flatiron');

var futoncli = module.exports = new flatiron.App({
  directories: {
    root:    path.join(process.env.HOME, '.futoncli')
  }
});

require('pkginfo')(module, 'name', 'version');

futoncli.use(flatiron.plugins.cli, {
  usage: require('./commands/usage'),
  source: path.join(__dirname, 'futoncli', 'commands'),
  version: true,
  argv: {
    version: {
      alias: 'v',
      description: 'print futoncli version and exit',
      string: true
    }
  }
});


futoncli.started           = false;
futoncli.commands          = require('./commands');
futoncli.prompt.override   = futoncli.argv;
futoncli.prompt.properties = flatiron.common.mixin(
  futoncli.prompt.properties,
  { "yesno": {
      "name": 'yesno',
      "message": 'are you sure?',
      "validator": /y[es]?|n[o]?/,
      "warning": 'Must respond yes or no',
      "default": 'no'
    },
    "server": {
      "name": "server",
      "message": "CouchDB",
      "default": "http://localhost:5984"
    }
  }
);

require('./config');
require('./aliases');

futoncli.welcome = function () {
  futoncli.log.info('Welcome to ' + 'futoncli'.grey);
  futoncli.log.info('It worked if it ends with ' + 'futoncli'.grey + ' ok'.green.bold);
};

futoncli.start = function (callback) {
  futoncli.init(function (err) {
    if (err) {
      futoncli.welcome();
      callback(err);
      return futoncli.showError.apply(null, [command[0]].concat(arguments));
    }

    futoncli.welcome();

    var server = futoncli.config.get('server');
    if (!server) {
      return futoncli.prompt.get(["server"], function (err, stdin) {
        if (err) {
          callback(err);
          return futoncli.showError.apply(
            futoncli, [futoncli.argv._[0]].concat(arguments));
        }

       if(typeof stdin.server === "string" &&
          /^https*:\/\//.test(stdin.server)) {
         var server = stdin.server;
         futoncli.config.set('server', server);
         futoncli.config.save(function (err) {
           if (err) {
             callback(err);
             return futoncli.showError.apply(
               futoncli, [futoncli.argv._[0]].concat(err));
           }

           futoncli.log.info('Configured server ' + server.magenta);
           return futoncli.exec(futoncli.argv._, callback);
         });
       } else {
         err = new Error("Bad URL. Try http://localhost:5984");
         callback(err);
         return futoncli.showError.apply(
           futoncli, [futoncli.argv._[0]].concat(err));
       }
      });
    }
    return futoncli.exec(futoncli.argv._, callback);
  });
};

futoncli.exec = function (command, callback) {
  function execCommand (err) {
    if (err) {
      return callback(err);
    }

    futoncli.log.info('Executing command ' + command.join(' ').magenta);
    futoncli.router.dispatch('on', command.join(' '), futoncli.log, 
    function (err, shallow) {
      if (err) {
        callback(err);
        return futoncli.showError(command.join(' '), err, shallow);
      }

      callback.apply(null, arguments);
    });
  }

  return !futoncli.started ? futoncli.setup(execCommand) : execCommand();
};

futoncli.setup = function (callback) { 
  if (futoncli.started === true) {
    return callback();
  }

  futoncli.nano = require('nano')(futoncli.config.get('server'));
  futoncli.started = true;

  callback();
};

futoncli.showError = function (command, err, shallow, skip) {
  var stack;

  if (err.statusCode === '403') {
    futoncli.log.error('403 ' + err.result.error);    
  }
  else if (!skip) {
    futoncli.log.error('Error running command ' + command.magenta);
    
    if (err.message) {
      futoncli.log.error(err.message);
    }

    if (err.result) {
      if (err.result.error) {
        futoncli.log.error(err.result.error);
      }

      if (err.result.result && err.result.result.error) {
        if (err.result.result.error.stderr || err.result.result.error.stdout) {
          futoncli.log.error('');
          futoncli.log.error('There was an error while attempting to start your application.');
          futoncli.log.error(err.result.result.error.message);
          if (err.result.result.error.blame) {
            futoncli.log.error(err.result.result.error.blame.message);
            futoncli.log.error('');
            futoncli.log.error('This type of error is usually a ' + err.result.result.error.blame.type + ' error.');
          }
          
          futoncli.log.error('Error output from your application:');
          futoncli.log.error('');
          if (err.result.result.error.stdout) {
            err.result.result.error.stdout.split('\n').forEach(function (line) {
              futoncli.log.error(line);
            });
          }
          
          if (err.result.result.error.stderr) {
            err.result.result.error.stderr.split('\n').forEach(function (line) {
              futoncli.log.error(line);
            });
          }
        }
        else if (err.result.result.error.stack && futoncli.config.get('debug')) {
          futoncli.log.error('There was an error while attempting to deploy your application.');
          futoncli.log.error('');
          futoncli.log.error(err.result.result.error.message);
          
          if (err.result.result.error.blame) {
            futoncli.log.error(err.result.result.error.blame.message);
            futoncli.log.error('');
            futoncli.log.error('This type of error is usually a ' + err.result.result.error.blame.type + ' error.');
          } 
          
          futoncli.log.error('Error output from Haibu:');
          futoncli.log.error('');
          stack = err.result.result.error.result || err.result.result.error.stack;
          stack.split('\n').forEach(function (line) {
            futoncli.log.error(line);
          });
        }
      }
      else if (err.result.stack) {
        futoncli.log.warn('Error returned from Conservatory');
        err.result.stack.split('\n').forEach(function (line) {
          futoncli.log.error(line);
        });
      }
    }
    else {
      if (err.stack && !shallow) {
        err.stack.split('\n').forEach(function (trace) {
          futoncli.log.error(trace);
        });
      }
    }
  }

  futoncli.log.info('futoncli '.grey + 'not ok'.red.bold);
};