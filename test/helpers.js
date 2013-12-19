var path    = require('path')
  , nixt    = require('nixt')
  , util    = require('util')
  , nano    = require('nano')
  , fs      = require('fs')
  , helpers = exports
  ;

var futon_cwd = path.join(__dirname, '..', 'bin');
var config_path = path.join(__dirname, 'fixtures', '.futoncliconf');
var base_config = {
  endpoint: "http://localhost:5984/test",
  endpoints: {
    default: "http://localhost:5984/test"
  },
  userconfig: config_path
};

helpers.setup = function setup() {
  if (!fs.existsSync(config_path) || fs.readFileSync(config_path).length === 0) {
    fs.writeFileSync(config_path, JSON.stringify(base_config));
  }

  //
  // TODO: Mock this
  //
  nano("http://localhost:5984").db.create("test", function (err) {
    if (err) {
      if (err.status_code != 412 && err.status_code != 200) {
        console.log("We need a CouchDB server running on localhost to run the tests");
        process.exit(-1);
      }
    }
  });
};

helpers.run = function run(cmd) {
  var command = util.format("./%s -q %s", cmd, config_path);
  return nixt({ colors: false })
         .cwd(futon_cwd)
         .run(command);
};

helpers.get_config = function () {
  var config = {};
  try {
    config = JSON.parse(fs.readFileSync(config_path, 'utf-8'));
  } catch (e) {
  }
  return config;
};

helpers.futon_ok = function futon_ok(assert, response) {
  assert.equal(response.err, null);
  assert.equal(response.code, 0);
};

helpers.futon_not_ok = function futon_not_ok(assert, response) {
  assert.ok(response.err);
  assert.notEqual(response.code, 0);
};
