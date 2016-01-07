import _ from 'lodash';
import {
  runShellCommand,
} from './helpers';
import os from 'os';
import path from 'path';
import { promisifyAll } from 'bluebird';
const fs = promisifyAll(require('fs'));


export async function mysql2json({ connection, table }) {
  connection = promisifyAll(connection);
  const fileName = path.join(os.tmpdir(), `${table}.json`);

  const rows = await connection.queryAsync(`SELECT * FROM ${table}`);
  await fs.writeFileAsync(fileName, JSON.stringify(rows));
  return fileName;
}

export async function getMysqlTables(connection) {
  connection = promisifyAll(connection);
  const rows = await connection.queryAsync(`SHOW TABLES`);
  const tables = _.map(rows, row => _.values(row)[0]);
  return tables;
}

export async function json2rethinkdb({ fileName, database, table }) {
  const cmd = `
    rethinkdb import \
      -f ${fileName} \
      --table ${database}.${table} \
      --force
  `;
  await runShellCommand(cmd);
}
