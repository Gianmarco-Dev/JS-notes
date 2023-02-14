// Find the Sum of Even Values
// Given an array, find the sum of all even values inside the array and return it.

function sumEven(array) {
  let total = 0;
  for (i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
      total += array[i];
    }
  }
  return total;
}

export default sumEven;
