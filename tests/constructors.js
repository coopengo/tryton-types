var moment = require('moment');
var types = require('..');
var t = require('tap');

function check(dt, tag, values) {
  t.isa(dt, moment);
  t.equal(dt[tag], true);
  t.equal(dt.year(), values[0] || 0);
  t.equal(dt.month(), values[1] || 0);
  t.equal(dt.date(), values[2] || 1);
  t.equal(dt.hour(), values[3] || 0);
  t.equal(dt.minute(), values[4] || 0);
  t.equal(dt.second(), values[5] || 0);
  t.equal(dt.millisecond(), values[6] || 0);
}

function testDate() {
  var d = types.date(2010, 0, 1);
  check(d, 'isDate', [2010, 0, 1]);
  t.equal(d.format('YYYY-MM-DD'), '2010-01-01');
  check(types.date(null, 0, 1), 'isDate', [moment()
    .year(), 0, 1
  ]);
}

function testTime() {
  check(types.time(9, 30, 50, 373), 'isTime', [null, null, null, 9, 30,
    50, 373
  ]);
  check(types.time(null, 30, 50, 373), 'isTime', [null, null, null,
    moment()
    .hour(), 30,
    50, 373
  ]);
}

function testDateTime() {
  check(types.datetime(2016, 4, 23, 17, 51, 56, 999), 'isDateTime', [2016,
    4, 23, 17, 51, 56, 999
  ]);
  var dt = types.datetime();
  var now = moment();
  var diff = now.valueOf() - dt.valueOf();
  t.ok(diff >= 0);
  t.ok(diff < 10);
}

function testTimeDelta() {
  var now = moment();
  var d1 = types.timedelta(1);
  t.equal(d1.isTimeDelta, true);
  var ny = now.year();
  now.add(d1);
  t.equal((now.year() - ny), 1);
  var d2 = types.timedelta(null, null, 1);
  t.equal(d2.isTimeDelta, true);
  var nd = now.dayOfYear();
  now.add(d2);
  t.equal((now.dayOfYear() - nd), 1); // tesk KO on 12/31? => no issue
}
testDate();
testTime();
testDateTime();
testTimeDelta();
