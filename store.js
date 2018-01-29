#!/usr/bin/env node
const StoreManager = require('./store-manager');
const { commands } = require('./constants');

var args = process.argv.slice(2);

const storeManager = new StoreManager();

if (args.length === 1 && args[0] === commands.LIST) {
    storeManager.list();
} else if (args.length === 2 && args[0] === commands.GET) {
    storeManager.get(args[1]);
} else if (args.length === 3 && args[0] === commands.ADD) {
    storeManager.add(args[1], args[2]);
} else if (args.length === 2 && args[0] === commands.REMOVE) {
    storeManager.remove(args[1]);
} else {
    console.log('Error: invalid command!');
}
