## Sistema Binario
------

Il binario è  un sistema numerico che utilizza come simboli solo `0` e `1`.


### Rappresentare i valori 
--------------------

Quanti valori possono rappresentare questi due sistemi numerici con **un singolo carattere**?

Il **decimale** può rappresentare **10 valori** con i suoi simboli da `0` a `9`. 

Il **binario** può rappresentare **2 valori** con i simboli `0` e `1`. 

Cosa succede se abbiamo più caratteri?

### Caratteri multipli in decimale
------------------------------

Quanti valori può rappresentare il **decimale** con **2 caratteri**? 

Due caratteri in decimale permettono di contare da `00` a `99`. In questo intervallo possiamo rappresentare `100` valori unici.

E se avessimo **3 caratteri**?

Sarebbe da `000` a `999`, rappresentando `1000` valori possibili.

**Vedete uno schema? 

- Un carattere decimale rappresenta **10 valori**
- Due caratteri decimali rappresentano **100 valori**
- Tre caratteri decimali rappresentano **1000 valori**

Il numero di valori che possiamo rappresentare in decimale è `10 ** n` dove `n` è il numero di caratteri.

### Caratteri multipli in binario
-----------------------------

Quanti valori può rappresentare il **binario** con **2 caratteri**? 

Due caratteri in binario ci danno i valori unici `00`, `01`, `10` e `11`. Sono **quattro valori**!

E con **3 caratteri**?

Con tre caratteri possiamo rappresentare **otto valori**: `000`, `001`, `010`, `011`, `100`, `101`, `110`, `111`.

**È emerso un nuovo modello! 

- Un carattere binario rappresenta **2 valori**
- Due caratteri binari rappresentano **4 valori**
- Tre caratteri binari rappresentano **8 valori**

Il numero di valori che possiamo rappresentare in binario è `2 ** n` dove `n` è il numero di caratteri!

> Se avete passato molto tempo a guardare le specifiche dei computer, i numeri 256 e 1024 vi sembreranno particolarmente familiari! Questi numeri sono potenze di due: 256 è `2 ** 8` e 1024 è `2 ** 10`. Parleremo del loro significato più avanti.

### Contare 
---------

Intuitivamente, sappiamo come contare in decimale. Tuttavia, tradurlo in parole può essere sorprendentemente impegnativo. 

###  Regole per il conteggio decimale
--------------------------

Per il conteggio di un singolo carattere, potremmo dire:

1.  Ecco 10 simboli elencati dal più basso al più alto, separati da una virgola: `0,1,2,3,4,5,6,7,8,9`.
2.  Iniziare dal simbolo più basso (`0`).
3.  Contare passando al simbolo successivo più alto.
4.  Ripetere il **passo 3** fino a raggiungere il simbolo più alto.

Cosa succede ora quando si raggiunge il simbolo più alto: `9`? Passiamo al `10`.

Come spiegare questa regola? È utile soffermarsi un attimo sul **significato del carattere**:

Possiamo pensare al `9` come a `09`, dove `0` è il carattere **più significativo** e `9` è il carattere **meno significativo**. Più il carattere è a sinistra, più ha significato nel nostro numero.

> Un buon esempio è rappresentato dal denaro. Preferireste avere 109 o 901 dollari? In questo numero sono presenti gli stessi simboli, ma è chiaro che vorremmo che il simbolo di valore più alto si trovasse in un posto di **maggiore significato**.

Quando raggiungiamo il simbolo di valore più alto nel posto **meno significativo**, cosa facciamo dopo?

Alcuni esempi:

- Dopo `09` viene `10`.
- Dopo `19` viene `20`.
- Dopo `29` viene `30`.


Stiamo essenzialmente avvolgendo il nostro intervallo di simboli nella posizione meno significativa e incrementando il numero successivo più significativo.

Le stesse regole di conteggio si applicano al conteggio binario.

### Contare in binario
---------------


Contiamo in **binario**: `0`, `1`, `10`, `11`, `100`, `101`, `110`, `111`, `1000`

 Stesse regole del conteggio decimale, solo che l'intervallo di simboli è ridotto a `0` e `1`!

> Per un **robot**, il binario non è più complicato del decimale! Si applicano le stesse regole. Il binario è usato nei computer classici perché l'input è la corrente elettrica. L'ingresso più semplice viene letto come `0` (nessuna corrente) o `1` (corrente).

## Bit, nibble e byte 
------------------------

Ora che abbiamo stabilito che il sistema binario è un sistema numerico, definiamo alcune parole chiave.

- **bit** - un singolo carattere in **binario** (un singolo carattere in decimale è chiamato **digit**)!
- **nibble** - un termine poco comune per indicare quattro bit insieme (ad esempio `1011`)
- **byte** - otto bit insieme: `1000 1100` sarebbe un **byte**!

Il numero `256` compare spesso in informatica. Why? 

È il numero di valori totali distinti che possiamo rappresentare con un **byte**! Ricordate la nostra formula per i valori distinti in binario: `2 ** n`. Poiché un byte ha otto bit, il numero totale di valori distinti è `2 ** 8` o `256`!

Con `256` valori distinti possiamo scegliere cosa rappresentare. Ad esempio, potremmo scegliere di rappresentare tutti i numeri interi positivi da `0` a `255`. Se volessimo includere i numeri negativi, potremmo dividere l'intervallo a metà, rappresentando da `-128` a `127`.

> A seconda dell'implementazione, la dimensione dell'intervallo può essere uguale sul lato negativo e positivo, con una doppia rappresentazione per lo zero. Questa si chiama [Complemento di uno] (https://en.wikipedia.org/wiki/Signed_number_representations#Ones'_complemento).

### Grandezze 
-----------

È comune nominare i numeri più grandi in decimale. Ad esempio:

- 1_000 viene chiamato **migliare**.
- 1_000_000 è indicato come **milione**
- 1_000_000_000 viene chiamato **miliardo**.

In binario, esistono anche nomi per le grandi grandezze:

- 1024 bit (`2 ** 10`) è indicato come un ***kilobit**
- 1024 kilobit è indicato come ***megabit**
- 1024 megabit sono chiamati ***gigabit**.

 La stessa regola vale per i byte (cioè 1024 byte sono un ***kilobyte**).

> In molti casi si useranno i prefissi **kibi**, **mebi** e **gibi** piuttosto che **kilo**, **mega** e **giga** rispettivamente. Questi ultimi prefissi sono usati tradizionalmente nel [Sistema internazionale di unità di misura] (https://en.wikipedia.org/wiki/International_System_of_Units) per rappresentare le grandezze in potenze di dieci (`10**3`, `10**6` e `10**9`). Tradizionalmente, un **kilobyte** si riferiva a `1024` byte, ma questo termine è ora potenzialmente ambiguo. Potrebbe essere opportuno usare il termine **kibibyte** quando ci si riferisce a `1024` byte per evitare confusioni.

