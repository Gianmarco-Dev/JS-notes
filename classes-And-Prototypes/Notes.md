## This, la parola chiave in JavaScript

---

In JavaScript è sempre possibile accedere alla parola chiave `this`. È un modo per definire il **contesto** di una funzione.

In ambito globale (non all'interno di una funzione), `this` si riferisce al modulo stesso all'interno di Node.js o alla `finestra` all'interno del browser.

Per quanto riguarda le funzioni, `this` può essere impostato in diversi modi. Concentriamoci prima sul modo in cui possiamo impostarlo esplicitamente.

```
funzione sum() {
    return this.a + this.b;
}

```

Se dovessimo eseguire direttamente `sum()`, `this` verrebbe impostato dall'ambito globale e probabilmente né `a` né `b` sarebbero definiti.

Potremmo invece `chiamare' la funzione con uno specifico **contesto**:

```
const result = sum.call({ a: 2, b: 4 });

console.log(result); // 6

```

Il metodo `call` è disponibile per tutte le funzioni JavaScript. Il primo argomento passato a `call` diventa `this` all'interno della funzione.

> Un altro metodo che manipola il contesto di una funzione è `apply`.

    Call vs Apply

---

Call e Apply sono metodi molto simili. Esistono entrambi in ogni funzione JavaScript e consentono di impostare il **contesto** `this`.

La differenza nasce quando si vogliono passare degli argomenti alla funzione:

```
function totalThings(a, b, c) {
    return `There are ${a + b + c} ${this}`;
}

```

Diciamo che vogliamo che questa stringa sia: "Ci sono 15 studenti". Ci sono due modi per farlo. Potremmo usare `call`:

```
totalThings.call("Students", 10, 3, 2);

```

Oppure possiamo usare `apply`:

```
totalThings.apply("Students", [10, 3, 2]);

```

In entrambi i casi, `this` è impostato su "Students" e gli argomenti `a`, `b` e `c` sono rispettivamente i valori `10`, `3` e `2`.

La differenza è che `call` accetta un elenco di argomenti, mentre `apply` accetta un singolo array di argomenti.

## Obiettivo: ottenere il nome

Creare una funzione che recuperi la proprietà `nome` su `this`.

```
function thisName() {
    return this.name;
}

```

---

## Bindare This

---

Invece di fare affidamento sul fatto che una funzione venga chiamata con il `this` corretto al momento dell'invocazione, possiamo eseguire il **binding** delle funzioni:

```
function thisName() {
    return this.name;
}

const newFunction = thisName.bind({ name: 'Ted' });

console.log(newFunction()); // Ted
console.log(thisName()); // undefined

```

Notate che `bind` non cambia la natura della funzione originale ma crea una nuova funzione, legata alla funzione fornita `this`.

Una volta che una funzione è legata, il legame **non può essere sovrascritto**. Supponiamo di aver provato a legare `newFunction` da sopra:

```
const newFunction2 = newFunction.bind({ name: 'Walt' });

console.log(newFunction2()); // Ted

```

> Il metodo `bind` puo' anche vincolare argomenti a una funzione!

## Argomenti vincolati

È possibile legare argomenti a una funzione per creare funzioni parzialmente applicate:

```
funzione add(x, y) {
    return x + y;
}

```

Non è una funzione molto eccitante di per sé, ma possiamo legare un argomento a `add` per creare un nuovo tipo di funzione:

```
const addTwo = add.bind(null, 2);

console.log( addTwo(2) ); // 4
console.log( addTwo(10) ); // 12

```

Piuttosto pulito e molto funzionale.

---

## ESERCIZIO

Creare una nuova funzione da `thisName` che sia legata a un oggetto con il `nome` "Bob".

Quando viene chiamata, deve restituire "Bob".

```
function thisName() {
    return this.name;
}

const newFunction = thisName.bind({name: 'Bob'})
module.exports = newFunction;
```

---

## Call-Site o Sito di chiamata

---

Senza impostare esplicitamente `this` con `call` o `apply`, ci sono alcune regole che dettano quale sarà `this` per una funzione.

Queste regole dipendono dal modo in cui la funzione viene chiamata. Vediamo una funzione definita come proprietà di un oggetto:

```
const obj = {
    value: 2,
    getValue: function() {
        return this.value;
    }
}

```

A seconda di _come_ chiamiamo `getValue`, il risultato potrebbe essere **molto diverso**:

```
console.log( obj.getValue() ); // 2

```

Abbiamo chiamato la funzione accedendo alla proprietà dell'oggetto. La parola chiave `this` è implicitamente legata all'oggetto su cui viene chiamata.

Vediamo un altro esempio utilizzando lo stesso `obj`:

```
const fn = obj.getValue;

console.log( fn() ); // undefined

```

Ops!

In questo secondo esempio, `this` non è l'oggetto stesso. In realtà è il globale `this`. Senza essere chiamato direttamente sull'oggetto, `this` non è affatto vincolato!

> Il luogo in cui la funzione viene chiamata è generalmente indicato come il **sito di chiamata** della funzione. Se la funzione non è altrimenti vincolata, determinerà il valore di `this`.

## ESERCIZIO: Aggiungere il nome Get

Aggiungere una funzione `getName` a `obj` che recupera il `name` quando viene chiamata su un oggetto.

Per esempio:

```
const obj = {
    name: 'Bob',
    getName: function(){
        return this.name;
    }
}

module.exports = obj;

```

---

## Funzione Unbound

---

In JavaScript è spesso utile definire funzioni all'interno di altre funzioni. In questi casi, tenere traccia del contesto vincolato può essere piuttosto complicato.

> Questo comportamento si verifica spesso nella programmazione asincrona. Asincrono significa che il codice può essere eseguito in un momento successivo, a seconda di elementi quali animazioni, chiamate di rete o interazioni dell'utente. Vedremo questo aspetto più da vicino successivamente quando parleremo di **Funzioni di callback**.

Vediamo un esempio:

```
const year = (1000 * 60 * 60 * 24 * 365);

function addYear() {
    setTimeout(function() {
        this.age++;
    }, YEAR);
}

const person = { name: 'Fred', age: 29 }

addYear.call(person);

```

Questa funzione dovrebbe essere eseguita dopo un anno, incrementando l'età di Fred. Tuttavia, quando la funzione _finalmente_ viene eseguita, `this` non viene impostato sulla persona. La funzione passata a `setTimeout` non è legata allo stesso `this` e viene impostata come default al `this` globale.

Se si vuole risolvere il problema, ci sono diversi modi:

1. Chiusura o Closure

Un modo comune per risolvere i problemi di contesto in JavaScript è quello di catturare il valore di `this` all'interno di un ambito di funzione. In questo modo si può fare riferimento alla nuova variabile sapendo che non è cambiata:

```
function addYear() {
    const that = this;
    setTimeout(function() {
        that.age++;
    }, YEAR);
}

```

Questo definisce `that` che cattura il contesto `this` all'interno dello scope `addYear`. Poi usiamo `that` per incrementare l'età.

2. Legare la funzione

Proprio come abbiamo fatto nella fase 2, possiamo legare la funzione all'interno di `setTimeout`. Vediamo come funziona:

```
function addYear() {
    setTimeout(function() {
        this.age++;
    }.bind(this), 1);
}

```

Usiamo `.bind` per creare una nuova funzione da quella passata a `setTimeout`. Questa nuova funzione è legata allo stesso contesto della funzione `addYear`. 

3. Sintassi a freccia o Arrow Syntax
------------

Esiste un altro modo di definire le espressioni di funzione, denominato "sintassi a freccia". La differenza tra la sintassi a freccia e la sintassi tradizionale delle funzioni sta nel comportamento con `this`. La sintassi a freccia cattura il contesto della funzione circostante:

```
function addYear() {
    setTimeout(() => {
        this.age++;
    }, YEAR);
}

```

Cambiando semplicemente da `funzione() { }` a `() => {}`, possiamo risolvere il problema del contesto!

> Le funzioni freccia sono una nuova caratteristica del linguaggio nelle ultime versioni di JavaScript. Quando si lavora con browser o ambienti JavaScript più vecchi, questa caratteristica potrebbe non essere disponibile. Ora è disponibile nella maggior parte degli ambienti moderni.



## Il vostro obiettivo: sistemare il contesto

All'interno della funzione `Celebrity`, viene utilizzato un metodo per recuperare l'età della celebrità. Il secondo parametro di `fetchAge` è una funzione di callback. La funzione di callback riceverà `age` come argomento.

> Purtroppo, a causa del sito di chiamata della funzione, `this` sarà ridefinito per non riferirsi alla celebrità. Eseguendo i test senza modificare il codice si otterrà un `TypeError`.

Sistemare `this.age` per fare riferimento allo stesso `this` della funzione `Celebrity`.


Codice di partenza:

```
const fetchAge = require('./fetchAge');

function Celebrity(name) {
    this.name = name;

    fetchAge(this.name, function (age) {
        this.age = age;
    });
}


```

Versione corretta:

```
function Celebrity(name) {
    this.name = name;

    fetchAge(this.name, function (age) {
        this.age = age;
    }.bind(this)); // Impostiamo "this" all'interno della callback con il metodo "bind()"
}


```

---


## JavaScript Prototypes
I prototipi JavaScript sono una funzione importante, anche se spesso incompresa. Possono essere molto utili per creare molte istanze di oggetti con funzionalità collegate e riutilizzabili. Spesso vengono paragonati alle classi in altri linguaggi di programmazione orientati agli oggetti.

Nonostante le somiglianze con le classi, i prototipi sono molto diversi! In un certo senso, JavaScript cerca di rendere familiari i prototipi con parole chiave come Class e new. Guardando da vicino, vedremo perché questo può essere un po' ingannevole.

 Vale la pena notare che i prototipi sono il meccanismo alla base della parola chiave `Class` di ES2015. Approfondiremo il tema delle classi tra poco.

Se usati con la giusta comprensione, i prototipi sono una potente caratteristica del linguaggio. Vediamo perche'.


## Prototipi
----------

Molti linguaggi di programmazione hanno il concetto di **classe**. Le classi sono modelli per la creazione di oggetti chiamati **istanze**. Ogni istanza avrà il proprio insieme di proprietà chiamato **stato**. La classe fornisce i valori di stato iniziali e le funzioni copiate in ogni nuova istanza.

JavaScript **non** ha classi in senso tradizionale. Ha **prototipi**. Funzionano in modo simile, con alcune differenze fondamentali! In primo luogo, i prototipi forniscono un modo per condividere proprietà e funzioni, **collegando gli oggetti tra loro**. Ciò è contrario alle classi, che tradizionalmente copiano le funzionalità nelle nuove istanze.

> Si può pensare ai prototipi come a una catena di oggetti collegati.

### Catena di prototipi
---------------

Consideriamo un semplice esempio:

```
function Animal(name) {
    this.name = name;
}

const animal = new Animal("Bud");

```

L'animale avrà già alcuni metodi disponibili: `valueOf`, `hasOwnProperty`, `toString` e altri ancora, a seconda dell'ambiente JavaScript. Da dove vengono questi metodi?

Vengono da [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype). È la parte superiore della catena di prototipi per ogni oggetto in JavaScript.

**Si noti che questi metodi non vengono creati ex novo per ogni oggetto! Sono in realtà gli stessi metodi:

```
const animal = new Animal("Bud");
const animal2 = new Animal("Lassie");

console.log(animal.hasOwnProperty === animal2.hasOwnProperty); // true

```

Per prima cosa, il motore JavaScript controlla se le istanze dell'animale hanno un metodo `hasOwnProperty`. Poi cercherà in `Animal.prototype`. In caso contrario, proseguirà verso `Object.prototype` e troverà il metodo lì.

Poiché sia `animal` che `animal2` fanno riferimento al metodo `hasOwnProperty` di `Object.prototype`, il riferimento è uguale e restituisce `true`.

Esempio di sintassi
--------------

Vediamo come vengono usati tradizionalmente i prototipi:

```
function Auto(make, model) {
    this.make = make;
    this.model = model;
}

const car = new Car('Toyota', 'Camry');
const car2 = new Car('Honda', 'Civic');

console.log(car.make) // Toyota
console.log(car2.model) // Civic

```

Qui `Car` è solo una normale funzione JavaScript. Spesso ci si riferisce ad essa come a una funzione **costruttrice**, anche se non è assolutamente una funzione speciale! **La maiuscola è solo per convenzione**. La mettiamo in maiuscolo per indicare che intendiamo usarla con l'operatore `new`.

Utilizzando l'operatore `new` possiamo creare nuove **istanze** di `Car`. L'operatore `new` creerà un nuovo oggetto e lo imposterà a `this` all'interno della funzione `Car` dell'esempio precedente. Implicitamente, `new` restituirà anche questo oggetto (se non viene restituito nessun altro oggetto).

> In **Questa parola chiave** abbiamo analizzato le regole per il binding di `this`. L'uso di `new` è un'altra regola per il suo legame. In questo caso, la nuova istanza dell'auto viene usata per `this` nella funzione costruttore.

Entrambe le istanze di `Car` avranno le proprietà `make` e `model` e le memorizzeranno dagli argomenti passati nella chiamata al costruttore.




Obiettivo: completare la funzione Shape
---------------------------------------

La funzione `Shape` accetta due argomenti: `x` e `y`. Memorizza questi valori in un oggetto `position` sull'istanza (`this`).


La `posizione` dovrebbe avere le chiavi `x` e `y` contenenti i valori corrispondenti:

```
const shape = new Shape(5, 10);

console.log(shape.position.x) // 5
console.log(shape.position.y) // 10

```
CODICE:

```
// Our Shape "Constructor"
function Shape(x, y) {
    // Store x and y in this.position
    this.position = { x: x, y: y };
}

module.exports = Shape;

```


---


