// You can determine which of two strings is shorter by comparing their lengths. 
// Here's an example implementation of shortestString:

function shortestString(str1, str2) {
    if (str1.length < str2.length) {
      return str1;
    } else {
      return str2;
    }
  }
  
  export default shortestString;
  

//   This function uses an if statement to compare the lengths of str1 and str2. 
//   If str1 is shorter, it is returned; otherwise, str2 is returned. 
//   The function can be used to determine the shorter of any two strings passed as arguments.



