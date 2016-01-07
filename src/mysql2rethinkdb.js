require('babel-polyfill');
import mysql from 'mysql';
import _ from 'lodash';
import {
  removeFile,
} from './helpers';
import {
  mysql2json,
  json2rethinkdb,
  getMysqlTables,
} from './converters';

function logTables(tables) {
  console.log(`${ tables.length } mysql tables exist`);
  console.log(`----------------`);
  _.each(tables, table => console.log(table));
  console.log(`----------------\n`);
}

function logTableMigrated(dbName, table) {
  console.log(`Table migrated: ${dbName}.${table}`);
}

function logMigrationSuccess() {
  console.log('\n');
  console.log('Migration success!');
}

async function mysql2rethinkdb(options = {}) {
  const { host, port, password, user, database } = options;
  const mysqlOptions = _.omit({
    host,
    port,
    user,
    password,
    database,
  }, _.isUndefined);

  const connection = mysql.createConnection(mysqlOptions);

  connection.connect();

  const tables = await getMysqlTables(connection);

  logTables(tables);

  await Promise.all(
    _.map(tables, async table => {
      const fileName = await mysql2json({
        database,
        table,
      });
      await json2rethinkdb({
        fileName,
        database,
        table,
      });
      removeFile(fileName);
      logTableMigrated(database, table);
    })
  );

  logMigrationSuccess();

  connection.end();
}

export default mysql2rethinkdb;
