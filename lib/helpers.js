/* eslint no-param-reassign: 0 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.runShellCommand = runShellCommand;
exports.removeFile = removeFile;

var _bluebird = require('bluebird');

var shell = (0, _bluebird.promisifyAll)(require('shelljs'));

function runShellCommand(cmd) {
  return regeneratorRuntime.async(function runShellCommand$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(shell.execAsync(cmd, { silent: true }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function removeFile(fileName) {
  shell.rm(fileName);
}