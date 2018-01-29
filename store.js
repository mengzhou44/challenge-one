#!/usr/bin/env node
var storeManager = require('./store-manager');
var constants = require('./constants');

var args = process.argv.slice(2);

if (args.length === 1 && args[0] === constants.COMMAND_LIST) {
  storeManager.list();
} else if (args.length === 2 && args[0] === constants.COMMAND_GET) {
  storeManager.get(args[1]);
} else if (args.length === 3 && args[0] === constants.COMMAND_ADD) {
  storeManager.add(args[1], args[2]);
} else if (args.length === 2 && args[0] === constants.COMMAND_REMOVE) {
  storeManager.remove(args[1]);
} else {
  console.log('Error: invalid command!');
}
