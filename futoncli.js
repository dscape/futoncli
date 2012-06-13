var path = require('path'),
    nano = require('nano'),
    url = require('url'),
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
      description: 'print futon version and exit',
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
    "endpoint": {
      "name": "endpoint",
      "message": "CouchDB",
      "default": "http://localhost:5984/dbname"
    }
  }
);

require('./config');
require('./aliases');

futoncli.welcome = function () {
  futoncli.log.info('Welcome to ' + 'futon'.grey);
  futoncli.log.info('It worked if it ends with ' + 'futon'.grey + ' ok'.green.bold);
};

futoncli.start = function (callback) {
  futoncli.init(function (err) {
    if (err) {
      futoncli.welcome();
      callback(err);
      return futoncli.showError.apply(null, [command[0]].concat(arguments));
    }

    futoncli.welcome();

    var endpoint = futoncli.config.get('endpoint');
    if (!endpoint) {
      return futoncli.prompt.get(["endpoint"], function (err, stdin) {
        if (err) {
          callback(err);
          return futoncli.showError.apply(
            futoncli, [futoncli.argv._[0]].concat(arguments));
        }

       if(typeof stdin.endpoint === "string" &&
          /^https*:\/\//.test(stdin.endpoint)) {
         var endpoint = stdin.endpoint;
         futoncli.config.set('endpoint', endpoint);
         futoncli.config.save(function (err) {
           if (err) {
             callback(err);
             return futoncli.showError.apply(
               futoncli, [futoncli.argv._[0]].concat(err));
           }

           futoncli.log.info('Configured endpoint ' + endpoint.magenta);
           return futoncli.exec(futoncli.argv._, callback);
         });
       } else {
         err = new Error("Bad URL. Try http://localhost:5984/dbname");
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

  var endpoint = futoncli.config.get('endpoint');

  futoncli.db = require('nano')(endpoint);
  
  var parsed_endpoint = url.parse(endpoint);
  delete parsed_endpoint.href;
  delete parsed_endpoint.path;
  delete parsed_endpoint.pathname;

  futoncli.server = require('nano')(url.resolve(parsed_endpoint, ""));

  if(!futoncli.db.attachment) {
    // it would be idea to support admin functions too, like creating
    // databases and stuff
    //
    // but this is it for now
    // pull requests are welcome
    var err = futoncli.db.db 
            ? new Error("You CouchDB endpoint doesn't seem to be a db " +
                        endpoint + ". Update your " +
                        " config with futon config set endpoint " +
                        " http://localhost:5984/sampledb")
            : new Error("Your CouchDB Endpoint seems invalid " + endpoint);
    callback(err);
     return futoncli.showError.apply(
       futoncli, ['setup'].concat(err));
  }

  futoncli.started = true;

  callback();
};

futoncli.showError = function (command, err, shallow, skip) {
  var stack;

  futoncli.log.error('Error running command ' + command.magenta);

  if (err.message) {
    futoncli.log.error(err.message);
  }

  futoncli.inspect.putObject(err, {
    password: function (line) {
      var password = line.match(/password.*\:\s(.*)$/)[1];
      return line.replace(password, "'********'");
    }
  }, 2);

  futoncli.log.info('futon '.grey + 'not ok'.red.bold);
};