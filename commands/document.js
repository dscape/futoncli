var fs = require('fs');
var path = require('path');
var futoncli = require('../futoncli');
var helpers = require('../helpers');

var document = exports;

document.list = function () {
  var args = helpers.parse_args([].slice.call(arguments,0), true);
  var db = futoncli.db;
  var err = args[0];
  var params = args[1];
  var callback = args[2];

  if(err) {
    return callback(err);
  }

  db.list(params, helpers.generic_cb(callback));
};

document.view =
document.get = function (name) {
  var err;

  if(typeof name === "function") {
    err = new Error("You didn't provide a document name.");
    return name(err);
  }


  var args = helpers.parse_args([].slice.call(arguments, 0), true);
  var db = futoncli.db;
  var params = args[1];
  var callback = args[2];

  err = args[0];

  if(err) {
    return callback(err);
  }

  db.get(name, params, helpers.generic_cb(callback));
};

document.destroy = function (name, rev, callback) {
  var err;
  var db = futoncli.db;

  if(typeof name === "function") {
    err = new Error("You didn't provide a document name.");
    return name(err);
  }

  if(typeof callback !== "function") {
    err = new Error("You didn't provide a revision.");
    return rev(err);
  }

  db.destroy(name, rev, helpers.generic_cb(callback));
};

document.insert = function (name, callback) {
  if(typeof name === "function") {
    callback = name;
    name = null;
  }

  var db = futoncli.db;

  futoncli.prompt.get("file", function (err, input) {
    if(err) {
      return callback(err);
    }
    fs.readFile(input.file, function (err, body) {
      if(err) {
        return callback(err);
      }
      try {
        body = JSON.parse(body);
        if(name) {
          db.insert(body, name, helpers.generic_cb(callback));
        } else {
          db.insert(body, helpers.generic_cb(callback));
        }
      } catch (err2) {
        return callback(err2);
      }
    });
  });
};

document.update = function () {
  var updates = [].slice.call(arguments,0);
  var name = updates.shift();
  var callback = updates.pop();
  var parsed_updates = {};

  if(typeof name === "function") {
    err = new Error("You didn't provide a document name.");
    return name(err);
  }

  var db = futoncli.db;

  updates.forEach(function (kv) {
    if(kv.indexOf("=") !== -1) {
      kv = kv.split("=");
      var k = kv[0];
      var v = kv[1];
      if(k.indexOf(".") !== -1) {
        futoncli.log.info("Dot notation is not supported: " + k);
        return;
      } else {
        futoncli.log.warn(k.blue + " will be set to " + v.yellow);
        parsed_updates[k] = v;
        return;
      }
    } else {
      futoncli.log.info("Invalid update was ignored: " + kv);
      return;
    }
  });

  futoncli.prompt.get(["yesno"], function (err, stdin) {
    if (err) {
      callback(err);
      return futoncli.showError.apply(
        futoncli, [futoncli.argv._[0]].concat(arguments));
    }
    if(stdin.yesno === "yes") {
      db.get(name, function(err, doc) {
        if(err) {
          return callback(err);
        }
        for (var k in parsed_updates) {
          doc[k] = parsed_updates[k];
        }
        db.insert(doc, name, helpers.generic_cb(callback));
      });
    } else {
      futoncli.log.info("Aborted by your request");
      callback();
    }
  });
};

document.usage = [
  '',
  '`futon config *` commands allow you to edit your',
  'local futon configuration file. Valid commands are:',
  '',
  'futon document list <arg1=val1> <arg2=val2> ...',
  'futon document get <docname> <arg1=val1> <arg2=val2> ...',
  'futon document destroy <docname> <rev>',
  'futon document insert <docname>'
];
