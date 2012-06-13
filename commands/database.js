var fs = require('fs');
var path = require('path');
var futoncli = require('../futoncli');
var helpers = require('../helpers');

var database = exports;

database.list = function (callback) {
  var server = futoncli.server;

  server.db.list(helpers.generic_cb(callback));
};

database.get = function (name, callback) {
  var server = futoncli.server;

  if(typeof name === "function") {
    return name(new Error("You didn't provide a database name."));
  }

  server.db.get(name, helpers.generic_cb(callback));
};

database.destroy = function (name, callback) {
  var server = futoncli.server;

  if(typeof name === "function") {
    return name(new Error("You didn't provide a database name."));
  }

  server.db.destroy(name, helpers.generic_cb(callback));
};

database.create = function (name, callback) {
  var server = futoncli.server;

  if(typeof name === "function") {
    return name(new Error("You didn't provide a database name."));
  }

  server.db.create(name, helpers.generic_cb(callback));
};

database.usage = [
  '',
  '`futon config *` commands allow you to edit your',
  'local futon configuration file. Valid commands are:',
  '',
  'futon database list',
  'futon database get <dbname>'
];