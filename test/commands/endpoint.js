var specify      = require('specify')
  , helpers      = require('../helpers')
  , run          = helpers.run
  , futon_ok     = helpers.futon_ok
  , futon_not_ok = helpers.futon_not_ok
  , get_config   = helpers.get_config
  ;

helpers.setup();

specify('futon endpoint', function (assert) {
  assert.expect(3);

  run('futon endpoint')
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon endpoint list', function (assert) {
  assert.expect(3);

  run('futon endpoint list')
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon endpoint add', function (assert) {
  assert.expect(3);

  run('futon endpoint add')
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon endpoint add myendpoint', function (assert) {
  assert.expect(3);

  run('futon endpoint add myendpoint')
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon endpoint add myendpoint http://user:pass@mycouch.com/db', function (assert) {
  assert.expect(6);

  run('futon endpoint add myendpoint http://user:pass@mycouch.com/db')
  .expect(function (response) {
    futon_ok(assert, response);

    var conf = get_config();
    assert.ok(conf['endpoints']);
    assert.ok(conf['endpoints']['myendpoint']);
    assert.equal(conf['endpoints']['myendpoint'], 'http://user:pass@mycouch.com/db');
  })
  .end(function () {
    assert.ok(true);
  });

});



specify('futon endpoint set', function (assert) {
  assert.expect(3);

  run('futon endpoint set')
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });

});


specify('futon endpoint set myendpoint', function (assert) {
  assert.expect(5);

  run('futon endpoint set myendpoint')
  .expect(function (response) {
    futon_ok(assert, response);

    var conf = get_config();

    assert.ok(conf['endpoint']);
    assert.equal(conf['endpoint'], 'http://user:pass@mycouch.com/db');
  })
  .end(function () {
    assert.ok(true);
  });

});

specify('futon endpoint delete', function (assert) {
  assert.expect(3);

  run('futon endpoint delete')
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify('futon endpoint delete myendpoint', function (assert) {
  assert.expect(4);

  run('futon endpoint delete myendpoint')
  .expect(function (response) {
    futon_ok(assert, response);

    var conf = get_config();
    assert.equal(typeof conf['endpoints']['myendpoint'], 'undefined');
  })
  .end(function () {
    assert.ok(true);
  });

});

specify.run(process.argv.slice(2));
