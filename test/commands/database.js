var specify      = require('specify')
  , helpers      = require('../helpers')
  , run          = helpers.run
  , futon_ok     = helpers.futon_ok
  , futon_not_ok = helpers.futon_not_ok
  , get_config   = helpers.get_config
  ;

helpers.setup();

specify("futon database", function (assert) {
  assert.expect(3);

  run("futon database")
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon database list", function (assert) {
  assert.expect(4);

  run("futon database list")
  .expect(function (response) {
    futon_ok(assert, response);
    assert.ok(response.stdout.match(/test/));
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon database get", function (assert) {
  assert.expect(5);

  run("futon database get")
  .expect(function (response) {
    futon_ok(assert, response);
    assert.ok(response.stdout.match(/couchdb/));
    assert.ok(response.stdout.match(/Welcome/));
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon database get test", function (assert) {
  assert.expect(6);

  run("futon database get test")
  .expect(function (response) {
    futon_ok(assert, response);
    assert.ok(response.stdout.match(/db_name/));
    assert.ok(response.stdout.match(/test/));
    assert.ok(response.stdout.match(/doc_count/));
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon database create", function (assert) {
  assert.expect(3);

  run("futon database create")
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon database create todelete", function (assert) {
  assert.expect(5);

  run("futon database create todelete")
  .expect(function (response) {
    futon_ok(assert, response);
    assert.ok(response.stdout.match(/ok/));
    assert.ok(response.stdout.match(/true/));
  })
  .end(function () {
    assert.ok(true);
  });

});

specify("futon database destroy todelete", function (assert) {
  assert.expect(5);

  run("futon database destroy todelete")
  .expect(function (response) {
    futon_ok(assert, response);
    assert.ok(response.stdout.match(/ok/));
    assert.ok(response.stdout.match(/true/));
  })
  .end(function () {
    assert.ok(true);
  });

});

specify.run(process.argv.slice(2));
