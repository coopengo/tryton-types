var _ = require('lodash');
var moment = require('moment');
exports.decimal = function (n) {
  return new Number(n);
};
exports.date = function (y, M, D) {
  // nil values are replaced by current
  var r;
  if (_.isString(y)) {
    r = moment(y, M || 'YYYY-MM-DD');
    r.startOf('day');
  }
  else {
    var values = {
      y: y,
      M: M,
      D: D,
      h: 0,
      m: 0,
      s: 0,
      ms: 0
    };
    values = _.pickBy(values, (v) => !_.isNil(v));
    r = moment();
    r.set(values);
  }
  r.isDate = true;
  return r;
};
exports.time = function (h, m, s, ms) {
  // nil values are replaced by current
  var values = {
    y: 0,
    M: 0,
    D: 1,
    h: h,
    m: m,
    s: s,
    ms: ms
  };
  var r = moment();
  r.set(_.pickBy(values, (v) => !_.isNil(v)));
  r.isTime = true;
  return r;
};
exports.datetime = function (y, M, D, h, m, s, ms, utc) {
  // nil values are replaced by current
  var cls = utc ? moment.utc : moment;
  var values = {
    y: y,
    M: M,
    D: D,
    h: h,
    m: m,
    s: s,
    ms: ms
  };
  var r = cls();
  r.set(_.pickBy(values, (v) => !_.isNil(v)));
  r.isDateTime = true;
  return r.local();
};
exports.timedelta = function (y, M, d, h, m, s, ms) {
  var values = {
    y: y,
    M: M,
    d: d,
    h: h,
    m: m,
    s: s,
    ms: ms
  };
  var r = moment.duration(_.pickBy(values, (v) => !_.isNil(v)));
  r.isTimeDelta = true;
  return r;
};
