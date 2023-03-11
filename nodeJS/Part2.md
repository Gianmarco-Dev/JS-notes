## Avviare un server NodeJS

Possiamo avviare un server in Node.js abbastanza semplicemente utilizzando il modulo http incorporato:

```
const http = require('http');

const server = http.createServer(function(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
});

server.listen({ port: 3000, host: 'localhost' }, function() {
  console.log('Server is running!');
});

```

Prendi questo codice, salvalo in un file chiamato `index.js`.

Successivamente, esegui `node index` da un terminale situato nella directory. Dovresti vedere il messaggio `"Server is running!"` registrato.

Infine, puoi andare nel tuo browser e digitare `http://localhost:3000/` nella barra degli indirizzi del browser per vedere la risposta `"Hello World"` in testo. Fantastico!

Possiamo fare di meglio! Analizziamo questo un po' più nel dettaglio.

> Quando avvii il server, continuerà ad eseguirsi, in attesa di nuove richieste. Se vuoi interrompere il processo, premi `CTRL + C` nel tuo terminale. Dovrai riavviare il server se vuoi apportare modifiche. In alternativa, puoi utilizzare [nodemon](https://www.npmjs.com/package/nodemon) per riavviare automaticamente il server in caso di modifiche al tuo codice!

## Creazione del server
--------------------

```
const server = http.createServer(function(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
});
```

La `function` nel codice sopra viene eseguita ogni volta che una nuova macchina si connette al nostro server. Quando una macchina si connette al nostro server, si dice che fa una richiesta. L'oggetto `request` conterrà tutte le informazioni sulla macchina che si connette e sulla richiesta di dati o azione.

> Se sei curioso di sapere cosa dice il tuo browser su di te, vai avanti e `console.log(request.headers)` per vedere ciò che un server vede quando ti connetti ad esso. Vedrai le tue informazioni di connessione e i cookie localhost.

La risposta è ciò che il server invia alla macchina che ha effettuato la richiesta (la macchina richiedente viene comunemente indicata come client).

La prima cosa che stiamo facendo è impostare uno `statusCode`:

```
response.statusCode = 200;

```

Questo codice di stato significa "OK", indicando una richiesta HTTP di successo. Il server lo invia al client in modo che sappiano che tutto sta funzionando come dovrebbe. 
Qualsiasi codice di stato nella gamma 200 indica un tipo di richiesta di successo.

Puoi trovare l'elenco completo dei codici di stato HTTP e le loro descrizioni su [Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields).

Successivamente stiamo impostando una intestazione:

```
response.setHeader ('Content-Type', 'text / plain'); 
```

Le **intestazioni** vengono utilizzate per definire richieste e risposte. Ci sono molti tipi comuni di intestazioni che ci si aspetta da parte del browser Web e del front-end developer. L'intestazione `Content-Type` dice specificamente al browser come renderizzare le informazioni in arrivo.

Proprio come i codici di stato, puoi trovare un elenco di campi di intestazione HTTP standard su [Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields).

Infine, aggiungiamo le informazioni che stiamo inviando:
```
response.end ('Hello World'); 
```

Il metodo `end` sulla risposta indica che abbiamo finito di aggiungere informazioni alla risposta. **A questo punto, il server può rispondere alla richiesta del client**. In questo metodo possiamo anche aggiungere al corpo della risposta, che è la parte principale della risposta. Quando serviamo una pagina HTML, il corpo sarà la pagina HTML stessa. Le intestazioni descrivono semplicemente ciò che sta arrivando.

=====
## Listen
=====
Ora che abbiamo creato il server, dobbiamo dirgli come ascoltare le richieste:

```
server.listen ({port: 3000, host: 'localhost'}, function () { console.log ('Il server è in esecuzione!'); }); 
```

In questo codice stiamo dicendo al server di ascoltare la `porta 3000` sul nostro `localhost`. Quando questa connessione è pronta, attiverà la funzione che registra "Il server è in esecuzione!".

La porta ci consente di creare connessioni a diversi processi sulla nostra macchina. Potremmo eseguire due diversi server node sul nostro computer semplicemente specificando porte diverse. Ad esempio, potremmo utilizzare 3000 per uno e 3001 per un altro.

Se si utilizza una porta già in uso in Node.js, verrà restituito un errore `EADDRINUSE` quando si cerca di ascoltare la porta.

Le porte possono essere qualsiasi numero intero non firmato da `0` a `65535`. Alcune porte sono comunemente riservate per determinati processi. È diventata pratica comune nello sviluppo web utilizzare la porta `3000` come porta del server e incrementare da lì. Alcuni processi di compilazione cercheranno la porta aperta più vicina dopo 3000.

Puoi visitare questo [articolo](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports) per un elenco di porte ben note.

----

=======
## HTML NODE SERVER
=======

Un aspetto dei server web è che solitamente servono pagine HTML, che è ciò che un utente vede quando visita un sito web.

Come possiamo prendere il server web che abbiamo scritto nella lezione precedente e farlo servire HTML?

```
const http = require('http');

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end("Hello World");
});

server.listen({ port: 3000, host: 'localhost' }, () => {
  console.log('Up and Running!');
});

```
Bene, una cosa che possiamo fare è cambiare il tipo di contenuto della risposta:

```
response.setHeader('Content-Type', 'text/html');
```

Vogliamo anche effettivamente servire qualche HTML, non "Hello World".

Per un approccio molto veloce possiamo memorizzare una pagina web di base in una stringa e poi inviarla indietro:

```
const HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Hello World</title>
    <style>
      body {
        background-color: black;
        color: yellow;
        text-align: center;
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    Hello World
  </body>
</html>
`;
```
Quindi serviremo l'HTML invece di "Hello World":

```
risposta.end(HTML);
```
---

È possibile eseguire questo server eseguendo nuovamente `node index` (a patto che il file si chiami `index.js`). Andiamo su http://localhost:3000 nel nostro browser web e voilà! Vedremo una pagina HTML con un Hello World giallo su uno sfondo nero.

Ok, non è il sito web più bello del mondo.
Ci possiamo lavorare più tardi! Aggiungiamo qualche altra funzionalità al nostro server.

=======
## Servire un file HTML
=======

Piuttosto che servire il nostro file HTML da una stringa, creiamo un file separato per memorizzare l'HTML. Chiamiamolo `index.html`, poi copiamo e incolliamo l'HTML nel file dalla nostra stringa HTML:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Il mio Hello World</title>
    <style>
      body {
        background-color: black;
        color: yellow;
        text-align: center;
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    Hello World
  </body>
</html>

```

Successivamente modificheremo il nostro server:

``` 
const http = require('http');
// aggiungiamo la libreria fs per la lettura dal file system
const fs = require('fs');

const server = http.createServer((request, response) => {
  // cercheremo di leggere dal file index.html
  fs.readFile('index.html', function(err, content) {
    if(err) {
        // readFile restituirà un errore se non è stato in grado di leggere correttamente il contenuto
        // se ciò accade, restituiamo una risposta di errore dal server
        response.statusCode = 500;
        response.end("Impossibile servire index.html");
    }
    else {
        // se non c'è errore, serviremo l'HTML che abbiamo letto dal file!
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(content);
    }
  });
});
```


Stiamo utilizzando la libreria `fs` di `Node.js` per leggere dal file system e recuperare il contenuto di `index.html`. Ciò rende il codice molto più pulito ed estendibile.

---

=======
## Servire un file CSS
=======

Possiamo fare un passo avanti servendo un file CSS. Prenderemo il codice di stile dal nostro file `index.html`:

```
body {
  background-color: black;
  color: yellow;
  text-align: center;
  font-size: 40px;
}
```
Spostiamo il CSS in un proprio file chiamato `style.css`.

Nel file `index.html`, sostituire l'intero nodo `<style>...</style>` con:

```
<link rel="stylesheet" type="text/css" href="style.css">
```

Questo elemento link indicherà al browser di richiedere un file "style.css" dal nostro server. Quale sarà il nostro prossimo passo?

Dobbiamo servire il file CSS dal nostro server, naturalmente!

Aggiorniamo il codice del nostro server:

```
const server = http.createServer((request, response) => {
  // per default serviamo index.html
  let filename = "index.html";
  let contentType = "text/html";
  // se il client sta richiedendo style.css, serviamolo invece
  if(request.url === "/style.css") {
    filename = "style.css";
    contentType = "text/css";
  }
  fs.readFile(filename, function(err, content) {
    if(err) {
        response.statusCode = 500;
        response.end(`Could not serve ${filename}`);
    }
    else {
        response.statusCode = 200;
        response.setHeader('Content-Type', contentType);
        response.end(content);
    }
  });
});
```

Sta iniziando a diventare un po' disordinato.

A questo punto, dovremmo pensare di generalizzare un po' questo codice:

- Dovrebbe sapere dove trovare le nostre risorse statiche come le immagini, i file CSS, i file JavaScript, ecc.
- Dovrebbe riconoscere le estensioni come `.css` e modificare di conseguenza il `contentType`
- Dovrebbe sapere quando il client vuole `.index.html` o un altro file;
- Dovrebbe anche essere in grado di gestire le richieste per creare, recuperare, aggiornare ed eliminare dati.


Fortunatamente, ci sono ottimi framework `Node.js` come `Express` che ci aiutano a servire risorse statiche e creare percorsi per le richieste di dati.




