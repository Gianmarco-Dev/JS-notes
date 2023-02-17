// We need a function that can determine if the diver can breathe. The function `canBreathe` will be passed three boolean values:

// 1.  `isConnected` - Is `true` if the diver connected to the tank
// 2.  `hasOxygen` - Is `true` if the tank has oxygen
// 3.  `aboveWater` - Is `true` if the diver is still above water

// If the diver is still `aboveWater`, they can breathe regardless of the tank connection and oxygen:

// ```
// canBreathe(false, false, true); // true
// canBreathe(true, false, true); // true
// canBreathe(true, true, true); // true

// ```

// If they are not `aboveWater`, they need to be connected to the tank **and** the tank needs oxygen in order to breathe:

// ```
// canBreathe(true, false, false); // false
// canBreathe(true, true, false); // true

// ``` 
// We first evaluate aboveWater and then we evaluate the rest of the expression

// We should have the following result 
// canBreathe(false, false, true); // true
// canBreathe(true, false, true); // true
// canBreathe(true, true, true); // true

// 
function canBreathe(isConnected, hasOxygen, aboveWater) {
    return aboveWater || (isConnected && hasOxygen);
}

export default canBreathe;

