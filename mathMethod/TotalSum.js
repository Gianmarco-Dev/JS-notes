// The function maxSum takes a number argument num.
// Find the sum all of numbers, starting from 1, up to and including num.
// Add a check to see if the input num is negative, and return 0 if it is.

function maxSum(num) {
  if (num <= 0) {
    return 0;
  }

  let sum = (num * (num + 1)) / 2;

  return sum;
}

export default maxSum;
