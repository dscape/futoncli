var specify      = require('specify')
  , helpers      = require('../helpers')
  , run          = helpers.run
  , futon_ok     = helpers.futon_ok
  , futon_not_ok = helpers.futon_not_ok
  , get_config   = helpers.get_config
  ;

helpers.setup();

specify("futon design", function (assert) {
  assert.expect(3);

  run("futon design")
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon design list", function (assert) {
  assert.expect(3);

  run("futon design list")
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon design get", function (assert) {
  assert.expect(3);

  run("futon design get")
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon design query", function (assert) {
  assert.expect(3);

  run("futon design query")
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});




specify.run(process.argv.slice(2));
