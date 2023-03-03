=========

# INTRO

=========


## Configurazione di Node.js
-------------

Node.js è un ambiente di runtime JavaScript. Questo ambiente include tutto ciò che serve per iniziare a eseguire programmi JavaScript sulla propria macchina in locale.



### Installare Node.js
---------------

È possibile installare Node.js visitando [nodejs.org](https://nodejs.org/en/).

Scaricare ed eseguire il programma di installazione per il proprio sistema operativo. Una volta completata l'installazione, sarà possibile eseguire Node in una finestra di terminale:

![Terminal Window](https://res.cloudinary.com/divzjiip8/image/upload/v1579741136/terminal-node_dujulv.png)

Digitando semplicemente `node` e premendo invio siamo in grado di eseguire comandi JavaScript.

> Questo è chiamato Node.js REPL (Read-Eval-Print-Loop). Si può uscire in qualsiasi momento eseguendo `.exit`. Per saperne di più su [Node.js REPL qui](https://nodejs.org/api/repl.html).



------------
## Eseguire uno script
------------

Ora che abbiamo un editor di testo, scriviamo uno script e proviamo a eseguirlo!

Ipotizzando di avere un file chiamato `index.js`:

```

const myName = "Gian";
const message = `Ciao, ${myName}!`;
console.log(message);

```

si può eseguire il file digitando `node index`

![Esecuzione di index.js](https://res.cloudinary.com/divzjiip8/image/upload/v1579741033/node-terminal-file_tiwtup.png)


## Node Package Manager (NPM)

--------------------

NPM, o Node Package Manager, semplifica la condivisione di codice tra molti progetti. Lo fa mantenendo un **registro pubblico** dei diversi pacchetti (chiamati anche moduli) che gli sviluppatori pubblicano.

NPM fornisce anche un'utility a riga di comando che consente agli sviluppatori di interagire con il registro per scaricare facilmente i moduli. Ogni modulo può avere molte versioni diverse, il che consente ai moduli di correggere i bug e di effettuare aggiornamenti senza richiedere agli sviluppatori di scaricare i nuovi aggiornamenti.

> Questo può essere particolarmente utile quando un modulo introduce una **modifica di rottura**, che non garantisce la retrocompatibilità. In questo caso, il modo in cui si utilizzava il modulo potrebbe non funzionare in una versione futura.

---------------

È possibile avviare un nuovo progetto con NPM in modo piuttosto semplice. Creare una nuova cartella in cui avviare il progetto, quindi eseguire `npm init`:

![NPM init](https://res.cloudinary.com/divzjiip8/image/upload/v1579809986/npm_init_ftikcs.png)

Questo ci guiderà attraverso il processo di creazione di un file chiamato `package.json`.

> Non è necessario compilare questi campi per ora. Se si preme invio si fornirà il valore predefinito per il campo, che è sufficiente per i nostri scopi attuali. Se si desidera saperne di più su una qualsiasi delle proprietà, si può trovare [la documentazione di package.json qui] (https://docs.npmjs.com/files/package.json).

Dopo aver completato questo processo, si sarà creato un nuovo file all'interno della cartella, chiamato `package.json`, che assomiglia un po' a questo:

```
{
  "name": "newproject",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

Ora possiamo iniziare a installare i pacchetti nel nostro `package.json`!

Proviamo il popolare modulo NPM `faker-js`. È possibile vedere questo [modulo qui] (https://www.npmjs.com/package/@faker-js/faker). Per installarlo, si può andare nel terminale all'interno della cartella del progetto e digitare `npm install @faker-js/faker --save-dev`.

Questo aggiornerà il nostro `package.json` per aggiungere la proprietà dependencies:

```
{
  "dependencies": {
    "@faker-js/faker": "^6.0.0-alpha.7"
  }
}

```

Si noterà che il valore della chiave `@faker-js/faker` è `"^6.0.0-alpha.7"`. Questa è la versione del modulo. Qui possiamo esprimere quale versione del modulo vogliamo che il nostro progetto venga eseguito. Ne parleremo ulteriormente nella sezione [versioning semantico](https://university.alchemy.com/course/js/md/614b9f3d7e426a001019beb5#semantic-versioning).

Facciamo qualcosa con la nostra nuova libreria.

Creiamo un nuovo file chiamato `index.js` nella cartella del progetto e scriviamo il seguente codice:

```
const { faker } = require('@faker-js/faker');
const name = faker.name.findName();
const message = `Ciao, ${name}!`;
console.log(message);

```

Questo creerà un nome falso e gli invierà un messaggio di saluto. Possiamo chiamare `node index` per eseguire il nostro script:

![Faker Names](https://res.cloudinary.com/divzjiip8/image/upload/v1579811781/faker_names_wytavd.png)

 ## Versioning semantico
-----------------------

Il sistema di versioning utilizzato da NPM è chiamato **versioning semantico**.

Ogni numero separato da `.` indica una parte diversa della versione. Per esempio, `1.1.5` può essere scomposta in:

```
1 .                          1 .                   5
^ Versione maggiore          ^ Versione minore     ^ Versione della patch

```

Gli aggiornamenti della **versione maggiore** possono tradizionalmente includere **modifiche di rottura**, il che significa che potrebbero non funzionare in modo compatibile con le versioni precedenti. Dopo aver aggiornato la versione principale di un pacchetto, si dovrebbe sempre verificare che funzioni correttamente!

Se non ci interessa la versione principale del pacchetto, possiamo semplicemente scrivere `*` o `x` nella sezione `dependencies` di `package.json`.

> Questo non è raccomandato per nessuna applicazione di livello production. Consentire modifiche importanti alla libreria in un ambiente di produzione senza averla prima testata è una ricetta per il disastro.

Gli aggiornamenti di **Versioni minori** sono generalmente compatibili con le versioni precedenti. Possono includere alcune nuove funzionalità, ma *di solito* non includono modifiche di rottura.

Se si vogliono consentire aggiornamenti di versione minore nel proprio pacchetto, si può scrivere `1.x` o `^1.0.0` nel proprio `package.json`.

> Per maggiori informazioni sul versionamento semantico si può leggere la [documentazione NPM](https://docs.npmjs.com/about-semantic-versioning).