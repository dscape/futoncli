var specify      = require('specify')
  , helpers      = require('../helpers')
  , run          = helpers.run
  , futon_ok     = helpers.futon_ok
  , futon_not_ok = helpers.futon_not_ok
  , get_config   = helpers.get_config
  ;

helpers.setup();

specify('futon config', function (assert) {
  assert.expect(3);

  run('futon config')
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon config list', function (assert) {
  assert.expect(3);

  run('futon config list')
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon config set', function (assert) {
  assert.expect(3);

  // Should fail with no <key> <val>
  run('futon config set')
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon config set mykey', function (assert) {
  assert.expect(3);

  // Should fail with no <val>
  run('futon config set mykey')
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon config set mykey myvalue', function (assert) {
  assert.expect(5);

  // Should succeed with <key> and <val>
  run('futon config set mykey myvalue')
  .expect(function (response) {
    futon_ok(assert, response);
    var conf = get_config();
    assert.ok(conf['mykey']);
    assert.equal(conf['mykey'], 'myvalue')
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon config get', function (assert) {
  assert.expect(3);

  // Should fail with no <key>
  run('futon config get')
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify('futon config get mykey', function (assert) {
  assert.expect(3);

  // Should return the <key> <value>
  run('futon config get mykey')
  .expect(function (response) {
    futon_ok(assert, response);
    assert.ok(response.stdout.match(/myvalue/));
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon config delete', function (assert) {
  assert.expect(3);

  run('futon config delete')
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify('futon config delete mykey', function (assert) {
  assert.expect(4);

  run('futon config delete mykey')
  .expect(function (response) {
    futon_ok(assert, response);

    var conf = get_config();
    assert.equal(typeof conf['mykey'], 'undefined');
  })
  .end(function () {
    assert.ok(true);
  });

});

specify.run(process.argv.slice(2));
