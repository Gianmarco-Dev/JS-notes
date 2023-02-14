// Find Unique Elements
// Write a function that will take an array of numbers and return a new array that only contains unique numbers.

function unique(array) {
  const newArray = [];

  for (i = 0; i < array.length; i++) {
    if (newArray.indexOf(array[i]) === -1) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

export default unique;
