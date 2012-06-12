var helpers = exports;

helpers.parse_args = function (args, require_cb) {
  var callback;
  var params = {};

  if(require_cb) {
    callback = args.pop();
    if(typeof callback !== "function") {
      var err = new Error("Invalid callback function: " + callback);
      return [err];
    }
  }

  for(var k in args) {
    var current = args[k];
    var kv;
    if(typeof current === "string" && (kv = current.split("=")) && kv[1]) {
      params[kv[0]] = kv[1];
    }
  }

  return [null, params, callback];
};