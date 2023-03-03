
==========
Elenchi collegati (Linked List)
==========

------------

Le **liste collegate** sono una struttura dati importante. Il nome è anche abbastanza appropriato, considerando che *è* semplicemente un elenco di nodi collegati tra loro:

![Elenco collegato](https://res.cloudinary.com/divzjiip8/image/upload/v1572460197/Frame_1_40_lj8zfj.png)

Ogni nodo può memorizzare alcuni dati e un riferimento al nodo successivo. Se conosciamo il **nodo di testa** possiamo semplicemente seguire il riferimento al nodo successivo e poi al nodo successivo... fino a raggiungere la fine dell'elenco.

Se abbiamo bisogno di rimuovere un nodo, possiamo farlo collegando i nodi circostanti:

![Collegamento](https://res.cloudinary.com/divzjiip8/image/upload/v1572463972/Frame_1_48_u2js1q.png)

> Qui stiamo semplicemente cambiando il riferimento `next` del primo nodo per farlo puntare all'ultimo nodo. Questo taglia il nodo centrale dalla lista.


## Aggiungere nodi 
---------

Ora è il momento di creare un metodo per aggiungere un nodo all'inizio dell'elenco collegato. Questo nodo diventerà il **nuovo nodo di testa**.

Per implementarlo, possiamo suddividerlo in due scenari:


### 1. Nessun nodo di testa esistente
---------------------

Il primo scenario è quello in cui non esiste un **nodo di testa**.

Questo scenario è piuttosto semplice. Basta impostare il nuovo nodo come `head` nella `LinkedList`:

![Nessuna testa](https://res.cloudinary.com/divzjiip8/image/upload/v1572460889/Frame_1_41_vk0ofr.png)



### 2. Nodo testa esistente
------------------

Il secondo scenario si ha quando c'è **un nodo testa esistente**.

Occorre fare due cose.

**Prima** dobbiamo impostare il `next` di questo nuovo nodo al `head` attuale:

![Testa esistente](https://res.cloudinary.com/divzjiip8/image/upload/v1572461160/Frame_1_44_qc5iau.png)

**Secondo** dobbiamo impostare l' `head` al nuovo nodo che abbiamo aggiunto in testa:

![Imposta testa](https://res.cloudinary.com/divzjiip8/image/upload/v1572461289/Frame_1_45_w7mats.png)

 In questo esempio il nodo testa originale non ha un nodo `next`.

Aggiungiamo un metodo chiamato `addFirst` su `LinkedList`. Questo metodo prenderà un `nodo` e lo aggiungerà all'inizio della Linked List.

```
class LinkedList {
    constructor(){
        this.head = null;
    }
    addFirst(node){
        if (this.head == null){
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
    }
```

La classe ha un costruttore che inizializza l'head della lista a null.

La classe LinkedList ha un metodo addFirst che prende un nodo come parametro. Se l'head della lista è nullo, allora l'head viene impostato al nodo passato come parametro. In caso contrario, il next del nodo passato come parametro viene impostato all'head corrente e l'head viene impostato al nodo passato come parametro. Il metodo aggiunge correttamente un nuovo nodo alla testa della lista.

--- 

## Aggiungere un nodo alla fine della lista

Per farlo, dobbiamo iniziare dalla testa e continuare a scendere nell'elenco fino a raggiungere un punto dell'elenco in cui non c'è un nodo successivo. Una volta raggiunto questo punto, impostiamo il prossimo sul nostro nuovo nodo.

```
addLast(node){
    if (this.head == null) {
        this.head = node;
    } else {
        let current = this.head;
        while (current.next !== null) {
             current = current.next;
        }
        current.next = node;
    }
}


```

Inizialmente, viene controllato se la lista è vuota, ossia se `this.head` è nullo: in tal caso, il nodo passato come parametro viene impostato come nuovo `head` della lista.

Se invece la lista non è vuota, si cerca l'ultimo nodo della lista attraverso un ciclo while che scorre tutti i nodi della lista fino a trovare l'ultimo (cioè quello che non ha un nodo successivo). Per fare ciò, si parte dal nodo iniziale (cioè `this.head`) e si scorrono tutti i nodi tramite il riferimento `next` finché non si raggiunge l'ultimo nodo. Una volta trovato l'ultimo nodo, si imposta il suo riferimento `next` al nodo passato come parametro, in modo da aggiungerlo alla fine della lista.


----

## Recuperare l'index di un nodo

Scriviamo un metodo `indexOf` come un normale array! Sarà a base zero, quindi la `testa` sarà `0` e ogni indice successivo sarà incrementato di `1`:

![Index Of](https://res.cloudinary.com/divzjiip8/image/upload/v1572463429/Frame_1_47_l1fqwo.png)

Aggiungiamo quindi un metodo `indexOf` su `LinkedList` che prenda `node` e restituisca un indice `number` che indichi la posizione del nodo nell'elenco.


indexOf(node){
        let index = 0;
        let current = this.head;
        while (node.current !== null){
            if(current === node){
                return index;
            } 
            current = current.next;
            index++;
        }   
    }

La funzione inizia inizializzando la variabile `index` a `0` e il nodo corrente `current` alla **testa della lista**. Successivamente, viene eseguito un ciclo while finché il nodo corrente non è nullo. All'interno del ciclo while, viene controllato se il nodo corrente è uguale al nodo passato come parametro. Se è così, l'indice corrente viene restituito. Altrimenti, viene impostato il nodo corrente al successivo e l'indice viene incrementato di 1.

Se il nodo non viene trovato, alla fine del ciclo while, la funzione non restituirà nulla.



----


## Rimuovere un nodo
--------------------

### Rimuovere il nodo testa
Se stiamo rimuovendo il nodo all'indice `0` (il nodo di testa), possiamo semplicemente impostiamo il nuovo nodo di testa al nodo `successivo` a cui puntava il nodo di testa originale.

1.  Se il nodo testa originale non aveva alcun riferimento `next`, il riferimento `head` diventa `null`. Si tratta di un elenco vuoto, quindi funziona. 
2.  Se il nodo testa originale avesse un riferimento `next`, diventerebbe il nuovo nodo testa, che è esattamente ciò che vogliamo. 

### Rimozione di un nodo non testa
------------------------

Se stiamo rimuovendo un nodo tra altri nodi, dovremo collegare il nodo precedente al nodo successivo:

![Connect](https://res.cloudinary.com/divzjiip8/image/upload/v1572463972/Frame_1_48_u2js1q.png)

Una volta effettuata questa connessione, abbiamo rimosso con successo il `node` dalla lista collegata.

---------------------

Aggiungiamo un metodo `removeAt` a `LinkedList`.

Questo metodo prenderà un numero `index` e rimuoverà il `nodo` nell'elenco corrispondente a quella posizione `index`.


```
removeAt(index){
        if (index < 0 ) {
            return null;
        }
        let current = this.head;
        if(index === 0){
            this.head = current.next;
        } else {
            let previous = null;
            for (let i = 0; i < index; i++){
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        return current;
    }
```

Il metodo controlla prima se l'indice è inferiore a zero e in tal caso restituisce `null`, in quanto non ci può essere alcun nodo con indice negativo nell'elenco.

Se l'indice è `0`, il nodo corrente diventa il nuovo nodo della testa dell'elenco collegato, poiché viene rimosso il nodo iniziale.

Se l'indice non è zero, il metodo attraversa l'elenco fino all'indice `index` e rimuove il nodo corrente collegando il nodo precedente al nodo successivo del nodo corrente.

Infine, il metodo restituisce il nodo rimosso.




