
## Array.prototype.filter
------------

Se vogliamo prendere un array di elementi e sceglierne alcuni in base a una condizione, possiamo usare `Array.prototype.filter`.

![Filtrare i quadrati](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_391/v1581552790/Curriculum/Array%20Manipulation/Array%20Filter/Intro/filter-intro.png)

 Stiamo filtrando solo i quadrati blu. Accettiamo solo i quadrati in cui questa condizione è vera.

Facciamo qualche esercizio di codice su `filtro`. 


--- 


## Filtrare un array
---------------

Quando si filtrano gli array, si vuole trovare una condizione booleana (`true` / `false`) che determini se mantenere o meno l'elemento.

Consideriamo il caso in cui vogliamo mantenere solo gli elementi il cui valore è `1`.

```
const ones = [1,2,3,1,1].filter((function(element) {
    return (element === 1);
}));

```

Qui restituiamo gli elementi che sono uguali a `1`. L'array `ones` risultante sarà `[1,1,1]`.

ESERCIZIO: filtrare meno di 5
------------------------------

Data una matrice di elementi, trovare gli elementi il cui valore è inferiore a 5. Restituire l'array risultante.



```

function lessThanFive(array) {
    return array.filter(function(element){
        return element < 5;
    })
}

```

![Meno di 5](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_380/v1581553647/Curriculum/Array%20Manipulation/Array%20Filter/Stage%201/filter-stage-1.png)


ESERCIZIO: solo il vero
--------------------

Possiamo applicare la stessa logica di filtraggio ai booleani.

Dato un array di booleani, mantenere solo i valori `true`:



```

function onlyTrue(array) {
    return array.filter(function(el){
        return el;
    })
}
```

![Solo vero](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_367/v1581554426/Curriculum/Array%20Manipulation/Array%20Filter/Stage%202/filter-stage-2.png)

Questa funzione accetta un `array` come argomento e restituisce un nuovo `array` contenente solo gli elementi `el` che valutano `true` nella callback function fornita alla funzione `filter`.

In particolare, la funzione `filter` viene utilizzata per iterare su ogni elemento dell'array `array`. La callback function fornita come argomento accetta un argomento `el`, l'elemento attuale dell'array.

Il codice restituisce l'elemento `el` solo se valuta a `true` in un contesto booleano. Ciò significa che qualsiasi valore che valuti a `true` (ad esempio un valore non nullo, un valore numerico diverso da 0, una stringa non vuota, un valore booleano true) viene incluso nell'array risultante, mentre i valori che valutano a `false` (ad esempio un valore nullo, un valore numerico uguale a 0, una stringa vuota, un valore booleano false) vengono esclusi dall'array risultante.



---


## Filtrare le stringhe
-----------------

Possiamo misurare la dimensione di una stringa utilizzando il metodo stringa `length`:

```
const size = "abc".length;

console.log(size); // 3

```

ESERCIZIO: mantenere le stringhe corte
------------------------------

Dato un array di stringhe, mantenere solo le stringhe la cui `length` è al massimo **3**.

Un esempio:

```
function shortStrings(array) {
    return array.filter(function(el){
        if(el.length <= 3) {
            return el;
        }
    })
}

```

---


## Filtrare gli oggetti
-----------------

Possiamo filtrare gli oggetti, proprio come facciamo con i numeri, i booleani e le stringhe.

Supponiamo di avere un elenco di squadre di calcio:

```
const teams = [
    { nome: 'Milan', wins: 86 },
    { nome: 'Inter', wins: 97 },
    { nome: 'Juventus', wins: 106 }
];

```

Se volessimo prendere il numero di squadre con meno di `100` vittorie, potremmo farlo con `filter`:

```
const lessThan100 = teams.filter(function(team) {
    return team.wins < 100;
});

```

> Ora `lessThan100` includerà gli oggetti sia del Milan che dell'Inter. 


ESERCIZIO: filtrare i migliori studenti
-----------------------------------

Trovare gli studenti il cui punteggio è **almeno** 90.
Array di esempio: 

```
const students = [
    { name: 'David', grade: 90 },
    { name: 'Daisy', grade: 100 },
    { name: 'Darcie', grade: 80 }
];

```
CODICE: 

```
function topStudents(array) {
    const topStudents = array.filter(function(student){
        return student.grade >= 90;
    })

    return topStudents;
}

```

## Filtrare per indice
------------------

Quando si fornisce una funzione per filtrare, il primo parametro è l'elemento e il secondo parametro è la **posizione** di quell'elemento (un indice su base zero).

Vediamo un esempio:

```
['a','b','c'].filter(function(el, i) {
    console.log(el, i);
});

```

Il file `console.log` verrà richiamato 3 volte:

- **La prima iterazione** registrerà `a, 0`.
- **La seconda iterazione** registrerà `b`, `1`,
- **La terza iterazione** registrerà `c`, `2`

Come si può vedere, l'indice parte da `0` e viene incrementato di `1` a ogni iterazione.

ESERCIZIO: Selezionare i primi 3
----------------------------

Dato un array di elementi, mantenere solo i primi `3` elementi.

Restituire un array con solo questi tre elementi.


```

function firstThree(array) {
    return array.filter(function(el, i){
        if(i <= 2){
            return el;
        } 
    })   
}

```

---

## Filtrare valori unici
------

Supponiamo di avere delle stringhe e di voler trovare solo quelle uniche:

```
const strings = ['a', 'b', 'a'];

```

I valori unici nell'array `stringhe' sono 'a' e 'b'.

Come possiamo identificare i valori unici nel nostro array `strings`? Consideriamo l'uso del metodo `indexOf`:

```
strings.indexOf('a'); // 0
strings.indexOf('b'); // 1

```

È interessante notare che l'indice di 'a' è `0`. Questo perché `indexOf` restituisce il primo indice dell'elemento nell'array.

> Possiamo approfittarne per trovare i valori unici!

 Obiettivo: trovare i valori unici
----------------------------------

Dato un `array` di valori, restituire un array di valori unici.

> Tenete a mente quanto appreso nella fase precedente sull'indice passato alla funzione filtro. Esso continuerà ad aumentare, mentre `indexOf` restituirà sempre il primo indice del valore.

CODICE: 

```
function unique(array) {

    return array.filter(function(el, i){
        return array.indexOf(el) === i;
    })
    
}

```
In questa funzione, la callback function fornita alla funzione `filter` accetta due argomenti: l'elemento corrente `el` e l'indice corrente `i` dell'elemento nell'array.

Dentro la callback function, stiamo utilizzando il metodo `indexOf` per trovare il primo indice dell'elemento `el` nell'array. Se questo indice corrisponde all'indice corrente `i`, allora stiamo restituendo true dalla callback function, il che significa che l'elemento `el` è unico e deve essere incluso nell'array risultante. Se l'indice restituito da `indexOf` non corrisponde all'indice corrente `i`, stiamo restituendo `false`, il che significa che l'elemento `el` non è unico e non verrà incluso nell'array risultante.

