// To solve this problem, we need to implement an exclusive OR (XOR) operation that returns true 
// only when one and only one of the inputs is true.

// One way to implement an XOR in JavaScript is to use the inequality operator (!=). 
// The XOR of two boolean values A and B can be defined as (A != B).

// Using this definition, we can implement the carCrossing function as follows:

function carCrossing(aCrossing, bCrossing) {
return (aCrossing != bCrossing);
}

export default carCrossing;

// This code checks if the values of aCrossing and bCrossing are different using the inequality operator. 
// If they are different, the function returns true, indicating that only one car is crossing the bridge. 
// Otherwise, it returns false, indicating that either both cars are crossing or neither car is crossing.

// Note that this implementation assumes that aCrossing and bCrossing are boolean values 
// that represent whether the corresponding cars are crossing the bridge or not. 
// If aCrossing or bCrossing are not boolean values, they will be automatically 
// coerced to boolean values using JavaScript's type coercion rules.



