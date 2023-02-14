// Write a function isPalindrome that takes a word string and returns true if the word is a palindrome or false if it is not.

// A palindrome is a word that is spelled the same forwards as it is backwards.

function isPalindrome(string) {
    const reversedString = string.split('').reverse().join('');
    return string === reversedString;
  }
  
  export default isPalindrome;


//   This function first splits the input string into an array of characters, then reverses that array, and finally joins the reversed array back into a string. 
//   It then checks whether the original input string is equal to the reversed string, and returns true if they are equal, indicating that the input string is a palindrome, or false otherwise.



