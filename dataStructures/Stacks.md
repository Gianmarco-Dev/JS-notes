Struttura dello stack
--------------------

È ora di costruire uno stack! Uno stack  è una struttura di dati LIFO. Ciò significa che quando recuperiamo elementi dallo stack, l'elemento aggiunto più di recente viene rimosso per primo.


> La scelta della giusta struttura dati per un problema può farci risparmiare un bel po' di grattacapi.


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


Cercheremo di costruire una semplice implementazione di uno stack e la utilizzeremo per gestire le operazioni di annullamento e ripetizione. Vedremo `push`, `pop`, `stack overflow` (e `underflow`), stack call e gestione di stack multipli. 


=========
## Push & Pop
=========
----------


Implementiamo due metodi, `push` e `pop`, per iniziare a formare il nostro stack.

Prima vediamo le illustrazioni di entrambi:

![Push](https://res.cloudinary.com/divzjiip8/image/upload/v1566935393/Frame_4_ytxnxv.png)

 Push è l'unico modo per aggiungere elementi al nostro stack. Li aggiungiamo alla "cima" dello stack.

![Pop](https://res.cloudinary.com/divzjiip8/image/upload/v1566935111/Frame_3_ddvkg7.png)

 Pop è l'unico modo per recuperare elementi dallo stack. Rimuoviamo l'elemento dalla cima, recuperando l'elemento aggiunto più di recente.



============
Overflow e Underflow
============

--------------------

Avete mai sentito parlare di Stack Overflow? Forse sul [famoso sito di FAQ](https://www.stackoverflow.com/) o forse avete incontrato il famigerato errore di stack di chiamate ricorsive.

In ogni caso, il termine si riferisce a una condizione in cui viene superata la dimensione massima della memoria dello stack:

![Stack Overflow](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_350/v1579562849/Frame_32_nqzvja.png)

Una volta che lo stack ha raggiunto la sua dimensione massima, qualsiasi tentativo di 'spingere' su di esso risulterà in un `overflow`.

Analogamente, se proviamo a fare `pop` quando non abbiamo elementi, potete immaginare come potrebbe essere chiamato?

![Stack Underflow](https://res.cloudinary.com/divzjiip8/image/upload/c_scale,w_225/v1579563064/Frame_34_yypmhp.png)

Un **Underflow**, esatto.


--------
==========
Errore di stack della chiamata ricorsiva
==========

--------------------------

Quando si ha a che fare con la ricorsione, ci si può imbattere in un caso in cui lo stack delle chiamate trabocca, o meglio esplode.

Questo potrebbe essere semplice come:

```
funzione myFunction() {
    myFunction();
}
// effettua la chiamata iniziale
myFunction();

```

Dopo la chiamata iniziale, il programma non terminerà mai. Alla fine lo stack delle chiamate andrà in `overflow`, perché esaurirà la memoria in cui riportare l'esecuzione del programma.