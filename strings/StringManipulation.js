// First,  find the lower-case x.
// Once you've found the x, split the string in half. The first half will be the string before the x, the second half will be the string after the x.
// Take the longer string and return it.

function splitAtX(string) {
  indexOfX = string.indexOf("x");
  const firstHalf = string.slice(0, indexOfX);
  const secondHalf = string.slice(indexOfX + 1);

  if (firstHalf.length > secondHalf.length) {
    return firstHalf;
  } else {
    return secondHalf;
  }
}

export default splitAtX;
