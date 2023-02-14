// Write a function countVowels that takes in a string and counts how many vowels there are in the word. 
// Vowels include: "a", "e", "i", "o", and "u".

// Handle lowercase and uppercase vowels.

function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    
    for (let i = 0; i < str.length; i++) {
      if (vowels.includes(str[i].toLowerCase())) {
        count++;
      }
    }
    
    return count;
  }
  
  export default countVowels;

//   This function creates an array of vowels and initializes a counter to zero. 
//   Then it iterates over each character of the string and checks if it's a vowel (case-insensitive). 
//   If it is, it increments the counter. Finally, it returns the total count of vowels found in the string.



