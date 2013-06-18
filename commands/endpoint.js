var fs = require('fs');
var path = require('path');
var futoncli = require('../futoncli');
var helpers = require('../helpers');
var config = futoncli.config;

var endpoint = exports;

endpoint.list = function () {
  var endpoints = config.get('endpoints') || {};

  futoncli.inspect.putObject(endpoints);

  var args = helpers.parse_args([].slice.call(arguments, 0), true);
  var params = args[1];
  var callback = args[2];

  callback();
};

endpoint.add = function (name, url) {

  if(typeof name === "function") {
    err = new Error("You didn't provide an endpoint name.");
    return name(err);
  }

  if(typeof url === "function") {
    err = new Error("You didn't provide an endpoint url.");
    return url(err);
  }

  var args = helpers.parse_args([].slice.call(arguments, 0), true);
  var params = args[1];
  var callback = args[2];

  config.set('endpoints:' + name, url);
  config.save(function (err) {
    if (err) {
      callback(err);
      return futoncli.showError.apply(
        futoncli, [futoncli.argv._[0]].concat(err));
    }
    callback();
  });
};

endpoint.set = function (name) {
  var err;
  var endpoints = config.get('endpoints') || {};

  if(typeof name === "function") {
    err = new Error("You didn't provide an endpoint name.");
    return name(err);
  }

  var args = helpers.parse_args([].slice.call(arguments, 0), true);
  var params = args[1];
  var callback = args[2];

  if(endpoints[name]) {
    config.set('endpoint', endpoints[name]);
    config.set('endpoints:default', endpoints[name]);
    config.save(function (err) {
      if (err) {
        callback(err);
        return futoncli.showError.apply(
          futoncli, [futoncli.argv._[0]].concat(err));
      }
      callback();
    });
  } else {
    err = new Error('Endpoint name not found');
    return callback(err);
  }
};

endpoint.delete = function (name) {
  var err;

  if(typeof name === "function") {
    err = new Error("You didn't provide an endpoint name.");
    return name(err);
  }

  var args = helpers.parse_args([].slice.call(arguments, 0), true);
  var params = args[1];
  var callback = args[2];

  if(name === 'default') {
    config.clear('endpoint');
  }

  config.clear('endpoints:' + name);
  config.save(function (err) {
    if (err) {
      callback(err);
      return futoncli.showError.apply(
        futoncli, [futoncli.argv._[0]].concat(err));
    }
    callback();
  });
};

endpoint.usage = [
  '',
  '`futon config *` commands allow you to edit your',
  'local futon configuration file. Valid commands are:',
  '',
  'futon endpoint set <name> ...',
  'futon endpoint add <name> <url> ...',
  'futon endpoint delete <name>',
  'futon endpoint list'
];