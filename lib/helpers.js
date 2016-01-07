/* eslint no-param-reassign: 0 */
import { promisifyAll } from 'bluebird';

const shell = promisifyAll(require('shelljs'));

export async function runShellCommand(cmd) {
  return await shell.execAsync(cmd, { silent: true });
}

export function removeFile(fileName) {
  shell.rm(fileName);
}
