var futoncli = require('../futoncli');
var helpers = require('../helpers');

var design = exports;

design.list = function () {
  var args = helpers.parse_args([].slice.call(arguments,0), true);
  var db = futoncli.db;
  var err = args[0];
  var params = args[1];
  var callback = args[2];

  if(err) {
    return callback(err);
  }

  params.startkey = "_design/";
  params.endkey = "_design0";

  db.list(params, helpers.generic_cb(callback));
};

design.get = function (name) {
  var err;

  if(typeof name === "function") {
    err = new Error("You didn't provide a design document name.");
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

  name = "_design/" + name;

  db.get(name, params, helpers.generic_cb(callback));
};

design.query = function (design, view) {
  var err;

  if(typeof design === "function") {
    err = new Error("You didn't provide a design document name.");
    return design(err);
  }

  if(typeof view === "function") {
    err = new Error("You didn't provide a view name.");
    return view(err);
  }

  var args = helpers.parse_args([].slice.call(arguments, 0), true);
  var db = futoncli.db;
  var params = args[1];
  var callback = args[2];

  err = args[0];

  if(err) {
    return callback(err);
  }

  db.view(design, view, params, helpers.generic_cb(callback));
};

design.usage = [
  '',
  '`futon config *` commands allow you to edit your',
  'local futon configuration file. Valid commands are:',
  '',
  'futon design list <arg1=val1> <arg2=val2> ...',
  'futon design get <ddoc> <arg1=val1> <arg2=val2> ...',
  'futon design query <ddoc> <view> <arg1=val1> <arg2=val2> ...'
];