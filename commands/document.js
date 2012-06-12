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
    fs.readFile(path.join(__dirname, input.file), function (err, body) {
      if(err) {
        return callback(err);
      }
      try {
        body = JSON.parse(body);
        if(name) {
          db.insert(body, helpers.generic_cb(callback));
        } else {
          db.insert(body, name, helpers.generic_cb(callback));
        }
      } catch (err2) {
        return callback(err2);
      }
    });
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