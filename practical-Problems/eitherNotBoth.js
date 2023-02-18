// Scrivere una funzione `eitherNotBoth` che prenda un numero e restituisca `true` se il numero è divisibile per 3 o 5, ma non per entrambi.
// In caso contrario, restituisce `falso'.

function eitherNotBoth(num) {
  if (num % 3 == 0 && num % 5 == 0) {
    return false;
  } else if (num % 3 == 0) {
    return true;
  } else if (num % 5 == 0) {
    return true;
  }
}



// VERSIONE OTTIMIZZATA

function eitherNotBoth(num) {
    const isDivisibleBy3 = num % 3 === 0;
    const isDivisibleBy5 = num % 5 === 0;
    return isDivisibleBy3 !== isDivisibleBy5;
}


// L'ottimizzazione principale che ho apportato è stata quella di evitare di ripetere 
// il calcolo dei resti della divisione per 3 e 5. 
// Invece, ho salvato il risultato di questi calcoli in due costanti booleane e 
// ho usato questi valori per determinare se il numero è divisibile per 3, per 5, entrambi o nessuno dei due.

// Inoltre, ho semplificato la logica del codice utilizzando l'operatore !== per confrontare le due 
// costanti booleane invece di usare molteplici istruzioni if/else. Ciò ha reso il codice più leggibile e conciso.


