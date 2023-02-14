// The function countC takes a string str as its only argument.

// This function should return the number of c's found in the string. It must count both lower-case c and upper-case C.

// We can use the match() function with a regular expression to count the occurrences of a character in a string.



function countC(str) {
    const cMatches = str.match(/c/gi);
    return cMatches ? cMatches.length : 0;
  }
  
  export default countC;

  
//   The regular expression /c/gi matches all instances of "c" or "C" in the string, and the match() function returns an array of all matches found. 
//   We can then return the length of that array to get the total count. 
//   The ?: syntax in the return statement is a ternary operator that checks if there were any matches found before returning the length; if there were no matches found, it returns 0.



