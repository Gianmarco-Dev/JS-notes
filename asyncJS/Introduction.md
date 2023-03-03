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

> Ricordiamo che nell'ultima fase la callback è stato invocata in modo asincrono da `setTimeout`. Questo callback è simile. La differenza principale è che la funzione `close` viene richiamata dall'utente quando clicca per uscire dalla finestra di dialogo.


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