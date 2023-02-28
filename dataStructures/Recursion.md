## Che cos'è la ricorsione 
----------------

Molto semplicemente, **la ricorsione avviene quando una funzione chiama se stessa**.

Da questa semplice definizione ci si potrebbe chiedere: "Se una funzione chiama se stessa, quando si ferma?". Ottima domanda.

```
function go() {
    go();
}

```

 Questa funzione `go` è ricorsiva, ma non sa quando fermarsi. Continuerà a funzionare finché non esaurirà la memoria o finché il motore JavaScript non la terminerà.

Un aspetto importante di un algoritmo ricorsivo è che gli argomenti della funzione cambiano nel tempo fino a raggiungere un certo punto, un **caso base**. Il caso base determina quando è il momento di uscire dalla ricorsione. È molto simile a una **condizione** nei loop.

```
function go(n) {
    if(n === 0) {
        // caso base, uscita dalla ricorsione
        return;
    }
    // cambiamo il nostro argomento
    go(n - 1);
}

// chiamare la funzione
go(5);

```

 La funzione `go` continuerà finché `n` non sarà `0`, quindi interromperà la ricorsione ritornando in anticipo. Si noti che questa funzione in realtà non *completa* nulla, è un semplice esempio per mostrare il meccanismo di base della ricorsione.

Tutto ciò che può essere risolto iterativamente (con un ciclo) può essere risolto con la ricorsione e viceversa.

> In generale, l'iterazione è **più performante** e può essere meno confusionaria per problemi semplici. Pertanto, dovremmo cercare di usare la ricorsione solo nei casi in cui aiuta a creare codice chiaro e conciso.

La ricorsione è meglio utilizzata nei casi in cui un problema può essere suddiviso in molti problemi più piccoli, un approccio command-and-conquer. Per questo motivo, la ricorsione viene generalmente utilizzata con strutture di dati ad albero:

![Albero](https://res.cloudinary.com/divzjiip8/image/upload/v1571941067/lp_structures_icon_2x_k3dpg8.png)

---

## Funzioni ricorsive
Una funzione ricorsiva è una funzione che richiama se stessa. Ad esempio:

```
function countdown(n) {
    countdown(n - 1);
}


```

 C'è qualche problema con questa funzione ricorsiva! Riuscite a individuarlo?

Possiamo invocarla: `countdown(3)`. Questo chiamerebbe `countdown(2)`, `countdown(1)`, `countdown(0)`, `countdown(-1)`... senza alcuna fine.

> Il risultato è un overflow di [call stack](https://university.alchemy.com/course/js/sc/5daf3f99a54be5305b6b32b1/stage/5db0ade7a54be5305b6b32b2?tab=details)!

### Stack delle chiamate
----------

Lo stack delle chiamate è una caratteristica del linguaggio JavaScript che tiene traccia di dove è stato il programma in modo da sapere dove tornare.

Facciamo un esempio:

```
// salviamo un utente nel nostro database
function saveUser(user) {
    db.save(user);
}


// aggiornare il nome dell'utente nel database
function updateUserName(userId, name) {
    saveUser({ id: userId, name: name });

    console.log("User Updated");
}

updateUserName(123, "Charles");

```

 La funzione `updateUserName` chiama `saveUser`. Mentre siamo all'interno del corpo della funzione `saveUser`, lo stack delle chiamate ricorderà dove tornare (prima riga di `updateUserName`). Una volta completata la funzione, tornerà a registrare l'aggiornamento dell'utente nella console.

Lo stack di chiamate tiene traccia delle chiamate annidate:

```
updateUserName(123, "Charles");
    saveUser({ id: 123, name: "Charles" });

```

Per una funzione ricorsiva, il nostro stack di chiamate continuerà ad aggiungere una nuova voce ogni volta che chiamiamo la funzione:

```
function countdown(n) {
    // if(n === 0) return;

    countdown(n - 1);
}

```

Se chiamassimo `countdown(5)`, avremmo le seguenti voci nel nostro stack di chiamate:

```
countdown(5);
    countdown(4);
        countdown(3);
            countdown(2);
                countdown(1)

```

Naturalmente, se rimuoviamo il **caso base** potremmo esaurire la memoria. Vediamolo in azione:

```
function countdown(n) {
    // if(n === 0) return;

    countdown(n - 1);
}

```

L'esecuzione di `countdown(5)` ora risulterà in un `Uncaught RangeError: Maximum call stack size exceeded`!

```
countdown(5);
    countdown(4);
        countdown(3);
            countdown(2);
                countdown(1);
                    countdown(0);
                        countdown(-1);
                            countdown(/* n-1… */);


```

Ricordare sempre il caso base.


È importante aggiungere un caso base in una funzione ricorsiva. Il caso base è il punto in cui si interrompe la ricorsione.

```
function countdown(n) {
    if(n === 0) {
        console.log('countdown complete!');
        return;
    }

    countdown(n - 1);
}


```

Ottimo! Il nostro `conto alla rovescia` si ferma quando raggiunge `0`.



### ESERCIZIO: gestire la sommatoria ricorsivamente

---------

Supponiamo di voler restituire la sommatoria di tutti i numeri positivi minori o uguali ad un numero.

Scritto in modo ricorsivo:

```
function summation(n) {
    if(n < 1) return 0;

    return n + summation(n - 1);
}


```

Se `n` è inferiore a `1`, restituiamo semplicemente `0`.

Altrimenti, aggiungiamo `n` alla sommatoria al ciclo precedente, `summation(n-1)`.

### ESERCIZIO: gestire il fattoriale ricorsivamente


> Il fattoriale di un numero `n` è il numero `n` moltiplicato per il fattoriale di `n-1`. Scritto in JavaScript, `n * factorial(n - 1)`.

-----------------------

Facciamo in modo che `factorial' funzioni per ogni numero intero positivo.


-------------------------------


```
function factorial(n) {
    if (n === 1 || n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

module.exports = factorial;
```



==========
## Percorrere i nodi
==========

---

Creiamo una funzione che trovi l'ultimo nodo di un elenco di nodi.

Un `nodo` avrà due proprietà:

1.  `id`: Un identificatore univoco.
2.  `next`: Un riferimento a un altro nodo.

In questo modo, ogni nodo punterà a quello **successivo**.

```
// Dato un nodo, possiamo trovare il nodo2 usando next
const node2 = node.next;

// nodo2 ha il suo id e il riferimento al nodo successivo
console.log(node2); // {id: 2, next: {...}}

// possiamo trovare il nodo3 utilizzando next sul nodo2
const node3 = node2.next;

// anche il nodo3 ha il suo id e il suo riferimento al nodo successivo
console.log(node3); // {id: 3, next: {...}}

```

A un certo punto, ci sarà un nodo senza un **successivo**!

```
console.log( node5.next ); // undefined

```

 Facciamo di questo il nostro caso base.


---
ESERCIZIO

### Parte 1:  caso base
---------------------

Ancora una volta, inizieremo con il **caso base**.

Dato un nodo la cui proprietà `next` è `undefined`, restituire il nodo.


```
function walk(node) {
  // caso base: se il nodo non ha un successivo, restituisce il nodo corrente
  if (!node.next) {
    return node;
  }
}

module.exports = walk;

```


### Parte 2: trovare l'ultimo nodo
-----------------------------

OK, ora che abbiamo stabilito un **caso base**, aggiungiamo il passo ricorsivo.

Continuiamo a percorrere i nodi fino a trovare l'ultimo. 

```
function walk(node) {
  // caso base: se il nodo non ha un successivo, restituisce il nodo corrente
  if (!node.next) {
    return node;
  }

  // caso ricorsivo: percorre il nodo successivo e restituisce il risultato
  return walk(node.next);
}

module.exports = walk;


```

