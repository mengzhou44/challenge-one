const fs = require('fs');

const { commands, DATA_FOLDER } = require('./constants');

class StoreManager {
  constructor() {
    this.store = this.loadStore();
  }

  tryDo(func) {
    try {
      func(this);
    } catch (err) {
      console.log('error occurred:', err.message);
    }
  }

  loadStore() {
    let result = {};
    fs.readdirSync(DATA_FOLDER).forEach(function (file) {
      result[file] = String(fs.readFileSync(DATA_FOLDER + file));
    });
    return result;
  }

  saveData(key, value, onSaved) {
    fs.writeFile(DATA_FOLDER + key, value, function (err) {
      if (err) throw err;
      onSaved();
    });
  }

  removeData(key, onRemoved) {
    fs.unlink(DATA_FOLDER + key, function (err) {
      if (err) throw err;
      onRemoved();
    });
  }

  list() {
    this.tryDo((that) => {
      for (var property in that.store) {
        if (that.store.hasOwnProperty(property)) {
          console.log(property, that.store[property]);
        }
      }
    });
  }

  get(key) {
    this.tryDo((that) => {
      if (!that.store.hasOwnProperty(key)) {
        throw { message: `key '${key}' is not found.` };
      }
      console.log(key, that.store[key]);
    });
  }

  add(key, value) {
    this.tryDo((that) => {
      if (that.store.hasOwnProperty(key)) {
        throw { message: `key '${key}' already exists!` };
      }

      that.store[key] = value;
      that.saveData(key, value, () => {
        console.log(`key '${key}' is added!`);
      });
    });
  }

  remove(key, value) {
    this.tryDo((that) => {
      if (!that.store.hasOwnProperty(key)) {
        throw { message: `key '${key}' not found.` };
      }
      delete that.store[key];
      that.removeData(key, () => {
        console.log(`key '${key}' is removed!`);
      });
    });
  }
}

module.exports = StoreManager;
