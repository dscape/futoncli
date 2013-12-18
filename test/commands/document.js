var specify      = require('specify')
  , helpers      = require('../helpers')
  , run          = helpers.run
  , futon_ok     = helpers.futon_ok
  , futon_not_ok = helpers.futon_not_ok
  , get_config   = helpers.get_config
  ;

helpers.setup();

specify("futon document", function (assert) {
  assert.expect(3);

  run("futon document")
  .expect(function (response) {
    futon_ok(assert, response)
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document list", function (assert) {
  assert.expect(3);

  run("futon document list")
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document insert", function (assert) {
  assert.ok(false, "Not implemented because of prompt");
});

specify("futon document get", function (assert) {
  assert.expect(3);

  run("futon document get")
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document destroy", function (assert) {
  assert.expect(3);

  run("futon document destroy")
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});


specify.run(process.argv.slice(2));
