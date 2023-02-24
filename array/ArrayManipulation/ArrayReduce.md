## array.prototype.reduce
------------

Array.prototype.reduce" di JavaScript può essere una funzione difficile da capire! Quando si consulta la documentazione su [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), si vede subito una funzione di riduzione che prende un `accumulatore` e un `valore corrente` e li somma. Più o meno come l'immagine qui sotto:

![Reduce](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,h_300/v1579289176/1_Aj3P2thHmIDU4TFVSWNI8Q_roa8cm.png)

**Quando si dovrebbe usare `reduce`? 

Usate `reduce` quando avete un array di elementi che volete combinare in un singolo valore o oggetto.

![Reduce Abstract](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_240/v1581561037/Curriculum/Array%20Manipulation/Reduce/Intro/reduce-intro.png)

Un ottimo esempio è la somma, come si è visto sopra. Abbiamo diversi numeri che vogliamo combinare (con un'addizione, in questo caso) per ottenere un unico numero.

---

`array.prototype.reduce` ha lo scopo principale di prendere un array e **ridurlo a un singolo valore**.

In un caso semplice, si potrebbe prendere un array di numeri, ad esempio `[1,2,3]`, sommare tutti i numeri e restituire il valore risultante (`6`).

> In un caso più complesso, si potrebbe prendere un array di oggetti e ridurlo a un altro array o oggetto.

Concentriamoci sulla somma di numeri. Nella funzione reduce vengono forniti due argomenti, un **accumulatore** e il **valore corrente**. Nel caso della somma di numeri, l'accumulatore è la somma dopo ogni iterazione. Il valore corrente sarà ogni elemento a turno.

> Il modo migliore per spiegare la funzione reduce è [suddividerla per iterazioni](https://university.alchemy.com/course/js/sc/5d6704b3e5a95ac05652f6f9/stage/5d6706fce5a95ac05652f6fa?tab=details&scroll=Example).


ESERCIZIO
---------------------------------

 La funzione `sum` esegue la somma dell'`accumulator` e il `currentValue`.


```
// numbers is an array full of numbers
// let's add all the numbers and return the sum, i.e. [1,2,3,4,5] => 15

function sum(numbers) {
    return numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue// <-- sum the numbers here!
    });
}

module.exports = sum;

```

---

### Ridurre a una somma
---------------

Dato l'array `[1,2,4]`, riduciamolo alla sua somma `7`:

![Riduci Somma](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_403/v1581560298/Curriculum/Array%20Manipulation/Reduce/Stage%201/reduce-stage-1.png)

 Come mostrato, abbiamo **due iterazioni**:

Prima iterazione
---------------

Nella prima iterazione l'`accumulator` è `1` e il `valore corrente` è `2`.

L'**accumulatore** è il valore "accumulato" o trasportato attraverso l'intera funzione. Quando si restituisce un valore nella funzione `reduce`, questo diventa l'**accumulatore** per l'iterazione successiva.

> Perché `1` è il primo valore dell'accumulatore? Per impostazione predefinita, la funzione `reduce` utilizza il primo valore dell'array come accumulatore se non viene fornito un accumulatore.

Il valore `currentValue` cambierà a ogni iterazione, passando al valore successivo dell'array.

Seconda iterazione
----------------

Dopo aver sommato `1 + 2` e aver restituito il risultato, il valore `3` sarà usato come accumulatore nella seconda iterazione.

Il `valore corrente` sarà il prossimo elemento dell'array, cioè `4`.

Dopo queste due iterazioni, la funzione reduce restituirà il valore finale di `7`.


--------

## Riduzione al valore più grande
-------------

Ora è il momento di trovare il valore più grande in un array.

Per un array `[1,4,2,5]` il valore più grande sarebbe `5`. Vediamo come la riduzione di questo valore verrebbe illustrata:

![Reduce Largest](https://res.cloudinary.com/divzjiip8/image/upload/v1579544696/Frame_30_coe9ok.png)

 Si può notare che vengono eseguite **3** iterazioni. Ogni volta prendiamo il valore più grande e lo restituiamo.

- Prima `4` è maggiore di `1`, quindi restituiamo `4`.
- Poi `4` è maggiore di `2`, quindi restituiamo `4`.
- Infine `5` è maggiore di `4`, quindi restituiamo `5`.

> Se vi state chiedendo della sintassi `(x > y ? x : y)`, il punto interrogativo si chiama [operatore ternario] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator). È una versione abbreviata di `if else` dove se la condizione è `vero` viene preso il primo valore, altrimenti il secondo.


ESERCIZIO: completare la funzione che trova valore più grande
-----------------------------------------------

Determinare quale sia il valore più grande, l'`accumulatore` o il `valore corrente`. Qualunque sia il valore più grande, restituirlo.

Diventerà così l'`accumulatore` per la prossima iterazione.

```
function largest(numbers) {
    return numbers.reduce((accumulator, currentValue) => {
        return (accumulator > currentValue ? accumulator : currentValue); // <-- determine largest value
    }, 1);
}

module.exports = largest;

```

---

## Ridurre un array al più grande intero positivo
----------------

Noterete che il vostro codice non è cambiato rispetto all'ultima fase. 

In questa fase, prendiamo il numero **positivo** più grande. Se non troviamo nessun numero positivo, restituiamo semplicemente `1`. C'è un modo semplice per farlo in `reduce`, chiamato impostazione del **valore iniziale**. Vediamolo in un'illustrazione:

![Più grande positivo](https://res.cloudinary.com/divzjiip8/image/upload/v1579545363/Frame_31_kmet6p.png)

Notiamo come stiamo fornendo un **valore iniziale** alle nostre iterazioni.

Nella funzione reduce il valore iniziale viene inserito come secondo argomento:

```

function largest(numbers) {
    return numbers.reduce((accumulator, currentValue) => {
        return (accumulator > currentValue ? accumulator : currentValue); // <-- determine largest value
    }, 1); // Valore iniziale pari a 1
}

module.exports = largest;

```
---


## Rimozione dei duplicati da un array usando .reduce
-------------------

Abbiamo appena imparato a impostare un *numero* come valore iniziale in `reduce`.

Possiamo fare qualcosa di simile per un oggetto, come un array? Certo che sì.

In questo esercizio rimuoviamo i duplicati da un array.




ESERCIZIO: funzione per rimuovere tutti i duplicati
--------------------------------------------------------


- **Obiettivo**: Rimuovere i duplicati all'interno dell'array **numeri**.
- **numeri**: `[2,3,2]`

Ridurremo i `numeri` di cui sopra fino a ottenere un array che non abbia **duplicati**. Lo faremo in tre iterazioni:

Iterazione 1
-----------

- Accumulatore: `[]`
- Valore corrente: `2`

Partiamo da un array vuoto e vediamo che `2` non è al suo interno. Lo aggiungeremo.

Iterazione 2
-----------

- Accumulatore: `[2]`
- Valore corrente: `3

Passiamo a `3` e vediamo che anch'esso non è all'interno del nostro array `[2]`. Aggiungiamolo.

Iterazione 3
-----------

- Accumulatore: `[2,3]`
- Valore corrente: `2`

Passiamo al nostro `2` finale e vediamo che si trova all'interno del nostro array `[2,3]`. Questa volta non lo aggiungeremo.

Risultato
------

Valore finale: `[2,3]`


CODICE:

```

function removeDuplicates(numbers) {
    return numbers.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue)) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
}


module.exports = removeDuplicates;
```


---


## Raggruppamento e riduzione di oggetti con Reduce
--------------------


Dato un array di frutti in questo formato:

```
[
    { cibo: 'mela', tipo: 'frutta' },
    {cibo: 'arancia', tipo: 'frutta' },
    { alimento: 'carota', tipo: 'verdura' }
]

```

Trasformiamolo in un oggetto con questo formato:

```
{
     frutta: ['arancia', 'mela'],
     verdura: ['carota']
}

```


ESERCIZIO: raggruppare per tipo
-------------------------

Terminare la funzione `group`. Ordinate ogni alimento in base al suo tipo e restituite un oggetto nel formato mostrato sopra.

```

function group(foods) {
  return foods.reduce((accumulator, currentValue) => {
    // Otteniamo il tipo del cibo corrente
    const foodType = currentValue.type;
    // se l'oggetto accumulatore non ha una chiave per questo tipo, ne creiamo una 
    if (!accumulator[foodType]) {
      accumulator[foodType] = [];
    }
    // aggiungiamo il nome corrente del cibo all'array appropriato
    accumulator[foodType].push(currentValue.food);
    // restituiamo l'accumulatore oggetto per la prossima iterazione 
    return accumulator;
  }, {});
}

module.exports = group;

```

---

## Ridurre un array a valori unici
----------


Nella funzione reduce abbiamo accesso anche all'indice dell'elemento in ogni iterazione. Per esempio:

```
['a','b','c'].reduce((a,c,i) => {
    console.log(c,i);
});

```

I log saranno:

1.  `a, 0`
2.  `b, 1`
3.  `c, 2`

Questo esercizio di codice illustra una situazione in cui `index` è davvero utile.

Vogliamo sapere se l'intero array è unico o meno.

Allora, perché `index` è utile?

Pensate a questo:

```
const arr = [1,2,3,1];
console.log(arr.indexOf(1)); // 0

```

L'indice `1` in `arr` è il primo indice in cui si presenta. Ignora completamente l'indice `3`, dove esiste anche `1`.

Se ci troviamo in un'iterazione in cui `arr.indexOf(currentValue) !== index`, **sappiamo che il numero deve esistere da qualche altra parte nell'array**!


---------------------------

Terminare la funzione `allUnique`. Restituisce `true` se tutti gli elementi sono unici e `false` se non lo sono. 

```

function allUnique(numbers) {
    return numbers.reduce((accumulator, currentValue, index) => {
        if (numbers.indexOf(currentValue) !== index) {
            return false;
        } else {
        return accumulator;
    }
    }, true);
}
module.exports = allUnique;

```

Usiamo il metodo `indexOf` per verificare se un elemento appare più di una volta nell'array. Se `arr.indexOf(currentValue) !== index`, significa che l'elemento appare in un'altra posizione precedente dell'array, quindi non è unico. In caso contrario, l'elemento è unico e puoi continuare ad iterare.

