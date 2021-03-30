const fs = require('fs'); // fs module provides a lot of very useful functionality to access and interact with the file system.
const path = require('path'); //The path module provides utilities for working with file and directory paths. It can be accessed using:
const _ = require('underscore');
const counter = require('./counter');


// Public API - Fix these CRUD functions ///////////////////////////////////////
exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      throw ('error writing id');
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          throw ('error writing file');
        } else {
          callback(null, {id, text});
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });

  // Find the names of the files in the directory (fs.readdir)
  // Read through file names and returns array of file namnes
  // Proceed to map over the array and invoke a callBack on each item in the array
  fs.readdir (exports.dataDir, (err, files) => {
    if (err) {
      throw ('error be tharrrgh');
    } else {
      var data = files.map(text => {
        var id = text.slice(0, -4);
        return {id, text: id};
      });
      callback(null, data);
    }
  });
};

exports.readOne = (id, callback) => {
  //read the file in the directory
  //if error throw an error
  //else,
  // return an object of id and text
  //apply callback to the return statement
  // callback(null, data);
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      // console.log('this is our DATA', fileData);
      var data = {id, text: fileData};
      callback(null, data);
    }
  });
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
