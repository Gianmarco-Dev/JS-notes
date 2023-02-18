// Scrivere una funzione `fizzBuzz` che prenda un array di numeri e sostituisca ogni numero divisibile per tre 
// con la parola "fizz" e ogni numero divisibile per cinque con la parola "buzz". 
// Se un numero è divisibile sia per tre che per cinque, lo sostituisce con "fizzbuzz".
// Una volta sostituiti i numeri appropriati, restituisce una stringa concatenata con le sole parole "fizz" o "buzz".


function fizzBuzz(numbers){
    const result [];

    for (const number of numbers) {
        if (number % 3 === 0 && number % 5 === 0) {
            result.push("fizzbuzz");
        } else if (number % 3 === 0) {
            result.push("fizz");
        } else if (number % 5 === 0) {
            result.push("buzz");
        }
    }
    return result.join("");
    
}