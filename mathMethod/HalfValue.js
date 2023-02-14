// The function halfValue takes an array of numbers. 
// It should return a new array with all the original values halved.

// Odd numbers should be rounded up to the nearest whole number.

function halfValue(numbers) {
    const result = [];
  
    for (let i = 0; i < numbers.length; i++) {
      result.push(Math.ceil(numbers[i] / 2));
    }
  
    return result;
  }
  
  export default halfValue;
  
//   This code loops through each number in the input array, divides it by 2, and rounds it up to the nearest whole number using Math.ceil(). 
//   The resulting value is then added to a new array, which is returned at the end of the function.



