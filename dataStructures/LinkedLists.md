
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


## Aggiungere il primo nodo
---------

Ora è il momento di creare un metodo per aggiungere un nodo all'inizio dell'elenco collegato. Questo nodo diventerà il **nuovo nodo di testa**.

Per implementarlo, possiamo suddividerlo in due scenari:


### Nessun nodo di testa esistente
---------------------

Il primo scenario è quello in cui non esiste un **nodo di testa**.

Questo scenario è piuttosto semplice. Basta impostare il nuovo nodo come `head` nella `LinkedList`:

![Nessuna testa](https://res.cloudinary.com/divzjiip8/image/upload/v1572460889/Frame_1_41_vk0ofr.png)



### Nodo testa esistente
------------------

Il secondo scenario si ha quando c'è **un nodo testa esistente**.

Questo scenario è un po' più complicato. Occorre fare due cose.

**Prima** dobbiamo impostare il `next` di questo nuovo nodo al `head` attuale:

![Testa esistente](https://res.cloudinary.com/divzjiip8/image/upload/v1572461160/Frame_1_44_qc5iau.png)

**Secondo** dobbiamo impostare il `head` al nuovo nodo che abbiamo aggiunto al fronte:

![Imposta testa](https://res.cloudinary.com/divzjiip8/image/upload/v1572461289/Frame_1_45_w7mats.png)

 In questo esempio il nodo testa originale non ha un nodo `next`.

Se lo avesse avuto, avremmo dovuto cambiarlo? 

No! Questo funzionerà bene, il resto della lista può rimanere collegato come era in precedenza.