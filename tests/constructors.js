var moment = require('moment')
var types = require('..')
var t = require('tap')

function testDecimal () {
  var d
  d = types.decimal(23)
  t.ok(types.isDecimal(d))
  t.equal(d.raw(), '23')
  t.equal(d.val(), 23)
  d = types.decimal('0200')
  t.ok(types.isDecimal(d))
  t.equal(d.raw(), '0200')
  t.equal(d.val(), 200)
}

function testBinary () {
  var d = types.binary('D D ')
  t.ok(types.isBinary(d))
  t.equal(d.raw(), 'D D ')
  t.equal(d.val(), 'DD')
}

function testDate () {
  t.equal(types.DATE_FORMAT, 'YYYY-MM-DD')
  var d

  d = types.date()
  var now = moment()
  t.ok(types.isDate(d))
  t.equal(d.year(), now.year())
  t.equal(d.month(), now.month())
  t.equal(d.date(), now.date())

  d = types.date(2010, 0, 1)
  t.ok(types.isDate(d))
  t.equal(types.stringify(d), '2010-01-01')

  d = types.date('2016-12-31')
  t.ok(types.isDate(d))
  t.equal(types.stringify(d), '2016-12-31')
}

function testTime () {
  t.equal(types.TIME_FORMAT, 'HH:mm:ss.SSS')
  var tm

  tm = types.time()
  var now = moment()
  t.ok(types.isTime(tm))
  t.equal(tm.hours(), now.hours())
  t.equal(tm.minutes(), now.minutes())
  t.equal(tm.seconds(), now.seconds())
  var delta = now.milliseconds() - tm.milliseconds()
  t.ok(delta >= 0 && delta < 3)

  tm = types.time(22, 59, 1, 234)
  t.ok(types.isTime(tm))
  t.equal(types.stringify(tm), '22:59:01.234')

  tm = types.time('09:15:00.999')
  t.ok(types.isTime(tm))
  t.equal(types.stringify(tm), '09:15:00.999')
}

function testDateTime () {
  t.equal(types.DATETIME_FORMAT, 'YYYY-MM-DD HH:mm:ss.SSS')
  var dt

  dt = types.datetime()
  var now = moment()
  t.ok(types.isDateTime(dt))
  t.equal(dt.year(), now.year())
  t.equal(dt.month(), now.month())
  t.equal(dt.date(), now.date())
  t.equal(dt.hours(), now.hours())
  t.equal(dt.minutes(), now.minutes())
  t.equal(dt.seconds(), now.seconds())
  var delta = now.milliseconds() - dt.milliseconds()
  t.ok(delta >= 0 && delta < 3)

  dt = types.datetime(2016, 11, 31, 23, 59, 59, 999)
  t.ok(types.isDateTime(dt))
  t.equal(types.stringify(dt), '2016-12-31 23:59:59.999')

  dt = types.datetime('2015-06-18 22:23:24.874')
  t.ok(types.isDateTime(dt))
  t.equal(types.stringify(dt), '2015-06-18 22:23:24.874')

  dt = types.datetime(2010, 0, 1, 0, 0, 0, 0, true)
  t.ok(types.isDateTime(dt))
  t.equal(dt.hours(), 1)

  dt = types.datetime(2010, 6, 1, 0, 0, 0, 0, true)
  t.ok(types.isDateTime(dt))
  t.equal(dt.hours(), 2)
}

function testTimeDelta () {
  var td

  td = types.timedelta(1, 2, 3, 4, 5, 6, 7)
  t.ok(types.isTimeDelta(td))
  var str = types.stringify(td)
  td = types.timedelta(str)
  t.ok(types.isTimeDelta(td))
  t.equal(td.years(), 1)
  t.equal(td.months(), 2)
  t.equal(td.days(), 3)
  t.equal(td.hours(), 4)
  t.equal(td.minutes(), 5)
  t.equal(td.seconds(), 6)
  t.equal(td.milliseconds(), 7)

  td = types.timedelta(1)
  var now = moment()
  var year = now.year()
  now.add(td)
  t.equal(now.year(), year + 1)
}

function testStringify () {
  t.equal(types.stringify(null), null)
  t.equal(types.stringify(''), '')
  t.throws(types.stringify.bind(null, moment()))
  t.throws(types.stringify.bind(null, moment.duration()))
}

function testAddYear () {
  t.equal(types.stringify(types.addYear('2015-02-28', 1)), '2016-02-28')
  t.equal(types.stringify(types.addYear('2015-02-28', 1, true)), '2016-02-29')
}

testDecimal()
testBinary()
testDate()
testTime()
testDateTime()
testTimeDelta()
testStringify()
testAddYear()
