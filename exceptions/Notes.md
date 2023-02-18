Exceptions / Eccezioni
----------

Uno strumento importante in molti linguaggi di programmazione è la possibilità di **lanciare e catturare eccezioni**.

Un'eccezione è un errore inatteso in una funzione. La funzione potrebbe non sapere come gestire l'eccezione e quindi viene **lanciata**. Il lancio dell'errore interrompe l'esecuzione della funzione corrente e torna alla funzione che l'ha chiamata. La funzione chiamante può scegliere di **cogliere** l'eccezione e gestirla. Se non la cattura, l'eccezione continuerà a essere lanciata nello stack delle chiamate fino a raggiungere il livello superiore del programma.

 Consideriamo un esempio in cui vogliamo inviare un'e-mail a molti utenti:

![Invia e-mail](https://res.cloudinary.com/divzjiip8/image/upload/v1571197490/Frame_1_10_aoca5m.png)

Questo diagramma inizia nell'angolo in alto a sinistra, in `main`. Qui, il programma chiama `emailUsers` che tenterà di `inviareEmail` per ogni utente. Se l'invio dell'email non riesce, verrà lanciato un errore. L'errore verrà catturato in `emailUsers`, dove verrà registrato.

> Si noti come non si interrompa l'invio di email agli altri utenti quando si verifica un errore per uno di essi! L'errore viene lanciato e gestito in `emailUsers`, dove viene registrato. Poi `emailUsers` procede a chiamare `sendEmail` per i successivi due utenti con successo.

In altri scenari, si potrebbe voler uscire completamente se si verifica un'eccezione. Forse l'eccezione indica che è successo qualcosa di molto brutto da cui il programma non può riprendersi. Lanciare un'eccezione da una funzione inferiore come `sendEmail` ci permette di **catcharla** a un livello superiore e di gestirla lì.

> Un'eccezione da cui non è possibile riprendersi viene spesso definita **eccezione fatale**.

Pronti a gestire alcune eccezioni? Scriviamo del codice.



--- 


Lanciare un errore
--------------

In JavaScript ci sono casi in cui il linguaggio stesso *lancia* un errore. Questo viene definito **errore di esecuzione**.

Approfondiremo questi scenari in una fase successiva. Per prima cosa, creiamo i nostri errori!

```
const error1 = new Error("Something bad happened!");
const error2 = Error("Something bad happened!");

```

 Le due istruzioni sono funzionalmente equivalenti. Entrambe restituiscono un oggetto `Error` con il messaggio di errore `"Something bad happened!"`. Il messaggio è un buon posto per scrivere alcuni dettagli sul perché si è verificato l'errore, in modo da aiutare il debug del problema.

> In genere osserviamo `Error` creato con l'operatore `new`. In JavaScript, `new` è comunemente usato per creare una nuova istanza di un oggetto. Ne parleremo meglio quando tratteremo i **Prototipi JavaScript**.

Lancio di errori
---------------

L'idea di *lanciare* un errore è già stata menzionata in precedenza. Quando si lancia un errore, si interrompe l'esecuzione del codice in quel punto:

```
const a = 3;

if(a === 3) {
    lancia un nuovo errore("non vogliamo che a sia 3");
}

// <-- non raggiungiamo mai questa riga

```

> Dovremmo lanciare errori nei punti in cui vorremmo che l'esecuzione del codice si fermasse. Continueremo l'esecuzione del codice dal punto in cui l'errore viene *catturato*. 

```
function throwError() {
    throw new Error("Something bad happened!");
}

module.exports = throwError;

```

## Catturare gli errori

---------------

 Immaginiamo di voler leggere da un file sul nostro computer:

```
const text = readFile("book");

```

Cosa ci si aspetterebbe da `readFile` se non riuscisse a leggere `"libro"`?

Forse potrebbe restituire una stringa vuota... ma come si fa a sapere se il libro è *effettivamente* vuoto? 

Una stringa vuota potrebbe indicare un libro vuoto *o* un errore nella lettura del libro. Questo non va bene, è ambiguo! 

Invece, quando `readFile` fallisce, si potrebbe **lanciare un errore**. Potremmo gestire questo errore con un **tentativo di cattura**.

```
try {
    readFile("book");
}
catch(ex) {
    console.log(ex); // EISDIR: illegal operation
}

```

Il codice sopra riportato `prova' un'istruzione. Se viene lanciato un errore, la logica confluirà nel blocco `catch`. La riga `console.log(ex);` verrà eseguita solo se un errore (`ex`) viene lanciato da `readFile`.

> L'EISDIR viene lanciato in Node.JS quando la destinazione è una **directory**, mentre ci si aspettava che fosse un file. Quindi questo è un esempio molto realistico! Ecco un [elenco di errori di sistema comuni](https://nodejs.org/api/errors.html#errors_common_system_errors).

 Il vostro obiettivo: catturare un errore!
---------------------------

L'argomento `fn` è una funzione che lancia un errore quando viene invocata. Catturare l'errore che viene lanciato quando si invoca `fn`.

I test passeranno finché la funzione viene chiamata e l'eccezione viene catturata.


CODICE: 
```
function catchError(fn) {
    try {
        fn();
    }
    catch (error) {
        console.log(`Error occured: More info --> ${error}`);
    }
}

module.exports = catchError;

```

1.  È buona norma essere specifici sul tipo di errore da catturare. Invece di catturare qualsiasi errore con il parametro `fn` del blocco catch, si può specificare il tipo di errore che `fn()` può lanciare.

2.  È anche una buona pratica gestire l'errore in modo da fornire un feedback utile all'utente. Invece di registrare un messaggio generico come "Si è verificato un errore", si può registrare il messaggio di errore effettivo o eseguire qualche altra azione appropriata.

Questa implementazione utilizza il blocco `catch` per catturare qualsiasi errore che `fn()` può lanciare e il parametro `error` per fare riferimento all'errore catturato. Il messaggio di errore viene quindi registrato nella console tramite `console.error()`, che fornisce ulteriori informazioni sull'errore.

È possibile personalizzare la gestione degli errori nel blocco `catch`, a seconda dei requisiti specifici dell'applicazione.

---


## Catch & Return (Cattura e restituzione dell'errore)

--------------
Quando viene lanciato un errore, si interrompe l'esecuzione del codice e si ritorna alla riga in cui l'errore è stato **catturato**.

Supponiamo di avere una funzione `main` che chiama `writeLogs` che poi chiama `writeLogFile`:

```
function writeLogFile(id, contents) {
    // scrive un file di log nel nostro file system
    writeFile(`logs/${id}`, contents);
}

```

Se `writeFile` lancia un errore, uscirà completamente dal programma se non viene catturato da qualche parte.

![Exit](https://res.cloudinary.com/divzjiip8/image/upload/v1579112328/Frame_1_76_ldueu6.png)

Invece, possiamo catturare l'errore e restituire `false` da `writeLogFile` se l'errore viene lanciato. 

In questo modo, `writeLogs` può continuare a scrivere il resto dei file di log.

```
function writeLogFile(id, contents) {
    try {
        writeFile(`logs/${id}`, contents);
    }
    catch(ex) {
        return false;
    }
    return true;
}

```

Ora il nostro `writeLogFile` indica se è riuscito a scrivere il file, se restituisce `true`. Se non è riuscito a scrivere il file, restituisce `false`. Il nostro `writeLogFile` può determinare cosa fare da lì.

> È importante sapere quali metodi possono lanciare errori. Poi si dovrà decidere dove catturare gli errori, in base al comportamento che ci si aspetta dal codice!


----------------------------------

Modificare `catchError` in modo da **restituire l'errore** se esso viene lanciato.

Se non viene lanciato alcun errore, restituire `false`.

```

function catchError(fn) {
    try {
        fn();
    }
    catch (error) {
        return error;
    }

    return false;
}

module.exports = catchError;

```

--- 

## Errori su JavaScript 

Ci sono molti errori che possono essere lanciati dal linguaggio JavaScript stesso.

Ecco un esempio di errore lanciato da JavaScript:

```
const x = 3;

x();
```

In questo esempio, x è un numero e non può essere invocato! Verrà quindi lanciato un TypeError.


Esploriamo ora i diversi tipi di errori di run-time di JavaScript.


## TypeError: Errore inerente al tipo variabile
----------

Viene comunemente lanciato quando la variabile non è del tipo previsto per l'operazione. Ecco un paio di esempi:

```
const x = 3;

x();

```

 Lancia un `TypeError: x non è una funzione`.

```
let b;

b.prop;

```

 Lancia `TypeError: Impossibile leggere la proprietà 'prop' di undefined`.

## Errore di riferimento
---------------

Viene lanciato nei casi in cui la variabile non è definita. Più tecnicamente, il riferimento non può essere trovato:

```
z();

```

 Lancia `ReferenceError: z is not defined`.

## Errore di sintassi
------------

Viene lanciato nei casi in cui il codice non è JavaScript valido:

```
const a = 3;

a.72;

```

 Lancia `SyntaxError: Numero inaspettato`.

> Se si usa un [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) come Babel JS, questo codice potrebbe non passare la fase di compilazione a causa di una sintassi non valida.

## Errore di intervallo
-----------

Viene lanciato quando a una funzione viene passato un valore che non rientra nell'intervallo di valori accettato. Per esempio, un inizializzatore di array:

```
nuovo Array(Infinito)

```

 Lancia `RangeError: Lunghezza dell'array non valida`.


 --- 

 