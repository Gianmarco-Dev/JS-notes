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



## Obiettivo: sistemare il contesto

All'interno della funzione `Celebrity`, viene utilizzato un metodo per recuperare l'età della celebrità. Il secondo parametro di `fetchAge` è una funzione di callback. La funzione di callback riceverà `age` come argomento.

> Purtroppo, a causa del sito di chiamata della funzione, `this` sarà ridefinito per non riferirsi alla celebrità.
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

Nonostante le somiglianze con le classi, i prototipi sono molto diversi! In un certo senso, JavaScript cerca di rendere familiari i prototipi con parole chiave come `Class` e `new`. Guardando da vicino, vedremo perché questo può essere un po' ingannevole.

 Vale la pena notare che i prototipi sono il meccanismo alla base della parola chiave `Class` di ES2015. Approfondiremo il tema delle classi tra poco.

Se usati con la giusta comprensione, i prototipi sono una potente caratteristica del linguaggio. Vediamo perche'.


## Prototipi
----------

Molti linguaggi di programmazione hanno il concetto di **classe**. Le classi sono modelli per la creazione di oggetti chiamati **istanze**. Ogni istanza avrà il proprio insieme di proprietà chiamato **stato**. La classe fornisce i valori di stato iniziali e le funzioni copiate in ogni nuova istanza.

JavaScript **non** ha classi in senso tradizionale. Ha **prototipi**. Funzionano in modo simile, con alcune differenze fondamentali! In primo luogo, i prototipi forniscono un modo per condividere proprietà e funzioni, **collegando gli oggetti tra loro**. Ciò è contrario alle classi, che tradizionalmente copiano le funzionalità nelle nuove istanze.

> Si può pensare ai prototipi come a una catena di oggetti collegati.

## Catena di prototipi
---------------

Consideriamo un semplice esempio:

```
function Animal(name) {
    this.name = name;
}

const animal = new Animal("Bud");

```

`Animal` avrà già alcuni metodi disponibili: `valueOf`, `hasOwnProperty`, `toString` e altri ancora, a seconda dell'ambiente JavaScript. Da dove vengono questi metodi?

Vengono da [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype). È la parte superiore della catena di prototipi per ogni oggetto in JavaScript.

**Si noti che questi metodi non vengono creati ex novo per ogni oggetto! Sono in realtà gli stessi metodi:

```
const animal = new Animal("Bud");
const animal2 = new Animal("Lassie");

console.log(animal.hasOwnProperty === animal2.hasOwnProperty); // true

```

Per prima cosa, il motore JavaScript controlla se le istanze dell'animale hanno un metodo `hasOwnProperty`. Poi cercherà in `Animal.prototype`. In caso contrario, proseguirà verso `Object.prototype` e troverà il metodo lì.

Poiché sia `animal` che `animal2` fanno riferimento al metodo `hasOwnProperty` di `Object.prototype`, il riferimento è uguale e restituisce `true`.

### Esempio di sintassi
--------------

Vediamo come vengono usati tradizionalmente i prototipi:

```
function Auto(make, model) {
    this.make = make;
    this.model = model;
}

const car = new Car('Nissan', 'skyline');
const car2 = new Car('Honda', 'Civic');

console.log(car.make) // Nissan
console.log(car2.model) // Civic

```

Qui `Car` è solo una normale funzione JavaScript. Spesso ci si riferisce ad essa come a una funzione **costruttrice**, anche se non è assolutamente una funzione speciale! **La maiuscola è solo per convenzione**. La mettiamo in maiuscolo per indicare che intendiamo usarla con l'operatore `new`.

Utilizzando l'operatore `new` possiamo creare nuove **istanze** di `Car`. L'operatore `new` creerà un nuovo oggetto e lo imposterà a `this` all'interno della funzione `Car` dell'esempio precedente. Implicitamente, `new` restituirà anche questo oggetto (se non viene restituito nessun altro oggetto).

> In **Questa parola chiave** abbiamo analizzato le regole per il binding di `this`. L'uso di `new` è un'altra regola per il suo legame. In questo caso, la nuova istanza dell'auto viene usata per `this` nella funzione costruttore.

Entrambe le istanze di `Car` avranno le proprietà `make` e `model` e le memorizzeranno dagli argomenti passati nella chiamata al costruttore.




### Obiettivo: completare la funzione Shape
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
Per aggiungere una funzione di movimento alla classe `Shape`, possiamo utilizzare la parola chiave prototype e definire la funzione come metodo dell'oggetto prototype:

```
function Shape(x, y) {
    this.position = { x: x, y: y };
}

Shape.prototype.move = function(x, y) {
    this.position.x += x;
    this.position.y += y;
};

```

Nella funzione `move`, prendiamo due argomenti `x` e `y`. Quindi accediamo alla proprietà `position` dell'istanza `Shape` utilizzando `this.position` e aggiorniamo le sue proprietà `x` e `y` aggiungendo gli argomenti corrispondenti.

---


## Funzionalità di condivisione
---------------------

Passiamo a una nuova forma geometrica: `Circle`. La definizione è data nel file `Circle.js`.

Codice di partenza del file:

```
const Shape = require('./Shape');

function Circle(x, y, radius) {
    Shape.call(this, /* pass arguments to shape */);
    // store radius on this
}

module.exports = Circle;

```

La funzione `Circle` sarà simile a `Shape`. L'unica aggiunta è una nuova proprietà `radius`. Poiché questi prototipi saranno simili, invocheremo `Shape` nella nostra funzione `Circle`.

 Obiettivo: completare la funzione Circle
----------------------------------------

In `Circle.js`, sarà necessario fare due cose:

1.  Passare gli argomenti a `Shape` tramite [`call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

> Si noti che stiamo legando `Circle` con `this` usando `call`. In questo modo, quando `Shape` viene invocato, memorizzerà `x` e `y` sull'istanza di `Circle`!

1.  Memorizzare `radius` sulla nostra istanza `Circle`. Si può fare esattamente come abbiamo memorizzato `position` sulla classe `Shape`.

Il comportamento finale dovrebbe essere:

```
const circle = new Circle(5,10,15);

console.log(circle.position.x); // 5
console.log(circle.position.y); // 10
console.log(circle.radius); // 15

```


CODICE: 

```

const Shape = require('./Shape');

function Circle(x, y, radius) {
    Shape.call(this, x, y, radius);
        this.radius = radius;
}


module.exports = Circle;

```

In questo codice, stiamo definendo una classe `Circle` che estende la classe `Shape`. 
Per farlo, stiamo utilizzando la parola chiave `require` per importare la classe `Shape` da un file separato e poi stiamo utilizzando la funzione `call` per invocare il costruttore della classe `Shape` con i parametri `x`, `y`e `radius`. 
Assegnamo poi il parametro `radius` come una proprietà del cerchio con `this.radius = radius` e infine stiamo esportando la classe `Circle` tramite `module.exports`. In questo modo, la classe `Circle` sarà disponibile per essere utilizzata in altri file del nostro progetto.



## Linking o collegamento di Prototipi

------------------

Cosa succederebbe se provassimo a chiamare la funzione `.move` sulla nostra istanza `Circle` come nel codice sottostante?

```
const circle = new Circle(5,10,15);

circle.move(1,1); // cosa accade?

```


Probabilmente avremo un errore: `TypeError: circle.move is not a function`. 

Anche se usiamo la funzione `Shape` per memorizzare le variabili `x` e `y` sull'istanza `Circle`, **non ci siamo collegati al prototipo Shape**!

È qui che entra in gioco il fantastico metodo `Object.create`:

```
Circle.prototype = Object.create(Shape.prototype);

```

Ora il nostro prototipo di cerchio eredita i metodi dal prototipo di forma! Ogni nuovo cerchio avrà un metodo `move`.


> Object.create viene utilizzato per collegare i nostri prototipi all'interno della catena di prototipi.

Object.create
-------------

Il metodo [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) è un metodo molto comodo per collegare i nostri prototipi. Può collegare i prototipi con semplici oggetti JavaScript!

```
const car = {
    make: 'Nissan',
    model: 'skyline',
}

const skyline = Object.create(car);

console.log(skyline.make); // Nissan
console.log(skyline.model); // skyline

```

Per illustrare come questo sia semplicemente un collegamento di oggetti, consideriamo cosa accadrebbe se cambiassimo le proprietà dell'auto:

```
const car = {
    make: 'Nissan',
    model: 'Skyline',
}

const skyline = Object.create(car);

console.log(skyline.make) // Nissan

car.make = "Non Nissan"

console.log(skyline.make) // Non Nissan

```

Notate come quando abbiamo cambiato il prototipo di `skyline`, anche le sue proprietà sono cambiate. La proprietà `make` non esiste su `skyline` stessa. Esiste su `car` e `skyline` è semplicemente collegata a `car` tramite la catena dei prototipi. In sostanza, condividono questa proprietà.

Possiamo usare questo stesso metodo per collegare i prototipi degli oggetti, in modo che le nuove istanze abbiano una catena di prototipi più lunga:

```
function Shape(x,y) {
    this.position = { x,y }
}

function Circle(x, y, radius) {
    Shape.call(this, x, y);
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);


```

Impostando `Circle.prototype` al nuovo oggetto restituito da `Object.create`, lo colleghiamo anche a `Shape.prototype`. Ogni `new Circle()` erediterà ora metodi e proprietà da `Shape.prototype`, proprio come farebbe una `new Shape()`.


## Obiettivo: collegare i prototipi
-------------------------------

Usare `Object.create` per collegare `Circle.prototype` a `Shape.prototype`.

In questo modo, tutti i metodi di `Shape.prototype` saranno disponibili anche sulle nuove istanze di `Circle`. Per esempio, potremo usare `circle.move(1,1);` proprio come abbiamo fatto con l'istanza shape!


File Circle.js

```
const Shape = require('./Shape');

function Circle(x, y, radius) {
    Shape.call(this, x, y, radius);
        this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);


module.exports = Circle;

```


File Shape.js

```// Our Shape "Constructor"
function Shape(x, y) {
    // Store x and y in this.position
    this.position = { x: x, y: y };
}

Shape.prototype.move = function (x, y) {
    this.position.x += x;
    this.position.y += y;
};
 
module.exports = Shape;
```


---

## Creare un rettangolo
------------------------

È ora di creare il `Rectangle`. Troverete la definizione già pronta in `Rectangle.js` qui sotto:

```
const Shape = require('./Shape');

function Rectangle(x, y, height, width) {
    
}

module.exports = Rectangle;

```

 Obiettivo: completare il rettangolo
----------------------------------

Completiamo la funzione Rectangle e colleghiamo il suo prototipo al prototipo di Shape.
 Il rettangolo sarà uno `Shape` più un paio di proprietà: `height` e `width`. Queste le memorizzeremo nell'istanza di `Rectangle`.

```
const Shape = require('./Shape');

function Rectangle(x, y, height, width) {
  // Chiamiamo il costruttore di Shape per impostare la posizione x e y
  Shape.call(this, x, y);
  
  // Impostiamo l'altezza e la larghezza del rettangolo
  this.height = height;
  this.width = width;
}

// Collegamento del prototipo di Rectangle a quello di Shape
Rectangle.prototype = Object.create(Shape.prototype)

module.exports = Rectangle;
```

---


## Aggiungere un metodo Prototype 

È ora di aggiungere un metodo prototipo a `Rectangle`. Questo metodo avrà senso solo per i rettangoli, quindi lo aggiungeremo direttamente a `Rectangle.prototype`.

 Obiettivo: creare una funzione `flip`

Creare una funzione `flip` sul prototipo del rettangolo. Questa funzione cambierà le dimensioni di altezza e larghezza del rettangolo. Non accetta argomenti.

 Potrebbe essere necessario memorizzare una variabile temporanea per invertire le dimensioni.


Esempio:

```
const Shape = require('./Shape');

function Rectangle(x, y, height, width) {
  // Chiamiamo il costruttore di Shape per impostare la posizione x e y
  Shape.call(this, x, y);
  
  // Impostiamo l'altezza e la larghezza del rettangolo
  this.height = height;
  this.width = width;
}

Rectangle.prototype = Object.create(Shape.prototype)

Rectangle.prototype.flip = function() {
  var temp = this.height;
  this.height = this.width;
  this.width = temp;
};

```
In questo modo, stiamo definendo un nuovo metodo `flip` sul prototipo di `Rectangle`, che invertirà le proprietà `height` e `width` dell'istanza del rettangolo. Notare che stiamo memorizzando temporaneamente la vecchia altezza del rettangolo in una variabile `temp` prima di sovrascriverla con la nuova larghezza.

 NOTA: Bisogna fare attenzione a non dichiarare il metodo flip su `Rectangle.prototype` prima di usare `Object.create`. Il metodo `Object.create` restituisce un oggetto completamente nuovo a cui è possibile associare il metodo.




---


## Classi
-------

Le classi sono una feature relativamente nuova aggiunta a JavaScript con ES2015. Nonostante la novità, le classi non introducono alcun cambiamento fondamentale al linguaggio. Creano semplicemente una nuova interfaccia per **utilizzare i prototipi**.

```
// un esempio di classe Person
classe Person {
    constructor() {
        this.name = "Benjamin Button";
        this.age = 40;
    }
    haveBirthday() {
        // Benjamin Button was a curious case...
        this.age--;
    }
}

```

Le classi stanno guadagnando popolarità in JavaScript da quando sono state introdotte. Ad esempio, il popolare framework di front-end React indica l'uso di classi per la creazione di componenti.

Creiamo le classi `Hero` e `Warrior` per imparare a utilizzare questa funzione.


## Sintassi delle classi
------------

Le classi possono essere definite usando la parola chiave `class`, seguita dal nome e dalle parentesi graffe `{}`. All'interno di queste parentesi graffe si possono definire i metodi. Questi metodi possono essere personalizzati o possono configurarsi come **costruttori**.

Il **costruttore** è una funzione speciale che viene chiamata solo una volta per ogni nuova istanza. Cosa sono le istanze?

### Istanze
Le classi costituiscono il modello da cui mutuare il comportamento di nuovi oggetti. Questi nuovi oggetti sono chiamati istanze.

![Instances](https://res.cloudinary.com/divzjiip8/image/upload/v1571953441/Frame_1_31_sbhavg.png)
Questa immagine rappresenta il codice:

classe Team {
    constructor(name) {
        this.name = name;
    }
}

const team1 = new Team("Giants");
const team2 = new Team("Jets");

Sia `team1` che `team2` sono istanze di `Team`. Entrambe utilizzano la stessa funzione costruttore.

La differenza è che quando `team1` chiama il `constructor`, la parola chiave `this` è l'oggetto `team1`. Per `team2`, `this` sarebbe l'oggetto `team2`.

Il risultato del codice qui sopra è che `nome` è memorizzato nell'oggetto appropriato:

```
const team1 = new Team("Giants");
const team2 = new Team("Jets");

console.log(team1.name); // "Giants"
console.log(team2.name); // "Jets"

```


Una nota importante in JavaScript è che queste istanze fanno tutte riferimento allo stesso metodo creato sulla classe:

```
classe Hello {
    costruttore() {
        console.log('hello!');
    }
}

const h1 = new Hello(); // hello!
const h2 = new Hello(); // hello!

```

Sia `h1` che `h2` sono **istanze** di `Hello`. Quando viene creata un'istanza, viene richiamata la funzione `costruttore`.

Un costruttore è un ottimo posto per inizializzare le proprietà di un'istanza di classe. Lo si può fare utilizzando la parola chiave `this`, che è l'**istanza**:

```
classe Team {
    costruttore() {
        this.sport = "football";
    }
}

const t1 = new Team();
console.log(t1.sport); // football

```


---



La proprietà `sport` è memorizzata nell'istanza di `Team`, inizializzata a "soccer".

 Il vostro obiettivo: la salute dell'eroe
-----------------------

Nella funzione del costruttore, aggiungere una proprietà `health` a un'istanza dell'eroe e impostarla a `50`.

Quando si crea un nuovo eroe, dovrebbe funzionare così:

```
const hero = new Hero();

console.log(hero.health); // 50

```