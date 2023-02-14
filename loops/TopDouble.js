// complete the top double function to find the largest double for the value that is below the top.
// You might double the value before realizing it is larger than top. You'll need to go back and return the value before that value that exceeds the top.

function topDouble(value, top) {
  let temp = 1;

  for (i = 2; value < top; i++) {
    if (value < top) {
      temp = value * 2;
      value = temp;
    }

    if (value > top) {
      value = value / 2;
      return value;
    }
  }

  return value;
}

export default topDouble;
