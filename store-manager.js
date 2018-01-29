module.exports = (function() {
  var fs = require('fs');
  var constants = require('./constants');

  var store = loadStore();

  function loadStore() {
    var result = {};
    fs.readdirSync(constants.DATA_FOLDER).forEach(function(file) {
      result[file] = String(fs.readFileSync(constants.DATA_FOLDER + file));
    });

    return result;
  }

  function saveData(key, value, onSaved) {
    fs.writeFile(constants.DATA_FOLDER + key, value, function(err) {
      if (err) throw err;
      onSaved();
    });
  }

  function removeData(key, onRemoved) {
    fs.unlink(constants.DATA_FOLDER + key, function(err) {
      if (err) throw err;
      onRemoved();
    });
  }

  function tryDo(func) {
    try {
      func();
    } catch (err) {
      console.log('error occurred:', err.message);
    }
  }

  function list() {
    tryDo(function() {
      for (var property in store) {
        if (store.hasOwnProperty(property)) {
          console.log(property, store[property]);
        }
      }
    });
  }

  function get(key) {
    tryDo(function() {
      if (!store.hasOwnProperty(key)) {
        throw { message: `key '${key}' is not found.` };
      }
      console.log(key, store[key]);
    });
  }

  function add(key, value) {
    tryDo(function() {
      if (store.hasOwnProperty(key)) {
        throw { message: `key '${key}' already exists!` };
      }

      store[key] = value;
      saveData(key, value, () => {
        console.log(`key '${key}' is added!`);
      });
    });
  }

  function remove(key, value) {
    tryDo(function() {
      if (!store.hasOwnProperty(key)) {
        throw { message: `key '${key}' not found.` };
      }
      delete store[key];
      removeData(key, () => {
        console.log(`key '${key}' is removed!`);
      });
    });
  }

  return {
    list: list,
    get: get,
    add: add,
    remove: remove
  };
})();
