

## Array Sort

### Ordinamento della matrice
----------

L'ordinamento degli elementi è una parte importante della programmazione. Ad esempio, spesso è necessario trovare i dati più recenti in base alla data. Forse un utente vuole vedere i prossimi eventi più vicini nel suo calendario. 

Gli array JavaScript hanno una funzione di ordinamento che ci permette di passare una specifica **funzione di confronto** per ordinare due elementi.

[Ordinamento](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_463/v1581552269/Curriculum/Array%20Manipulation/Array%20Sort/Intro/sort-intro.png)

In questo esempio, abbiamo una funzione chiamata "Sort Ascending". Questa funzione prende due argomenti e li confronta in modo che possano essere ordinati in modo appropriato nell'array.

Si noti che l'array risultante non è interamente ordinato**, ma solo i primi due elementi sono ordinati l'uno rispetto all'altro. La funzione di ordinamento verrà applicata più volte a diversi elementi dell'array, a seconda dell'algoritmo di ricerca utilizzato da JavaScript. Come sviluppatori, dovremo semplicemente fornire una funzione che confronti due numeri e indichi quale numero debba essere il primo.


Ogni array creato in JavaScript ha accesso al metodo `sort`. Questo metodo accetta una funzione di confronto **opzionale** che determina l'ordine risultante degli elementi.


Comportamento predefinito dell'ordinamento
---------------------

La funzione di confronto è **opzionale**. Quindi, cosa succede se non ne passiamo una a `sort`?

```
const result = [3, 2, 4, 1].sort();

console.log(result); // [1, 2, 3, 4]

```

Senza una funzione di confronto, gli elementi dell'array vengono convertiti in stringhe e confrontati. I valori più bassi vengono spostati all'inizio dell'array.

A questo punto sembra che funzioni abbastanza bene per ordinare i numeri in ordine crescente. **Ma aspettate! Vediamo un altro esempio:

```
const result = [20, 1, 2, 3].sort();

console.log(result); // [1, 2, 20, 3]

```

**Uh-oh**! `20` è venuto prima di `3`. Ordinando numericamente, sappiamo che `3` dovrebbe venire prima. Tuttavia, bisogna ricordare che i numeri vengono **convertiti in stringhe** prima dell'ordinamento. Quando "20" viene confrontato con "3", vengono confrontati i primi caratteri e "2" viene prima di "3". Pertanto, "20" viene ordinato davanti a "3". Molto complicato!

L'ordinamento predefinito è più intuitivo quando gli elementi **sono stringhe**, perché saranno ordinati come tali:

```
const result = ['orange', 'berry', 'apple', 'cherry'].sort();

console.log(result); // ["apple", "berry", "cherry", "orange"]

```

In sintesi, quando si ordinano i numeri, invece di usare la funzionalità predefinita `sort`, si dovrebbe passare la propria funzione di confronto per garantire un ordinamento corretto.

```
[3,2,4,1].sort(function comparison(a,b) {
    if(a < b) {
        // prende prima a
        return -1;
    }
    if(b < a) {
        // prende prima b
        return 1;
    }
    // non è necessaria alcuna modifica
    return 0;
});

```

L'array sarà ordinato `[1,2,3,4]`. In questa funzione di confronto ci sono 3 possibili valori di ritorno:

- `-1` indica che `a` deve essere posto davanti a `b`.
- `1` indica che `b` deve essere posizionato davanti ad `a`.
- `0` indica che non è necessario cambiare l'ordine.

In effetti, la restituzione di **qualsiasi valore negativo** avrà lo stesso effetto della restituzione di `-1`. **Qualsiasi valore positivo** avrà lo stesso effetto di `1`. Ciò significa che possiamo accorciare questa funzione in modo significativo:

```
[3,2,4,1].sort(function comparison(a,b) {
    return a - b;
});

```

Qui, se `a` è minore di `b`, il risultato della sottrazione sarà negativo (posizionando `a` per primo). Se `b` è minore di `a`, il risultato sarà positivo (mettendo `b` per primo).

Algoritmo sort per numeri
----------------------------------

Dato un `array` di numeri, ordina i numeri in modo crescente (1,2,3...) e restituire l'array ordinato.


``` 
function sortUp(array) {
    array.sort(function comparison(a, b) {
        return a - b;
    });
}

module.exports = sortUp;

```


### Ordinamento discendente
------------------

Nell'esempio precedente, abbiamo ordinato il nostro array in modo ascendente:

```
[3,2,4,1].sort(function comparison(a,b) {
    return a - b;
});

```

Un risultato negativo sposta `a` davanti a `b`. Un risultato positivo sposta `b` davanti ad `a`. Lo zero mantiene l'ordine invariato.

L'ordinamento decrescente sarà l'opposto. Vogliamo che un risultato negativo sposti `b` davanti a `a` e un risultato positivo sposti `a` davanti a `b`.

CODICE: 

```

function sortDown(array) {
    array.sort(function comparison(a, b){
        return b - a;
    });
}

module.exports = sortDown;

```


### Confronto tra le stringhe
-----------------

Le stringhe hanno un metodo incorporato per un comodo confronto, chiamato `localeCompare`.

```
'a'.localeCompare('a'); // 0
'a'.localeCompare('b'); // -1
"apple".localeCompare("abcd"); // 1

```

> Il metodo `localeCompare` fornisce anche opzioni per aspetti quali le maiuscole e le minuscole, la sensibilità all'accento e la lingua. Per saperne di più, si veda la [documentazione completa] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare).

`localeCompare` restituisce i valori numerici di cui abbiamo bisogno per ordinare le nostre stringhe. Come mostrato sopra, quando una stringa viene confrontata con una che dovrebbe venire dopo di essa, il risultato è `-1'. Quando viene confrontata con una stringa che dovrebbe precederla, il risultato è `1`.


ESERCIZIO: ordinare le stringhe in modo crescente e in modo decrescente
----------------------------------

**Crescente**

Dato un array di stringhe, ordinarle in ordine crescente (`'a'`, `'b'`, `'c'`...) e restituire l'array ordinato.

```

function sortStringsUp(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

module.exports = sortStringsUp;


```

La funzione `sortStringsUp` prende un array `array` di stringhe e lo ordina in ordine crescente usando il metodo `sort` degli array con una funzione di confronto personalizzata. La funzione di confronto confronta due stringhe `a` e `b` usando il metodo `localeCompare`, che restituisce un numero negativo se `a` deve venire prima di `b`, un numero positivo se `a` deve venire dopo `b` e 0 se sono uguali. Per impostazione predefinita, `localeCompare` ordina le stringhe in ordine crescente, quindi la funzione restituisce l'array ordinato.

**Decrescente**

Stessa cosa ma invertiamo le stringhe su cui chiamare `localeCompare`.

```
function sortStringsDown(array) {
  return array.sort((a, b) => b.localeCompare(a));
}

module.exports = sortStringsDown;

```


---


## Ordinamento per proprietà multiple di oggetti
------------------------------

Quando si tratta di oggetti, possiamo ordinarli in base alle loro proprietà.

Consideriamo alcuni studenti:

```
const studenti = [
    { id: 1, diplomato: true, voto: 86 },
    { id: 2, diplomato: false, voto: 96 },
    { id: 3, diplomato: falso, voto: 78 },
    { id: 4, diplomato: true, voto: 96 },
];

```

Ordiniamo questo elenco in base a due regole con la seguente priorità:

1.  Studenti che si sono laureati
2.  Voti più alti

```
const studenti = [
    { id: 4, diplomato: true, voto: 96 },
    { id: 1, diplomato: true, voto: 86 },
    { id: 2, diplomato: falso, voto: 96 },
    { id: 3, diplomato: falso, voto: 78 },
];

```

 Ora l'elenco mostra gli studenti diplomati in cima e ordina i gruppi in base ai voti più alti.


Studenti a confronto
------------------

Quando scriviamo la nostra funzione di confronto per gli studenti, possiamo suddividerla in tre scenari:

1.  **Il primo studente si è laureato e il secondo no** - Restituiremo `-1`, quindi il primo studente viene ordinato per primo.

2.  **Il secondo studente si è laureato e il primo no** - Restituiamo `1`, quindi il secondo studente viene ordinato per primo.

3.  **Gli studenti hanno lo stesso stato di laurea** - Possiamo prendere il voto del secondo studente e sottrarre quello del primo (proprio come abbiamo fatto quando abbiamo ordinato i numeri in ordine decrescente).


### Esercizio: ordinare gli studenti
-------------------------

Dato un array di studenti, ordinarli prima per `diplomato` e poi per `voto` come nell'esempio precedente.

Per ordinare l'array degli studenti prima per lo stato di laurea e poi per il voto, possiamo utilizzare il metodo Array.prototype.sort(). Possiamo confrontare la proprietà graduated di ogni oggetto e ordinare di conseguenza. Se due oggetti hanno lo stesso stato di laurea, possiamo confrontare la loro proprietà grade per determinare l'ordine.


```

function sortStudents(students) {
  // Ordina per stato di laurea in ordine decrescente (prima i laureati)
  // Se entrambi gli oggetti hanno lo stesso stato di laurea, ordina per voto in ordine decrescente
  students.sort((a, b) => {
    if (a.graduated === b.graduated) {
      return b.grade - a.grade;
    }
    return b.graduated - a.graduated;
  });
  return students;
}

module.exports = sortStudents;

```

---

## Ordinamento per mese
----------------

È già disponibile un elenco di `MESI`. Questi mesi sono ordinati dall'inizio dell'anno (GEN) alla fine dell'anno (DIC). 

Ciò che occorre fare è ordinare un array di eventi in base al mese in cui si verificano. Supponiamo di avere i seguenti eventi:

```
[{evento: 'ballo', mese: 'MAR' },
 {evento: 'mercato agricolo', mese: 'JUN' },
 {evento: 'parata', mese: 'JAN' }]

```

La parata è il primo evento dell'anno, che inizia a gennaio. Seguono il ballo a marzo e il mercato contadino a giugno.

È necessario che l'ordine di questi eventi diventi:

```
[{evento: 'parata', mese: 'JAN' },
{evento: 'ballo', mese: 'MAR' },
{ evento: 'mercato agricolo', mese: 'JUN' }]

```

 Ora tutto è nell'ordine corretto!



> Per trovare quale evento viene prima, è necessario vedere quale sia il suo posto nell'array `MONTHS`. Si può usare il metodo array indexOf per trovare il suo posto.


### Array.prototype.indexOf
-----------------------

Nel prototipo Array è presente il metodo `indexOf`.

Questo metodo restituisce un numero maggiore o uguale a zero, che indica l'indice dell'elemento, oppure un valore negativo di 1, che indica che non è stato possibile trovarlo.

Vediamo alcuni esempi:

```
const MESI = ['GEN', 'FEB', 'MAR'];

console.log( MONTHS.indexOf('JAN') ); // 0
console.log( MONTHS.indexOf('MAR') ); // 2

console.log(MONTHS.indexOf('go bankless')); // -1

```

Come si può vedere, sono stati trovati sia `"JAN"` che `"MAR"` e sono stati restituiti i rispettivi indici. La stringa `"go  bankless" non è stata trovata e quindi è stato restituito `-1`.

Vale la pena notare che `indexOf` è sensibile alle maiuscole e alle minuscole!

```
const frutta = ['mele', 'arance'];

console.log( fruit.indexOf('Mele') ); // -1

```

### Esercizio: ordinare gli eventi
---------------------------

Dato un array di eventi, ordinarli in base al mese in cui si verificano e restituire l'array ordinato.

Ogni oggetto dell'array `eventi` avrà le proprietà `evento` e `mese`, proprio come nell'esempio mostrato sopra.

CODICE:

```

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

function sortByMonth(events) {
  // Ordina gli eventi in base al mese in cui si verificano
  events.sort((a, b) => {
    const indexA = MONTHS.indexOf(a.month);
    const indexB = MONTHS.indexOf(b.month);
    return indexA - indexB;
  });
  return events;
}

module.exports = sortByMonth;


```