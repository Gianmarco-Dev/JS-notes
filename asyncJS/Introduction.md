---------------------------
## Esecuzione di una funzione di callback
---------------------------

In JavaScript, le funzioni sono **oggetti di prima classe** (first-class object). Ciò significa che, proprio come gli oggetti, le funzioni possono essere:
1. memorizzate in variabili, 
2. restituite da funzioni,
3. passate ad altre funzioni come argomenti.

> Con le funzioni di callback, si passano funzioni ad altre funzioni per essere richiamate in un momento specifico.

Pensiamo a un caso molto semplice:

```
function simpleFunction(fn) {
    // invoca la funzione di callback
    fn();
}

simpleFunction(function callbackFunction() {
    console.log('ciao');
});

```

 Nell'esempio, `callbackFunction` viene passata a `simpleFunction` come argomento e poi invocata immediatamente. Il risultato è che 'ciao' viene registrato una volta nella console.


Scriviamo la funzione `runCallback` per invocare immediatamente `callbackFunction`.

```
function runCallback(callbackFunction) {
    callbackFunction();
}

```




---------------------------

## Callback asincrono
---------------------------


Nell'ultima fase abbiamo visto come le callback vengano eseguite in un **tempo specifico** quando vengono passate a un'altra funzione. In genere, questo le rende estremamente utili per la programmazione asincrona.

Per le applicazioni web, dove JavaScript è particolarmente diffuso, le callback asincrone possono essere utili in diversi scenari:

- Richieste AJAX al server
- Attesa di una risposta dell'utente
- Animazioni

Un semplice esempio di codice asincrono è l'uso dell'API web `setTimeout`, che esegue il codice dopo un determinato periodo di tempo:

```
setTimeout(function callback() {
    //  codice da eseguire dopo 1000 millisecondi
}, 1000);

// il codice qui sotto viene eseguito in modo sincrono (prima del callback)

```

In `setTimeout`, gli diamo un callback da eseguire dopo un certo periodo di tempo (in ms). Il primo parametro della funzione è il callback e il secondo parametro è il numero di ms da attendere prima di eseguire la funzione di callback.

> Qui la documentazione completa di [setTimeout su MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).


------------------------------------------

Ora modifichiamo `runCallback` per rendere asincrona l'esecuzione di `callbackFunction`.

Come nell'esempio precedente, usiamo `setTimeout` e invochiamo `callbackFunction` 1000 ms dopo che `runCallback` è stata chiamata.


```
function runCallback(callbackFunction) {
    setTimeout(callbackFunction, 1000);
};

```

----
## Dialog Callback 
---------------

In questo esempio, creeremo un callback che sarà invocata dall'interazione con l'utente. Confrontiamo questo utilizzo con quello della fase precedente, in cui la callback veniva invocata una volta trascorso un determinato lasso di tempo.

Immaginiamo di avere un componente di dialogo di base per la nostra applicazione web. Questo componente `Dialog` utilizzerà la `class` di JavaScript, in modo da poter creare una nuova istanza della finestra di dialogo ogni volta che ne abbiamo bisogno.

Completiamo le funzioni di una finestra di dialogo.
-------------------------------------

Scriveremo due funzioni per il nostro componente di dialogo:

1.  `onClose` - Questo metodo prenderà come argomento una `funzione` di callback e la memorizzerà nella nostra istanza `Dialog`.
2.  `close` - Questa funzione sarà usata per chiudere la finestra di dialogo. Quando chiudiamo la finestra di dialogo, vogliamo chiamare la `funzione di callback`.

In pratica, quando si vuole usare il componente `Dialog`, si può creare una logica da eseguire quando una specifica finestra di dialogo viene chiusa. Per esempio, potremmo aggiornare i dati della pagina:

```
const dialog = new Dialog();

dialog.onClose(function() {
    // aggiorna i dati sulla pagina per riflettere lo stato
    // delle modifiche apportate all'interno della finestra di dialogo
    refreshData();
});

```

> Ricordiamo che nell'ultima fase la callback è stato invocata in modo asincrono da `setTimeout`. Questa callback è simile. La differenza principale è che la funzione `close` viene richiamata dall'utente quando clicca per uscire dalla finestra di dialogo.


CODICE:

```
class Dialog {
    constructor() {
        this.callbackFunction = null;
    }

    onClose(callbackFunction) {
        this.callbackFunction = callbackFunction;
    }

    close() {
        if (this.callbackFunction) {
            this.callbackFunction();
        }
    }
}

module.exports = Dialog;

```


## Callback multiple per finestre dialogo
-------------------------

A volte si ha la necessità di collegare **molteplici callback** alla chiusura di una finestra di dialogo. 
----------------------------------------------

Aggiungiamo la possibilità di collegare **multiple** funzioni di callback al codice scritto prima.

Ogni volta che viene chiamato il metodo `onClose`, dovremo memorizzare una funzione di callback aggiuntiva nella nostra classe `Dialog`. Una volta chiamato `close`, invocheremo tutte queste funzioni di callback.

Inizializziamo un array sulla classe `Dialog` nel metodo `costruttore` che viene chiamato **una volta sola**, quando viene creata una nuova istanza.


CODICE:

```
class Dialog {
    constructor() {
        this.callbackFunction = null;
        this.arrCallback = [];
    }

    onClose(callbackFunction) {
        this.arrCallback.push(callbackFunction);
    }

    close() {
        this.arrCallback.forEach(callback => callback());

    }
}

module.exports = Dialog;

```

---

## Funzione forEach 

Creiamo una funzione forEach custom.

Questa funzione prende due parametri:

1. Un array di elementi
2. Una funzione di callback da eseguire per ogni elemento nell'array

Assicuriamoci di chiamare la funzione di callback sia con l'elemento corrente nell'array che con l'indice a base zero.

Esempio:
```
forEach(['a','b','c'], (e,i) => {
    console.log(e,i);
});
```

La riga `console.log` dovrebbe essere eseguita tre volte, registrando:
```
a, 0
b, 1
c, 2
```

Ecco la soluzione per la funzione forEach:

```
function forEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

module.exports = forEach;

```

Iteriamo su ogni elemento dell'array utilizzando un semplice ciclo `for` e chiamiamo la funzione di callback fornita con l'elemento corrente e il suo indice.

---

## Callback e funzione .map

Nella funzione custom .map, vogliamo prendere un array ed eseguire una funzione su ogni elemento, sostituendo l'elemento con il valore restituito dalla funzione.

Per esempio:

```
const newArray = map([3,4,5], (x) => {
    return x * 3;
});

console.log(newArray); // [9,12,15]

```

-------------------------------------

Mappiamo ogni elemento dell'array al suo nuovo valore restituito dalla funzione `callback`.

Questa volta si dovrà creare un nuovo array che verrà restituito alla fine dell'iterazione di `map`.

CODICE:

```
function map(arr, callback) {
    const result = [];
    for(i = 0; i < arr.length; i++){
        result.push(callback(arr[i]));
    
    }
    return result;
    
}

module.exports = map;

```

La callback viene chiamata su ogni elemento dell'array e restituisce il risultato della trasformazione. Questo valore viene quindi inserito in un nuovo array, `result`, che verrà restituito alla fine della funzione.

La funzione di callback prende due parametri: l'elemento corrente dell'array e il suo indice. La funzione map itera su ogni elemento dell'array utilizzando un ciclo `for` e chiama la funzione di callback passando l'elemento e l'indice corrente. Il risultato della chiamata di callback viene quindi inserito nel nuovo array usando il metodo `push`.

Infine, la funzione map restituisce il nuovo array contenente i risultati delle trasformazioni applicate agli elementi dell'array originale.

