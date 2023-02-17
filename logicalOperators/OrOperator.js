// The || operator takes two values and returns true if either boolean value is true:

// console.log(true || false); // true
// console.log(false || true); // true
// console.log(true || true); // true
// console.log(false || false); // false

// We willEat if we have pizza, donuts or cookies

// Complete the willEat function

// Not optimized 


// function willEat(hasPizza, hasDonuts, hasCookies) {
//     if (hasPizza || hasDonuts || hasCookies ){
//         return true
//     } 
//     else {
//         return false
//     }
// }

// export default willEat;


// Optimized version

// In this version, we've simplified the if-else statement by using a single return 
// statement that directly returns the boolean expression (hasPizza || hasDonuts || hasCookies). 
// Since this expression already evaluates to true or false, we can directly return it without the need for an if-else block.



function willEat(hasPizza, hasDonuts, hasCookies) {
    return (hasPizza || hasDonuts || hasCookies);
}

export default willEat;