require('babel-polyfill');
import chalk from 'chalk';
import mysql from 'mysql';
import _ from 'lodash';
import {
  getMysqlTables,
  getMysqlTableRows,
  saveTableRowsAsJson,
  importRethinkdbFromJson,
  removeFile,
} from './helpers';
import {
} from './converters';

function logMigrationStart() {
  console.log(chalk.cyan.bold('Migration start.'));
}

function logTables(tables) {
  console.log(chalk.yellow(`${ tables.length } mysql tables are selected.`));
}

function logTableMigrated(database, table) {
  console.log(chalk.green(`[Migrated] ${database}.${table}`));
}

function logTableMigrationFail(database, table, error) {
  console.log(chalk.red(`[Error] ${database}.${table}`, error));
}

function logMigrationEnd() {
  console.log(chalk.cyan.bold('Migration end.'));
}

async function mysql2rethinkdb(options = {}) {
  const { host, port, password, user, database, table } = options;
  const mysqlOptions = _.omit({
    host,
    port,
    user,
    password,
    database,
  }, _.isUndefined);

  const connection = mysql.createConnection(mysqlOptions);

  connection.connect();

  logMigrationStart();

  const tables = table ?
    [table] : await getMysqlTables(connection);

  logTables(tables);

  await *_.map(tables, async table => {
    try {
      const rows = await getMysqlTableRows({ connection, table });
      const fileName = saveTableRowsAsJson({ table, rows });
      await importRethinkdbFromJson({
        fileName,
        database,
        table,
      });
      removeFile(fileName);
      logTableMigrated(database, table);
    } catch (e) {
      logTableMigrationFail(database, table, e);
    }
  });

  logMigrationEnd();

  connection.end();
}

export default mysql2rethinkdb;
