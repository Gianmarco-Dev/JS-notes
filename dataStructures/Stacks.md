Struttura dello stack
--------------------

Gli stacks sono una struttura dati importante per molti tipi di problemi. Vediamo le funzioni di uno stack e quali sono questi tipi di problemi.

> La scelta della giusta struttura dati per un problema può farci risparmiare un bel po' di grattacapi.

Cercheremo di costruire una semplice implementazione di uno stack e la utilizzeremo per gestire le operazioni di annullamento e ripetizione. Vedremo `push`, `pop`, `stack overflow` (e `underflow`), stack call e gestione di stack multipli. 


=========
## Push & Pop
=========
----------

È ora di costruire uno stack! Uno stack  è una struttura di dati LIFO. Ciò significa che quando recuperiamo elementi dallo stack, l'elemento aggiunto più di recente viene rimosso per primo.

> Diamo un'occhiata più da vicino a [LIFO in dettaglio](https://university.alchemy.com/course/js/sc/5d632eb5e5a95ac05652f6d6/stage/5d63327fe5a95ac05652f6d7?tab=details).

Implementiamo due metodi, `push` e `pop`, per iniziare a formare il nostro stack.

Prima vediamo le illustrazioni di entrambi:

![Push](https://res.cloudinary.com/divzjiip8/image/upload/v1566935393/Frame_4_ytxnxv.png)

 Push è l'unico modo per aggiungere elementi al nostro stack. Li aggiungiamo alla "cima" dello stack.

![Pop](https://res.cloudinary.com/divzjiip8/image/upload/v1566935111/Frame_3_ddvkg7.png)

 Pop è l'unico modo per recuperare elementi dallo stack. Rimuoviamo l'elemento dalla cima, recuperando l'elemento aggiunto più di recente.


### LIFO
----

LIFO sta per Last-In-First-Out. Si riferisce all'ordine in cui gli elementi entrano ed escono dalla struttura dati.

In uno stack, si spinge (push) un nuovo elemento in cima alla struttura di dati. Questo elemento diventa il nuovo elemento superiore dello stack. Quando si esegue `pop` su un elemento dello stack, l'elemento superiore viene rimosso dallo stack.

Ad esempio:

```
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack.pop()); // 4
console.log(stack.pop()); // 3

```

Notare come gli elementi vengono estratti in ordine inverso dallo stack.

### Metodi per gli array
-------------

In JavaScript, ci sono due metodi di array, opportunamente chiamati `push` e `pop`, che funzionano proprio come ci aspetteremmo per il nostro stack. Qui la [docs MDN per push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

Qui la [docs MDN per pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)