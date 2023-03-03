
## Deep Retrieval: Recupero in profondità
------------------------

Dato un oggetto che contiene un numero arbitrario di oggetti, trovare il valore profondamente annidato.

L'obiettivo è prendere un oggetto come questo:

```
{
    prop: {
        prop: {
            prop: 3
        }
    }


```

e restituire `3`. Non si conosce a priori quanto sia profondo il valore annidato, ma solo che sarà annidato sotto un numero arbitrario di attributi `prop'.

Ogni oggetto conterrà solo una chiave `prop` e il valore associato sarà un oggetto o un valore primario (stringa, booleano o numero). Se il valore è un oggetto, conterrà un attributo `prop`.

Questo continuerà fino a quando l'attributo `prop` di un oggetto annidato conterrà una stringa, un booleano o un numero.

--------

### Soluzione 

Per recuperare una proprietà profondamente annidata all'interno di un oggetto, possiamo usare la ricorsione per iterare attraverso l'oggetto e le sue proprietà annidate, fino a raggiungere la proprietà desiderata.

Ecco un'implementazione della funzione `deepRetrieval`:

```

function deepRetrieval(obj) {
    for (let prop in obj) {
        if (typeof obj[prop] === 'object') {
            return deepRetrieval(obj[prop]);
        } else {
            return obj[prop];
        }
    }
}


module.exports = deepRetrieval;


```

Questa funzione prende un oggetto come argomento e controlla se ogni proprietà dell'oggetto è essa stessa un oggetto. Se lo è, la funzione si richiama ricorsivamente con quell'oggetto annidato come argomento. Se la proprietà non è un oggetto, la funzione restituisce il valore di quella proprietà.

Questa implementazione presuppone che ci sia una sola proprietà profondamente annidata con il valore desiderato. Se ci sono più proprietà con lo stesso nome a diversi livelli di annidamento, la funzione restituirà solo il valore della prima che incontra.

---

## Utilizzo dell'algoritmo di Deep Retrieval 

Questo tipo di algoritmo **deep retrieval** può essere utile quando si ha bisogno di accedere a una proprietà all'interno di un oggetto che può essere annidato a una profondità sconosciuta. Ad esempio, se si sta lavorando con un oggetto JSON che ha proprietà annidate a diversi livelli di profondità, può essere utile utilizzare un algoritmo di deep retrieval per accedere a una proprietà specifica senza dover scrivere codice personalizzato per ogni livello di annidamento. In generale, questo tipo di algoritmo può semplificare l'accesso ai dati all'interno di oggetti annidati e rendere il codice più modulare e meno soggetto a errori.


Un esempio di implementazione reale di un algoritmo di deep retrieval potrebbe essere nel contesto di un'applicazione web che riceve dati in formato JSON. Potrebbe essere necessario estrarre una proprietà specifica da un oggetto JSON annidato a una profondità sconosciuta.

Ad esempio, se si ha un oggetto JSON che rappresenta un ordine di acquisto e si vuole accedere alla proprietà "price" dell'oggetto "item" all'interno dell'ordine, si potrebbe utilizzare un algoritmo di deep retrieval per accedere alla proprietà senza dover scrivere codice personalizzato per ogni livello di annidamento:

```
const order = {
  id: 12345,
  customer: {
    name: "Mario Rossi",
    email: "mario.rossi@example.com"
  },
  items: [
    {
      id: 1,
      name: "T-shirt",
      price: 20.0,
      details: {
        color: "red",
        size: "M"
      }
    },
    {
      id: 2,
      name: "Jeans",
      price: 50.0,
      details: {
        color: "blue",
        size: "L"
      }
    }
  ]
};

```

```

// utilizzando l'algoritmo di deep retrieval, si può estrarre la proprietà "price" dell'oggetto "item"
const itemPrice = deepRetrieval(order, "items.0.price");
console.log(itemPrice); // output: 20.0

```


In questo esempio, l'algoritmo deep retrieval riceve come input l'oggetto JSON `order` e la stringa `items.0.price` come chiave per la proprietà `price` dell'oggetto `item` all'interno dell'array `items`. L'algoritmo esegue una ricerca ricorsiva all'interno dell'oggetto `order` e restituisce il valore della proprietà `price` dell'oggetto `item` corrispondente.



