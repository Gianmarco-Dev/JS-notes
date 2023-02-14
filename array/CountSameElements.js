
// Write a function countElements that takes in an array and returns an object with the count of each element in the array.

// Example
// const elements = ["e", "k", "e", "z", "i", "z"];
// countElements(elements); // returns {e: 2, k: 1, z: 2, i: 1}


function countElements(elements) {
    const counts = {};
    for (const element of elements) {
        counts[element] = (counts[element] || 0) + 1;
    }
    return counts;
}

export default countElements;


// The function initializes an empty object called counts. 
// Then, it loops through the elements in the input array, and for each element, it increments the corresponding property in the counts object. 
// If the property doesn't exist yet, it is initialized to 0 before incrementing. 
// Finally, the function returns the counts object with the counts of each element.



