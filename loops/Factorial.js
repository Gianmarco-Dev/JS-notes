// Taking in some integer value n, find the factorial for that number and return it.
function factorial(n) {
  let result = 1;

  for (i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

export default factorial;
