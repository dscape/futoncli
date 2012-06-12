var futoncli = require('../futoncli');
var helpers = require('../helpers');

var design = exports;

function generic_cb(callback) {
  return function (err, body) {
    if(err) {
      console.log(err, callback.toString());
      return callback(err);
    }
    // iterating and showing names would be better
    futoncli.inspect.putObject(body, {
      password: function (line) {
        var password = line.match(/password.*\:\s(.*)$/)[1];
        return line.replace(password, "'********'");
      }
    }, 2);
    callback();
  };
}

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

  db.list(params, generic_cb(callback));
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

  db.get(name, params, generic_cb(callback));
};