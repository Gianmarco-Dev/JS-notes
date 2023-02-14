// Remove any element greater than five from our array



function greaterThanFive(array) {
    for(let i = array.length - 1; i >= 0; i--) {
        if(array[i] <= 5) {
            array.splice(i, 1);
        }
    }
}

// We're using the splice function with two arguments.

// The first argument is the starting index where we'd like to start the removal of elements.

// The second argument is the number of elements we'd like to remove beginning at the starting index. In this case we're removing a single element starting at the index of the element we'd like to remove.

// Remove the Occurrences
// Given an array of integers and a number, num, find all the occurrences of the number and remove it from the array.

// Modify the array directly and do not return anything from this function.

function removeOccurrences(array, num) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === num) {
            array.splice(i, 1);
        }
    }
}

export default removeOccurrences;