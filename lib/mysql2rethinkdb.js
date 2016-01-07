'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('./helpers');

var _converters = require('./converters');

function logTables(tables) {
  console.log(tables.length + ' mysql tables exist');
  console.log('----------------');
  _lodash2['default'].each(tables, function (table) {
    return console.log(table);
  });
  console.log('----------------\n');
}

function logTableMigrated(dbName, table) {
  console.log('Table migrated: ' + dbName + '.' + table);
}

function logMigrationSuccess() {
  console.log('\n');
  console.log('Migration success!');
}

function mysql2rethinkdb() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var host, port, password, user, database, mysqlOptions, connection, tables;
  return regeneratorRuntime.async(function mysql2rethinkdb$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        host = options.host;
        port = options.port;
        password = options.password;
        user = options.user;
        database = options.database;
        mysqlOptions = _lodash2['default'].omit({
          host: host,
          port: port,
          user: user,
          password: password,
          database: database
        }, _lodash2['default'].isUndefined);
        connection = _mysql2['default'].createConnection(mysqlOptions);

        connection.connect();

        context$1$0.next = 10;
        return regeneratorRuntime.awrap((0, _converters.getMysqlTables)(connection));

      case 10:
        tables = context$1$0.sent;

        logTables(tables);

        context$1$0.next = 14;
        return regeneratorRuntime.awrap(Promise.all(_lodash2['default'].map(tables, function callee$1$0(table) {
          var fileName;
          return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return regeneratorRuntime.awrap((0, _converters.mysql2json)({
                  database: database,
                  table: table
                }));

              case 2:
                fileName = context$2$0.sent;
                context$2$0.next = 5;
                return regeneratorRuntime.awrap((0, _converters.json2rethinkdb)({
                  fileName: fileName,
                  database: database,
                  table: table
                }));

              case 5:
                (0, _helpers.removeFile)(fileName);
                logTableMigrated(database, table);

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })));

      case 14:

        logMigrationSuccess();

        connection.end();

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports['default'] = mysql2rethinkdb;
module.exports = exports['default'];