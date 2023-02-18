Logical Operators
-----------------

In JavaScript, there are **logical** operators that will help us *concisely* express complex conditions.

Let's say we wanted to travel to an island by boat **or** by plane. In **English**, we use **or** in the previous sentence to express we're willing to take **either** mode of transportation.

In **JavaScript**, we can use `||`:

```
const boat = true;
const plane = false;

const willTravel = boat || plane;

console.log(willTravel); // true

```
## The OR || Default Operator 
In the example above, one of the conditions is true in the `OR` operation (the `boat`), therefore the value stored in `willTravel` is true!

> The `||` operator is commonly referred to as the **Logical OR** because it will evaluate to `true` if either (or both) of the inputs are `true`.

Additionally we'll see an `AND` operator for requiring **both conditions** to be true. As well, we'll see a `NOT` operator for **negating** a condition.

We will also see how these logical operators behave with non-boolean values and how we can that to our advantage. 

This operator is also sometimes referred to as the default operator, due to its behavior with truthy and falsey values.

Take, for example:

console.log("" || "Something Else"); // Something Else


The empty string "" is a falsey value, so || will take the second value in this operation.

This can be pretty useful with variables! We can use this to create a default message if one is not defined.

For example, if we want to deal with this double operation even when the result is undefined


`` 
We can do something like: 

function double(x) {

    const doubled = x * 2 || 0 ;

    return doubled;

}

module.exports = double;

``

--- 

## AND Operator

Another important logical operator is `&&`, which is called **Logical AND**:

```
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false

```

 Notice that both values must be true for the expression to evaluate to true. We need **this** to be true AND **that** to be true as well.

We can, of course, do the same thing with variables:

```
let a = true;
let b = true;

console.log(a && b); // true

b = false;

console.log(a && b); // false
console.log(b && a); // false

```

--- 

## Not Operator
The final logical operator we will discuss is the `!` operator. Commonly referred to as the **NOT** or **negation** operator.

This operator will flip `true` and `false`:

```
console.log(!true); // false
console.log(!false); // true

```

It will also flip `truthy` and `falsey` values:

```
console.log(!2); // false
console.log(!undefined); // true

```

> If you apply the negation operator to a truthy or falsey value **twice**, you'll wind up with the corresponding boolean value. Since `2` is a truthy value, `!!2` will evaluate to `true`.


--- 

## Coding Problem 

There's a river that runs right between two towns. 
In order for cars to cross the river, we built a bridge! Trouble is, there's only room for 1 car to cross the bridge at a time. 
This means that if both cars were to be crossing at the same time, neither would be able to cross. 
Complete the carCrossing function to return true if and only if one car is crossing.

Code can be found in the NotOperator.js file.
