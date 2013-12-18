var specify      = require('specify')
  , helpers      = require('../helpers')
  , run          = helpers.run
  , futon_ok     = helpers.futon_ok
  , futon_not_ok = helpers.futon_not_ok
  , get_config   = helpers.get_config
  , rev
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

specify("futon document insert tdoc --file test/fixtures/test_doc.json", function (assert) {
  assert.expect(3);

  run("futon document insert tdoc --file ../test/fixtures/test_doc.json")
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
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

specify("futon document get tdoc", function (assert) {
  assert.expect(3);

  run("futon document get tdoc")
  .expect(function (response) {
    futon_ok(assert, response);
    rev = response.stdout.match("_rev: \\'(.*)\\'")[1];
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

specify("futon document destroy tdoc", function (assert) {
  assert.expect(3);
  run("futon document destroy tdoc " + rev)
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify.run(process.argv.slice(2));
