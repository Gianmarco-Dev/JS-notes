Array.map

### La funzione map

---

Uno dei metodi importanti del prototipo Array è `map`. Map consente di prendere ogni elemento di un array e di applicargli una funzione, restituendo il risultato dopo la funzione.

Supponiamo di avere una funzione che aggiunge `+1` a un elemento:

![addOne](https://res.cloudinary.com/divzjiip8/image/upload/v1571287422/Frame_1_11_iy9bce.png)

Una funzione abbastanza semplice. Prendiamo un numero, gli aggiungiamo uno e lo restituiamo. Ingresso 3, uscita 4.

E se volessimo applicare questa funzione a più elementi? Possiamo farlo usando `map`!

![map](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_254/v1581559483/Curriculum/Array%20Manipulation/Array%20Map/Intro/map-intro-1.png)

Ora prendiamo la nostra funzione `addOne` e la mappiamo su ogni elemento. Ogni elemento passerà attraverso la funzione e restituirà l'elemento risultante. Ingresso 3, uscita 4. Ingresso 4, uscita 5 ecc...

O in codice:

```
function plusOne(arr) {
    const newArray = arr.map(function(x) {
        return x + 1;
    })

    return newArray
}

module.exports = plusOne;

```


### Mappare una funzione

Nell'ultima fase, abbiamo creato una funzione anonima da usare nella funzione `map`.

Possiamo fare la stessa cosa con le funzioni che abbiamo definito in precedenza:

```
function addOne(x) {
    return x + 1;
}

const result = [1,2,3].map(addOne);

console.log(result); // [2,3,4]

```

Oltre alle funzioni JavaScript integrate:

```
const absolutes = [-1, 1, -2, 2].map(Math.abs);

console.log(absolutes); // [1,1,2,2]

```

Qui `Math.abs` restituisce il valore assoluto di ogni elemento dell'array.

> Fate attenzione quando passate una funzione a `map`. Passerà argomenti multipli alla vostra funzione, il che potrebbe causare un comportamento inaspettato!

## Argomenti multipli

---

La funzione passata a `map` riceverà in realtà più argomenti.

```
[10, 20].map((el, i, arr) => {
    console.log(el, i, arr);
});

```

Cosa sono `el`, `i` e `arr`? Diamo un'occhiata a ciò che viene registrato nella console!

Questa operazione hitta `console.log` due volte:

- **La prima iterazione** registrerà `10, 0, [10,20]`.
- **La seconda iterazione** registrerà `20, 1, [10,20]`.

Quali sono esattamente questi argomenti?

- Il **primo argomento** `el` è l'elemento che viene passato alla funzione.
- Il **secondo argomento** `i` è l'indice a base zero di quell'elemento nell'array.
- Il **terzo argomento** `arr` è l'array stesso.

Ora, come può questo causare un comportamento inaspettato?

Supponiamo di avere una funzione chiamata `sayHello`:

```
function sayHello(name, greeting) {
    if(greeting === undefined) {
        greeting = "Ciao";
    }
    return `${greeting} ${name}!`;
}

```

Questa funzione ha un parametro `greeting` che sarà predefinito a `Hello` se non è definito. Prende `name` e lo saluta nella console.

Cosa accadrebbe in questo esempio?

```
const result = ['Steve', 'Amanda'].map(sayHello);

```

Ci si potrebbe aspettare che il risultato sia `["Ciao Steve!", "Ciao Amanda!"]`.

Tuttavia, il risultato sarà in realtà `["0 Steve!", "1 Amanda!"]`.

Questo perché l'indice viene passato a `sayHello` come secondo parametro. Se vogliamo usare il saluto predefinito, dobbiamo inviare esplicitamente un solo argomento:

```
const result = ['Steve', 'Amanda'].map(function(name) {
    return sayHello(name);
});

```

Qui il risultato sarà `["Ciao Steve!", "Ciao Amanda!"]` come previsto.

> In caso di dubbio, è meglio creare una funzione anonima e passare esplicitamente gli argomenti alla funzione, piuttosto che dipendere dalla funzione per non utilizzare gli ultimi due argomenti.



Esercizio 1: ottenere la radice quadrata di ogni elemento nell'array.
----------------
Utilizzando la funzione `squareRoot`, mappare ogni elemento dell'array `arr` alla sua radice quadrata. Restituire il nuovo array.

CODICE:

```
function squareRoot(arr) {
    const sqrd = arr.map(Math.sqrt);

    return sqrd;
}

module.exports = squareRoot;

```

ESERCIZIO 2: elevare al quadrato
----------------
Prendere un singolo numero `n` e restituire `n` al quadrato.

```
function squared(n){
    return n*n;
}


```

Chiamiamo questo file squared.js e creiamo un altro file chiamato squaredMap.js

Ora è il momento di creare una funzione che mappi tale funzione su un array.

ESERCIZIO 3: SquaredMap.js
----------------
Dato un array di elementi in `squaredMap`, restituire un array con ogni elemento al quadrato:

```
const squared = require('./squared');

function squaredMap(arr) {
    return arr.map(squared);

}

module.exports = squaredMap;

```

> La funzione `squared` è importata all'inizio del file `squaredMap.js`.

---

## Mappatura sugli oggetti

---

Map non è solo per gli array di numeri. Possiamo usare `map` anche con altri tipi di dati, come gli oggetti.

Supponiamo di avere degli utenti:

```
const users = [
    { name: 'Corey', loggedIn: true },
    { name: 'Anna', loggedIn: false }
];

```

E vogliamo creare un nuovo array di utenti con tutti gli utenti disconnessi:

```
const loggedOutUsers = users.map(function(user) {
    return {
        name: user.name,
        loggedIn: false
    }
});

```

Si otterrà un nuovo array con due nuovi oggetti utente con gli stessi nomi, entrambi con il valore `false` per `loggedIn`.


ESERCIZIO: aggiungere uno score
------------

Dato un array di `giocatori`, aggiungere `10` al loro `score`. Restituire un nuovo array con questi punti aggiuntivi.

Ogni giocatore sarà un oggetto con le due proprietà seguenti:

1.  **id** - un numero che identifica in modo univoco il giocatore.
2.  **score** - un numero che rappresenta i punti del giocatore.

CODICE:

```
function addScore(players) {
    return players.map(x => {
        return { id: x.id, score: x.score + 10 };
    });
}

module.exports = addScore;
```

---


### Indice dell'array e metodo .map
---------------

Quando si usa `map`, si ottiene anche l'accesso alla posizione dell'elemento nella nostra funzione.

```
[10, 20, 30].map(function(element, i) {
    console.log(i);
});

```

In questo modo verranno registrati `0`, `1` e `2`, che sono gli indici rispettivamente di `10`, `20` e `30`.

Un modo per usare l'indice è quando si vuole modificare un elemento in base alla sua posizione.

ESERCIZIO: aggiungere 10 ai primi 3 giocatori
-----------------------------------------

Modifichiamo la nostra funzione `addScore` per aggiungere solo `10` punti ai primi `3` giocatori.

> Fate attenzione a questo punto! L' `indice` passato nella nostra funzione sarà a base zero, il che significa che inizia da `0`. **Inoltre, assicuratevi di restituire sempre qualcosa all'interno della funzione mappata, altrimenti l'elemento sarà indefinito.

```
function addScore(players) {
    return players.map(function(player, i) {
        if(i <= 2) {
            return { id: player.id, score: player.score + 10 };
        } else {
            return player;
        }
      
    });

}

module.exports = addScore;

```