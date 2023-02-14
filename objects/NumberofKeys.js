// Find the Number of Keys
// Given an object, find the number of keys inside the object. Return this number.

function numberOfKeys(object) {
    if (typeof object !== 'object' || object === null) {
      throw new Error('Argument is not an object');
    }
    return Object.keys(object).length;
  }
  
  module.exports = numberOfKeys;
  


// The Object.keys method returns an array containing the names of all the keys in the object. 
// We can use the length property of this array to get the number of keys.

// Note that this function assumes that the argument passed in is an object. 
// If you want to make this function more robust, you could add a check to make sure that the argument is actually an object before trying to count its keys.



