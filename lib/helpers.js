/* eslint no-param-reassign: 0 */
import { promisifyAll } from 'bluebird';
import _ from 'lodash';

const shell = promisifyAll(require('shelljs'));

export async function runShellCommand(cmd) {
  return await shell.execAsync(cmd, { silent: true });
}

export function removeFile(fileName) {
  shell.rm(fileName);
}

export function toUpperCamelCase(string) {
  return _.chain(string)
   .camelCase()
   .capitalize()
   .value();
}
