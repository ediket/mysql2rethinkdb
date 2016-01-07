'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.mysql2json = mysql2json;
exports.getMysqlTables = getMysqlTables;
exports.json2rethinkdb = json2rethinkdb;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('./helpers');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function mysql2json(_ref) {
  var database = _ref.database;
  var table = _ref.table;
  var fileName, cmd;
  return regeneratorRuntime.async(function mysql2json$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        fileName = _path2['default'].join(_os2['default'].tmpdir(), table + '.json');
        cmd = '\n    mysql2json       --user=root       --database=' + database + '       --execute="select * from ' + table + '" > ' + fileName + '\n  ';
        context$1$0.next = 4;
        return regeneratorRuntime.awrap((0, _helpers.runShellCommand)(cmd));

      case 4:
        return context$1$0.abrupt('return', fileName);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getMysqlTables(connection) {
  return new Promise(function (resolve) {
    connection.query('SHOW TABLES', function (err, rows) {
      var tables = _lodash2['default'].map(rows, function (row) {
        return _lodash2['default'].values(row)[0];
      });
      resolve(tables);
    });
  });
}

function json2rethinkdb(_ref2) {
  var fileName = _ref2.fileName;
  var database = _ref2.database;
  var table = _ref2.table;
  var cmd;
  return regeneratorRuntime.async(function json2rethinkdb$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = '\n    rethinkdb import       -f ' + fileName + '       --table ' + database + '.' + table + '       --force\n  ';
        context$1$0.next = 3;
        return regeneratorRuntime.awrap((0, _helpers.runShellCommand)(cmd));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}