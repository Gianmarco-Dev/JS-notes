## Introduzione alle Promise
-------------------------

Spesso quando scriviamo codice JavaScript dobbiamo aspettare che accada qualcosa prima di poter continuare. Alcuni esempi sono:

-   Aspettare l'input di un utente
-   Attendere la fine di un'animazione
-   Aspettare che trascorra del tempo
-   Attendere una risposta dal server

In tutti questi casi scriviamo codice asincrono. Diciamo a JavaScript dove riprendere dopo che qualcosa è accaduto. Possiamo farlo passando una funzione di callback come argomento a una funzione.

Ecco un esempio:

```
runAnimation(function() {
    // fare qualcosa dopo che l'utente inserisce un input
});
```
---

Le Promise ci danno un modo alternativo per configurare le nostre funzioni di callback:

```
const animationPromise = runAnimation();

animationPromise.then(() => {
    // fare qualcosa dopo che l'utente inserisce un input
});

```

Le Promise ci consentono di collegare le funzioni di callback in modo diverso. Possiamo persino restituire delle `Promise` dalle funzioni.


---

## Utilizzo delle promises
--------------

JavaScript è single-threaded. Per questo motivo, vi troverete a scrivere un bel po' di codice **asincrono**, ovvero codice che verrà eseguito in un momento futuro, dopo che qualcosa è accaduto.

Fornire una funzione di callback come argomento è un modo classico di gestire il codice asincrono. 

Le **promesse** forniscono un'alternativa:

```
const promise = getServerData();

// simile all'uso di un argomento della funzione callback,
// tranne che per il fatto che la callback viene connessa con .then

promise.then(function(data) {
    // questa funzione viene chiamata in modo asincrono
    // una volta che il server ha risposto con i dati
    console.log('got data', data);
});

```

 Qui `getServerData` restituisce una promessa.

Possiamo chiamare `.then` e fornire una funzione da invocare una volta risolti i dati del server.

--------------------------

Come accennato in precedenza, le `Promise` forniscono un modo diverso di gestire le funzioni di callback nei casi in cui dobbiamo aspettare che accada qualcosa prima di poter proseguire con il nostro codice.

Invece di passare una funzione di callback come argomento a una funzione, possiamo creare una Promise che rappresenta il risultato di quella funzione asincrona.

Una Promise è essenzialmente un oggetto che rappresenta una promessa di un risultato futuro e che può avere uno stato iniziale di **"pending"**, ovvero in attesa, oppure uno stato di **"fulfilled"** (risolto con successo) o **"rejected"** (risolto con errore).

Nel caso di una Promise, possiamo poi utilizzare il metodo `then()` per specificare cosa deve succedere quando la Promise viene risolta con successo e il metodo `catch()` per specificare cosa deve succedere se la Promise viene respinta.

Ecco un esempio di come utilizzare le Promise:

```
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: "Mario" };
      if (data) {
        resolve(data);
      } else {
        reject("Data not found");
      }
    }, 2000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

```

In questo esempio, la funzione `fetchData()` restituisce una `Promise` che verrà risolta dopo *2 secondi* con l'oggetto `data` se tutto va bene. Se qualcosa va storto, la Promise viene respinta con un messaggio di errore.

Infine, utilizziamo il metodo `then()` per stampare l'oggetto data a console se la Promise viene risolta con successo, oppure utilizziamo il metodo `catch()` per stampare un messaggio di errore se la Promise viene respinta.

In generale, le Promise sono uno strumento utile per gestire il flusso asincrono del nostro codice in modo più leggibile e più facilmente gestibile, soprattutto quando abbiamo bisogno di concatenare più funzioni asincrone insieme.


--- 

## Errori e .catch


A volte, una promessa **non si risolve con successo**. Per esempio: Vogliamo ottenere dei dati dal server e il server non è in grado di gestire la nostra richiesta. In questo caso, potremmo ricevere un codice di risposta di errore dal server.

In questi casi, abbiamo bisogno di una gestione degli errori per gestire correttamente la situazione. Per fare ciò, possiamo utilizzare il metodo .catch delle promesse.

Quando una promessa viene respinta, ovvero quando si verifica un errore, il metodo .catch viene chiamato e passa come parametro l'errore stesso. Questo ci permette di gestire l'errore in modo specifico e di fornire al nostro programma un comportamento adeguato alla situazione.

```
const promise = getDataFromServer();

promise.catch((err) {
    console.error('Qualcosa è andato storto');
});

```

> Dal lato dell'implementatore della promessa, questo è noto come **rifiuto, rejecting** delle promesse, in contrapposizione alla **risoluzione, resolving** con i dati del server.


Tuttavia, è importante sottolineare che la gestione degli errori tramite .catch non è l'unica opzione che abbiamo a disposizione. Possiamo anche utilizzare il secondo parametro della funzione .then per gestire gli errori, oppure utilizzare la sintassi `async/await` per gestire le promesse in modo sincrono e gestire gli errori con un blocco `try/catch`.

In ogni caso, è importante gestire correttamente gli errori quando lavoriamo con le promesse, in modo da evitare situazioni di blocco o comportamenti inaspettati del nostro programma.

Ecco un esempio di codice che simula una richiesta a un server e gestisce gli eventuali errori con `.catch()`:

```
function getDataFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.random();
      if (randomNum > 0.5) {
        resolve('Dati ricevuti dal server');
      } else {
        reject(new Error('Errore: impossibile ottenere dati dal server'));
      }
    }, 2000);
  });
}

getDataFromServer()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err.message);
  });


```
In questo esempio, la funzione `getDataFromServer` restituisce una promessa che si risolve dopo 2 secondi, restituendo dei dati se un numero casuale generato è maggiore di 0.5, altrimenti viene rifiutata con un errore.

Successivamente, chiamiamo questa funzione e gestiamo la promessa con `.then()` per ottenere i dati se la promessa viene risolta, oppure con `.catch()` per gestire l'errore se la promessa viene rifiutata. In questo caso, stampiamo il messaggio di errore sulla console.



APPROFONDIMENTO

## JS Single Threaded
---------------

JavaScript è **single threaded**. Ciò significa che viene eseguito un solo processo in qualsiasi momento. Se si dispone di un ciclo che continua a essere eseguito per 10 secondi, il motore JavaScript **non può fare altro che eseguire il ciclo** fino allo scadere dei 10 secondi.

Per questo motivo è importante scrivere il codice JavaScript in modo che sia **non bloccante**. Ciò significa che se il codice deve aspettare qualcos'altro, indica a JavaScript dove tornare una volta completato. Ciò potrebbe significare attendere l'input dell'utente, un'animazione, un timeout o una risposta del server. In questo lasso di tempo il motore è libero di fare qualsiasi altra cosa.

Ecco perché la programmazione asincrona è così importante in JavaScript. Soprattutto nel browser, è molto comune scrivere codice che attende che accada qualcosa prima di continuare:

- Quando un utente fa clic su questo pulsante, fai questo.
- Quando un'animazione è terminata, fai questo.
- Quando un server risponde con queste informazioni, fare questo.

Tutte queste sarebbero azioni asincrone. La parte "**fai questo**" verrebbe raccolta dal motore una volta terminata la prima parte e liberato il thread per eseguire il codice.

## Argomenti della funzione di callback
---------------------------

Fornire una funzione di callback come argomento è un ottimo modo per gestire il codice asincrono.

La funzione `readFile` della libreria `fs` di Node.js consente di passare una funzione di callback:

```
fs.readFile("abc.txt", function(err, content) {
    if(err) {
        console.error(err);
    }
    else {
        console.log(content)
    }
});

```

Funziona abbastanza bene! Tuttavia, può diventare rapidamente brutto quando abbiamo molti callback.

```
io.readFile("other.txt", function(contents) {
    sendToServer(contents, function(response) {
        writeLog(response, function() {
            console.log('written!');
        });
    });
});

```

 Il codice continua ad annidarsi verso destra! Alcuni sviluppatori si riferiscono affettuosamente a questa situazione come all'inferno dei **callback**. 

Le promesse sono molto più facili da passare e da restituire alle funzioni di livello superiore:

```
const filePromise = readFile("other.txt");

```

 In questo caso, possiamo usare `filePromise` in altre funzioni per rappresentare il contenuto del file quando è pronto. In questo modo è più facile organizzare il codice in modo più leggibile:

```
filePromise.then((contents) => {
    // fa qualcosa con il contenuto del file
});

```
---

## Creare Promises

------------------

Prima abbiamo visto come gestire una promessa restituita. In questa fase **creiamo una promessa**.

La maggior parte dei moderni ambienti JavaScript ha un oggetto `Promise` incorporato che può essere usato per creare una nuova `Promise`:

```
const promise = new Promise(function(resolve, reject) {
    resolve('resolve successful!');
});

```

 La funzione fornita alla promise è chiamata funzione executor. Questa funzione viene chiamata immediatamente e di solito viene impostata per risolvere dopo che è successo qualcosa di asincrono.

> È possibile trovare la documentazione di `Promise` su [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```
promise.then(function(message) {
    console.log(message);
});

```


## Restituire una promessa risolta
-------------------------------------

All'interno della funzione `timer', restituire una nuova **promessa risolta**.

> Non è necessario fare nulla all'interno della funzione, se non invocare la funzione `resolve`.

```
function timer() {
    const promise = new Promise(function(resolve, reject){
        resolve('just smth');
    });
    return promise;
    
}

module.exports = timer;

```

---

## Esecutore asincrono (Async Executor)
---------------------

Lo scopo della funzione **executor** è quello di avvolgere un'azione asincrona e fornire la callback per il risultato.

```
const p1 = new Promise(function executor(resolve, reject) {
    runAnimation(function() {
        resolve();
    });
});

```

La funzione `runAnimation` accetta solo una funzione di callback al termine dell'animazione.

Avvolgendola in una `promise`, creiamo un nuovo oggetto `p1`, che può essere usato per collegare molteplici callback con `then`:

```
p1.then(function() {
    showDialog();
});

```

```
p1.then(function() {
    removeAnimation();
});

```

> Questi due callback `then` possono essere collegate in punti diversi del programma, consentendo di [separare le preoccupazioni] (https://en.wikipedia.org/wiki/Separation_of_concerns) più facilmente.

### Creare un timer asincrono
------------------------------

Modifichiamo la funzione esecutrice `timer' in modo che si risolva dopo un secondo.

È possibile eseguire il codice dopo un secondo utilizzando un timeout:

```
function timer() {
    const promise = new Promise(function(resolve, reject){
        setTimeout(function () {
            resolve('just smth');
        }, 1000);
 
    });
    return promise;
    
}

module.exports = timer;
```


---

Attesa asincrona (Async await)
-----------

Un altro strumento utile nella cintura degli strumenti asincroni di JavaScript è **async**/**await**.

Con queste due parole chiave possiamo gestire le promesse riga per riga come il codice sincrono:

```
function async getData() {
    const result = await serverCall();

    // questo non verrà eseguito finché serverCall non risolve/rifiuta
    return result;
}

```

 In questo esempio, `serverCall` restituisce una promessa e il `result` è il valore risolto.

> La riga `return` non viene eseguita fino al completamento della promessa `serverCall`. Questo è il caso di qualsiasi cosa dopo la riga `await`. 

Avvolgendo questa funzione `test` in una promessa, si ottiene un ambiente speciale in cui è possibile scrivere codice che sembra sincrono, pur consentendo di essere asincrono. Questo è il potere di **async**/**await**.

L'esempio precedente è funzionalmente equivalente a:

```
function getData() {
    return serverCall().then((result) => {
        return result;
    });
}

```

In entrambi i casi, `getData` restituisce una promessa e la promessa si risolve con il `result`.

> Si può pensare a `async` come a un modo per indicare che una funzione restituirà una promessa. Per una documentazione completa su async [vedere qui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).


## Parola chiave Async
-------------

La parola chiave **async** fa sì che una funzione restituisca una promessa. Anche se si dovesse creare una semplice funzione come questa:

```
async function test() {

}

```

Aggiungendo `async` davanti, questa funzione restituirà una promessa quando viene invocata.

Questo ci permette di scrivere codice asincrono all'interno della funzione `test` come se fosse sincrono.

Per esempio:

```
function async test() {
    await getServerData();

    return 3;
}

```

 Non restituiremo `3` fino a quando la promessa restituita da `getServerData` non si risolverà.

Questo sarebbe un problema se venisse chiamato `test` e si aspettasse il valore di ritorno immediatamente:

```
const three = test();

```

Il valore di tre è uguale a `3` in questo caso? 

No! È una promessa:

```
console.log(tre); // Promessa

// Dovremmo cercare di dare un nome appropriato ai nostri oggetti
const threePromise = three;
threePromise.then(function(data) {
    console.log(data); // 3
});

```

-----------------------------

ESERCIZIO

-----------------------------

Abbiamo una funzione `handleResults` che dovrebbe recuperare i risultati di un paziente da un laboratorio, inviarli al paziente e registrare la risposta nei log.

![Relay](https://res.cloudinary.com/divzjiip8/image/upload/v1573092887/Frame_1_61_xvipqy.png)

Le tre funzioni sono state importate da un file esterno. Ogni funzione restituisce una promessa, quindi può essere usata con **async**/**await**. È necessario chiamarle in ordine:

1.  Passare il `patientId` a `getResults`. Questo risolverà con `results`.

2.  Passare il `patientId` e `results` (in quest'ordine) a `sendResults`. Questo risolverà con `response`.

3.  Passare la `risposta` a `logResponse`. Non c'è un valore di ritorno. Si può scegliere di restituire la promessa da `logResponse` o di usare `await`, in modo che la funzione non si risolva fino al completamento di `logResponse`.

> Si noti che la parola chiave `async` è già stata aggiunta alla funzione `handleResults`. Questo ci permetterà di usare `await` all'interno della funzione.


```

const { getResults } = require('./lab');
const { sendResults } = require('./messaging');
const { logResponse, logError } = require('./logs');

async function handleResults(patientId) {
    try{
        const results = await getResults(patientId);
        const response = await sendResults(patientId, results);
        await logResponse(response);

    } catch(err){
        logError(err);

    }
    
}

module.exports = handleResults;

```


## Catching Async/Await
--------------------

Le parole chiave **async/await** ci forniscono una bella interfaccia per utilizzare le promesse. Abbiamo ancora una promessa che può essere sia **risolta** *che* **rifiutata**.

Nell'ultima fase, abbiamo gestito solo la **risoluzione**.

Come gestiamo il caso in cui la promessa viene rifiutata? 

Possiamo usare `try`/`catch`.

```
function async getData() {
    try {
        const data = await callServer();
    }
    catch(ex) {
        // questo viene eseguito se la promessa di callServer viene rifiutata
        console.log(ex);
    }
}

```

 Se la promessa `callServer` dovesse essere **rifiutata** qui, verrebbe `catturata` l'eccezione e quindi registrata nella console.

 Obiettivo: catturare un errore
--------------------------

Se viene lanciato un errore in **una qualsiasi** delle funzioni asincrone che abbiamo chiamato nell'ultima fase, catturiamolo.

Una volta ottenuta l'eccezione, passarla a `logError`.