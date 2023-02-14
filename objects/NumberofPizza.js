// Accumulate the Pizza Orders
// Given an array of pizza orders, return the total number of pizzas ordered.

// To calculate the total number of pizzas ordered, we can use the reduce() method on the array of orders.

import { PIZZA } from './OrderTypes';

function numberOfPizzas(orders) {
    let totalPizzas = 0;

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (order.type === PIZZA) {
            totalPizzas += order.pizzas;
        }
    }

    return totalPizzas;
}

export default numberOfPizzas;


//   This function takes an array of pizza orders as its argument, and returns the total number of pizzas ordered.
//    We use the reduce() method to iterate over the array of orders, and for each order, we add the value of the pizzas key to an accumulator variable.
//    We start the accumulator at 0, so the first iteration will add the value of the pizzas key of the first order to 0.
//    Subsequent iterations will add the value of the pizzas key of each subsequent order to the accumulator. Finally, we return the total number of pizzas ordered.
