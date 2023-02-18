Conversione del tipo
---------------

La conversione di tipo descrive quando un valore cambia tipo. Ad esempio, quando una stringa diventa un numero o viceversa.

Esistono alcuni modi **espliciti** per cambiare il tipo di un valore. Si tratta di metodi ovvi e mirati a cambiare il tipo.

```
// conversione esplicita
const a = (1).toString();
console.log(a); // 1
console.log(typeof a); // stringa

```

Esistono anche molti modi **impliciti** per cambiare il tipo di un valore. Poiché JavaScript è un linguaggio a tipizzazione libera, fa del suo meglio per assumere il comportamento che il programmatore potrebbe aspettarsi.

```
// conversione implicita
const b = "3" + "4";
console.log(b); // 34
console.log(typeof b); // numero

```

Approfondiremo questi esempi e molti altri con alcuni esercizi codice. 

---

## Da stringhe a numeri

Da stringhe a numeri
------------------

In JavaScript esistono diversi modi per convertire una stringa in un numero. Il primo è la conversione **esplicita**:

```
const string = "2"
console.log(Number(string)); // 2

const string = "ciao"
console.log(Numero(string)); // NaN

```

> È anche possibile convertire le stringhe in numeri con `parseInt` e `parseFloat`. Si tenga presente che questi due metodi alla fine della stringa.

Esiste anche una conversione **implicita**:

```
const string = "2";
console.log(+string); // 2

const string2 = "ciao";
console.log(+string2); // NaN

```

Si può notare che con l'operatore `+` la stringa viene implicitamente convertita in un numero.

> La pratica migliore è quella di usare una conversione **esplicita** nella maggior parte dei casi. La conversione esplicita renderà evidenti le vostre intenzioni alle altre persone quando rivedranno o manterranno il vostro codice!

---

## ParseInt e ParseFloat
-----------------------

Le stringhe possono essere convertite in numeri con `parseInt` e `parseFloat`. Queste funzioni non solo convertono i numeri, ma tagliano ogni carattere non numerico in più alla fine:

```
const result = parseInt("12px");

console.log(risultato); // 12

```

Questo metodo funziona solo con i caratteri non numerici alla **fine della stringa**. Se la stringa inizia con caratteri non numerici, restituirà `NaN`:

```
const result = parseInt("abc123");

console.log(risultato); // NaN

```

> NaN è l'acronimo di "Not A Number" (non è un numero) e per saperne di più si può consultare la [MDN Documentation] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN). In modo forse un po' strano, `typeof NaN` valuterà `"number"`.

Una differenza tra le funzioni `parseInt` e `parseFloat` appare quando si lavora con numeri in **punto mobile**:

```
const float = 12.24;

console.log(parseInt(float)); // 12

console.log(parseFloat(float)); // 12.24

```

 Come si potrebbe sospettare, `parseFloat` analizza correttamente i numeri a virgola mobile **float**.

### TypeOf
------

L'operatore `typeof` è un modo comodo per verificare il tipo di un valore.

È più facile dimostrarlo con alcuni esempi:

```
console.log( typeof 1 ); // numero
console.log( typeof "1" ); // stringa
console.log( typeof {} ); // oggetto

```

### Esercizio Obiettivo: convertire una stringa in numero
-----------------------------

Data una stringa, convertirla in un numero.

Se la stringa non è un numero, restituire `0`.

> Si può capire se la stringa non è un numero se si converte in `NaN`. Può essere utile sapere che `NaN` è falso.



--- 

```

function toNumber(string) {
    const num = parseInt(string);
    return typeof num === "number" && !isNaN(num) ? num : 0;
}




```


1.  `typeof num === "number"` controlla se il tipo di `num` è "number". Questo è importante perché `parseInt()` può restituire `NaN` per le stringhe che non possono essere analizzate come numeri interi, il che non è un tipo di numero.
2.  `!isNaN(num)` controlla se `num` non è NaN (Not a Number). Questo serve a gestire i casi in cui `parseInt()` restituisce NaN per stringhe di input non valide.
3.  `? num : 0` è un operatore ternario che restituisce `num` se entrambe le condizioni sono vere e `0` altrimenti. È un modo più breve per scrivere un'istruzione `if`.

Mettendo tutto insieme, l'istruzione `return` restituisce `num` se è un numero valido, come determinato dalle due condizioni, o `0` altrimenti.

Per esempio, se `parseInt()` restituisce `NaN`, il tipo di `num` sarà `"number"` ma `!isNaN(num)` sarà `false`, quindi la funzione restituirà `0`. Se `parseInt()` restituisce un numero valido, entrambe le condizioni saranno `true` e la funzione restituirà quel numero.

--- 

## Da valori a stringhe 

Di contro, possiamo convertire i valori in stringhe.

Esistono diversi modi per convertire una stringa in JavaScript. Come visto prima, ci sono metodi **espliciti**:

```
const a = 123;

console.log(a.toString()); // "123"
console.log(String(a)); // "123"

console.log(false.toString()); // "false"

```

E poi ci sono le conversioni **implicite**:

```
console.log(123 + ""); // "123"
console.log(true + ""); // "true"

```

JavaScript fa del suo meglio per interpretare l'intenzione, **costringendo** questi valori a stringhe.

Va notato che se la stringa avesse un numero al suo interno, verrebbero comunque sommati come stringhe:

```
console.log(2 + "2"); // "22"

```

> Si noti che il risultato è `22` qui, non `4`! L'espressione `2 + 2` valuta `4`. Tuttavia, quando uno dei valori è una stringa, entrambi vengono prima convertiti in una stringa e poi uniti insieme.


CODICE ESEMPIO:

Dati due valori `a` e `b`, usa una funzione per combinarli insieme come stringhe e restituire il risultato. I valori possono essere un `number`, un `boolean` o una `string`.

> Tutti e 3 i tipi sopra menzionati hanno a disposizione il metodo `.toString()`.

```

function combineToString(a, b) {
    return a.toString() + b.toString();
}

module.exports = combineToString;

```

--- 

##  Conversione booleana
------------------

Quando si converte in booleani, i valori falsi vengono convertiti in falsi: `false`, `0`, `""`, `null`, `undefined` e `NaN`. 
Tutti gli altri valori sono convertiti in `true`.

Proprio come per la conversione di `numeri` e `stringhe`, possiamo convertire i `booleani` in modo esplicito:

```
console.log(Boolean(2)); // vero
console.log(Boolean("")); // falso

```


Le situazioni in cui i valori sono **implicitamente** convertiti in booleani includono i condizionali `if`:

```
if(3) {
    console.log('3 è vero!');
}

```

Questo codice eseguirebbe la `console.log` perché `3` è, in effetti, **veritiero**.


> L'operatore **logico NOT** (`!`) può essere usato per capovolgere un valore `vero` in `falso` e `viceversa`.

Quando ci si trova di fronte a valori non booleani, l'operatore li converte implicitamente prima in booleani e poi li capovolge:

```
console.log(!3); // falso
console.log(!""); // vero

```

Un altro modo per passare da un valore non booleano al suo corrispondente valore booleano è usare due volte l'operatore `!!`:

```
console.log(!!3); // vero
console.log(!!"); // falso

```


 Il vostro obiettivo: è vero?
-------------------------

Dato un valore `a` restituire se il valore è vero o no.

> Ricordate che i valori veritieri sono qualsiasi valore, esclusi i valori falsi: `false`, `0`, `""`, `null`, `undefined` e `NaN`.


```
function isTruthy(a) {
    return !!a;
}

```


Questa implementazione utilizza l'operatore di doppia negazione (`!!`) per forzare il valore di input `a` in un valore booleano. L'operatore di doppia negazione converte qualsiasi valore nel suo equivalente booleano. Lo fa convertendo prima il valore di input in un valore vero o falso e poi invertendo due volte quel valore per ottenere il risultato booleano. In particolare, l'operatore di doppia negazione esegue le seguenti operazioni:

1.  Se `a` è un valore vero, viene convertito nel valore `true` dalla prima negazione.
2.  La seconda negazione inverte `true` in `false`.
3.  Se `a` è un valore falso, viene convertito nel valore `false` dalla prima negazione.
4.  La seconda negazione inverte `false` in `true`.

Pertanto, la funzione `isTruthy()` restituisce `true` se il valore di input `a` è vero e `false` se è falso.




## Operatore di uguaglianza e di identità
------------

Nelle lezioni precedenti abbiamo discusso l'operatore di uguaglianza rigorosa `===`. Sappiamo che questo operatore confronta due valori e restituisce se sono uguali o meno.

Per esempio:

```
console.log(3 === 3); // vero
console.log("mela" === "arancia"); // falso

```

Quando i valori sono di tipo diverso, l'operatore `===` valuterà sempre false:

```
console.log("2" === 2); // falso

```

Tuttavia, l'operatore di confronto loose equals, o vaga uguaglianza, `==` tenterà la conversione di tipo per confrontare i valori!

```
console.log("2" == 2); // true

```

> Molti scoraggiano l'uso di `==` in generale. Innanzitutto è **meno performante** perché richiede di cambiare il tipo di valore. Inoltre, può portare a risultati confusi in alcuni casi in cui la conversione di tipo è inaspettata.

---

## Da oggetto a JSON

JavaScript Object Notation, o **JSON**, è un formato per il trasferimento di dati JavaScript.

Non preoccupatevi! È molto simile alla sintassi degli oggetti a cui siamo già abituati, ma in forma di stringa.

Vediamo un po' di JSON:

```
const persona = '{"nome": "Jim"}';

```

Il valore memorizzato in `persona` è una stringa! Assomiglia un po' a un oggetto e, in effetti, può essere facilmente trasformato.

Il vantaggio di JSON è che possiamo usarlo per inviare dati attraverso una **rete**. 

Possiamo ottenere lo stesso JSON usando `JSON.stringify` su un oggetto esistente:

```
const persona = JSON.stringify({nome: "Jim" });

console.log(person); // {"name": "Jim"}

```
 Il risultato è lo stesso del JSON creato nel primo esempio.


 Il vostro obiettivo: JSON
-------------------

Dato un oggetto, trasformarlo in JSON e restituire la stringa risultante.

```
function toJSON(obj) {
    return JSON.stringify(obj);
}

```

---

JSON valido
----------

Nell'ultima fase ci siamo concentrati sulla trasformazione di un oggetto in JSON. Possiamo anche fare l'**inverso**, trasformando un JSON in un oggetto.

Supponiamo che un'altra macchina ci abbia inviato JSON attraverso una rete:

```
const itemJSON = `{
    "tipo": "cibo",
    "commestibile": true,
    "quantità": 2
}`

```

> Si noterà che le chiavi `type`, `edible` e `quantity` sono tutte tra doppi apici. Questo è richiesto in JSON. Senza di essa, questo non sarebbe un JSON valido.

 Possiamo analizzare il JSON di cui sopra per trasformarlo in un oggetto:

```
const item = JSON.parse(itemJSON);

console.log(item.type); // cibo
console.log(item.edible); // true

```

Ora possiamo usare l'operatore `.` come con qualsiasi altro oggetto JavaScript!


 Obiettivo: creare JSON valido
-----------------------------


### Codice Esempio 

Creiamo un JSON che possa essere analizzato in un oggetto persona con 3 proprietà:

- **nome**: con un valore `stringa` qualsiasi
- **age**: con un qualsiasi valore `number
- **isReal**: con un qualsiasi valore `booleano`.


```
const personJSON = `
    { 
        "name": "Satoshi Nakamoto",
        "age": 0,
        "isReal": false
    } 
`;

```

--- 
Un esempio di parsing del `personJSON` dovrebbe funzionare così:

```
const persona = JSON.parse(personJSON);

console.log(person.name); // "Harry Potter"
console.log(person.age); // 18 anni
console.log(person.isReal); // false

```


> JSON può essere piuttosto rigido nella sintassi! Se si ottiene `SyntaxError: Unexpected token`, meglio consultare le regole JSON su [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)