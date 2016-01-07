import _ from 'lodash';
import {
  runShellCommand,
} from './helpers';
import os from 'os';
import path from 'path';

export async function mysql2json({ database, table }) {
  const fileName = path.join(os.tmpdir(), `${table}.json`);
  const cmd = `
    mysql2json \
      --user=root \
      --database=${database} \
      --execute="select * from ${table}" > ${fileName}
  `;
  await runShellCommand(cmd);
  return fileName;
}

export function getMysqlTables(connection) {
  return new Promise(resolve => {
    connection.query('SHOW TABLES', (err, rows) => {
      const tables = _.map(rows, row => _.values(row)[0]);
      resolve(tables);
    });
  });
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
