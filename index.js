var _ = require('lodash')
var moment = require('moment')

function Decimal (number) {
  this.number = '' + number
}

Decimal.prototype.raw = function () {
  return this.number
}

Decimal.prototype.val = function () {
  return parseFloat(this.number)
}

exports.decimal = function (n) {
  return new Decimal(n)
}

exports.isDecimal = function (n) {
  return n instanceof Decimal
}

function Binary (base64) {
  this.base64 = base64
}

Binary.prototype.raw = function () {
  return this.base64
}

Binary.prototype.val = function () {
  return this.base64.replace(/\s/g, '')
}

exports.binary = function (base64) {
  return new Binary(base64)
}

exports.isBinary = function (b) {
  return b instanceof Binary
}

var DATE_FORMAT = 'YYYY-MM-DD'
exports.DATE_FORMAT = DATE_FORMAT

exports.date = function (y, M, D) {
  // nil values are replaced by current
  var r
  if (_.isString(y)) {
    r = moment(y, DATE_FORMAT)
    r.startOf('day')
  } else {
    var values = {
      y: y,
      M: M,
      D: D,
      h: 0,
      m: 0,
      s: 0,
      ms: 0
    }
    values = _.pickBy(values, (v) => !_.isNil(v))
    r = moment()
    r.set(values)
  }
  r.isDate = true
  return r
}

function isDate (d) {
  return moment.isMoment(d) && d.isDate
}
exports.isDate = isDate

var TIME_FORMAT = 'HH:mm:ss.SSS'
exports.TIME_FORMAT = TIME_FORMAT

exports.time = function (h, m, s, ms) {
  // nil values are replaced by current
  var empty = {
    y: 0,
    M: 0,
    D: 1
  }
  var r
  if (_.isString(h)) {
    r = moment(h, TIME_FORMAT)
    r.set(empty)
  } else {
    var values = _.assign({
      h: h,
      m: m,
      s: s,
      ms: ms
    }, empty)
    r = moment()
    r.set(_.pickBy(values, (v) => !_.isNil(v)))
  }
  r.isTime = true
  return r
}

function isTime (t) {
  return moment.isMoment(t) && t.isTime
}
exports.isTime = isTime

var DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'
exports.DATETIME_FORMAT = DATETIME_FORMAT

exports.datetime = function (y, M, D, h, m, s, ms, utc) {
  // nil values are replaced by current
  var cls = utc ? moment.utc : moment
  var r
  if (_.isString(y)) {
    r = moment(y, DATETIME_FORMAT)
  } else {
    var values = {
      y: y,
      M: M,
      D: D,
      h: h,
      m: m,
      s: s,
      ms: ms
    }
    r = cls()
    r.set(_.pickBy(values, (v) => !_.isNil(v)))
  }
  r.isDateTime = true
  return r.local()
}
function isDateTime (dt) {
  return moment.isMoment(dt) && dt.isDateTime
}

exports.isDateTime = isDateTime

exports.timedelta = function (y, M, d, h, m, s, ms) {
  var r
  if (_.isString(y)) {
    r = moment.duration(y)
  } else {
    var values = {
      y: y,
      M: M,
      d: d,
      h: h,
      m: m,
      s: s,
      ms: ms
    }
    r = moment.duration(_.pickBy(values, (v) => !_.isNil(v)))
  }
  r.isTimeDelta = true
  return r
}

function isTimeDelta (td) {
  return moment.isDuration(td) && td.isTimeDelta
}
exports.isTimeDelta = isTimeDelta

exports.stringify = function (data) {
  if (_.isNil(data) || _.isString(data)) {
    return data
  } else if (isDate(data)) {
    return data.format(DATE_FORMAT)
  } else if (isTime(data)) {
    return data.format(TIME_FORMAT)
  } else if (isDateTime(data)) {
    return data.format(DATETIME_FORMAT)
  } else if (isTimeDelta(data)) {
    return data.toJSON()
  } else {
    throw new Error('unsupported data type')
  }
}
