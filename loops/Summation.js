// We want to write a function summation that will find the sum of all the values from 1 to (and including) n. The value n is passed into our function.
//  initialize some value i to start at 1. The value should reach n but never exceed it.
function summation(n) {
  let sum = 0;

  for (let i = 0; i <= n; i++) {
    sum = sum + i;
  }

  return sum;
}

export default summation;
