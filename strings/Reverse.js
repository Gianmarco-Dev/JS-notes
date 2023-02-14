// Write a function reverse that takes a string as an argument and returns a string with all the letters reversed.

// For example, reverse("cat") would return the string "tac".

function reverse(string) {
    return string.split('').reverse().join('');
  }
  
  export default reverse;