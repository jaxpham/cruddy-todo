const fs = require('fs'); //fs module provides access and interact with the file system.
const path = require('path');
const sprintf = require('sprintf-js').sprintf; // is a complete open source JavaScript sprintf implementation for the browser

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

//creates ID with 5 0s
const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

//reads the counter of the ID
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  //creates ID
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (cb) => {
  // Use read Counter
  // Add to the counter
  // Use Write Counter
  // Pass the counter to another function
  // return zeroPaddedNumber(counter);
  readCounter((err, counter)=> {
    counter += 1;
    writeCounter(counter, (err, counterString) => {
      cb(err, counterString);
      // console.log('THis is getting runned');
    });
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
