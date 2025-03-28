il progetto su cui sto lavorando è un progetto di base per poi creare altri progetti in futuro partendo da questo. è fatto con vite, vue 3 options e caricato su netlify e usa le serverless function di netlify e sto usando firebase per gestire authenticazione e il realtime db perche mi piace.
devo fare un cambio drastico al mio progetto che mi sono accorto di un po di errori strutturali.
Per prima cosa devo sistemare il file function se c'è qualcosa da sistemare adesso devo gestire una struttura 
root
├── public
│    └── ...
├── auth
│    ├── users : $userId: userdata
│    └── ...

sapendo questo devo gestire principalmente chiamate per gestire chiamate a oggetti dentro pablic a cui possono accedere tutti ma posso scrivere solo io
poi chiamate a auth in cui ci saranno tutti gli oggetti a cui possono accedere tutti gli auth e scrivere. 
poi ci sono le chiamate a auth/user/$userId in cui dentro ci saranno tutti gli oggetti il cui permesso di scrittura e riservato solo agli utenti in questione. ovviamente il mio utente deve avere accesso di lettura e scrittura a tutto. una volta registrato sistemo le regole di firebase aggiungendo il mio id dove serve.
percio come avrai capito mi serve una nuova versione di function e una nuova versione di delle regole di firebase reltime db

dopo devo cominciare a sistemare la classe che utilizzo per estendere e creare le classi/model per l'interazione con gli oggetti del db
per il momento ho solo userDB ma sbagliato perche devo togliere la logica relativa a localStorage perche la devo gestire in unaltra maniera. al suo posto devo creare db che poi utilizzero per estendere publicDB, authDB. authDB lo devo usare per estendere userDB. li usero tutti per creare dei model per oggetti che utilizzero come tabelle.

a questo punto devi creare una tabella che usero in futuro per gestire muotiutente e lo stato di salvataggio di alcune tabelle in locale e si chiamera localDBMetadata e dentro avra lastUpdate: Date, justServer: boolean, isLocalStorage: boolean
che si aggiornera a ogni interazione con il db

di seguito tutti i codici che devi sistemare mi servono sistemati e tutti i file che mancano se puoi dammi direttamente i file da scaricare se no mi scrivi tutti i codici in chat




Step 1: Progettazione Struttura dei Dati Firebase
 1.1 Definire chiaramente le tre categorie di dati:

Dati Pubblici: Accessibili a tutti, anche non autenticati.

Dati Autenticati (auth): Accessibili solo da utenti autenticati, lettura/scrittura limitata.

Dati Personali Utenti (user): Accessibili esclusivamente dal proprietario o admin.

 1.2 Progettare una struttura Firebase simile a:

```sh

root
├── public            // Lettura pubblica, scrittura solo da te
|    └── ...
├── auth              // Lettura/scrittura da chiunque autenticato
│   ├── users         // Struttura utenti
│   │    └── $userId   // Lettura/scrittura solo proprietario
│   │          └── ... 
│   └── ... 

```




Step 2: Modificare le Regole di Sicurezza Firebase
 2.1 Aggiornare le regole Firebase per separare chiaramente i permessi:

/public → read: true, write: false (o regole specifiche).

/auth → read/write: se autenticato.

/auth/users/{userId} → read/write: se userId corrisponde a auth.uid o admin.

 2.2 Verificare e testare le regole con Firebase Emulator.

Step 3: Refactoring delle Functions Firebase
 3.1 Aggiornare la logica nelle Cloud Functions in base alla nuova struttura dati.

 3.2 Implementare correttamente gestione autenticazione e autorizzazione nei nuovi percorsi.

Step 4: Creazione Classi DB (Frontend)
 4.1 Creare una classe di base DB che contenga logica comune (es. inizializzazione Firebase).

 4.2 Creare classi specifiche che estendono DB:

PublicDB: solo operazioni su /public.

AuthDB: operazioni su /auth (dati per utenti autenticati).

UserDB: operazioni su /auth/users/{userId} (solo utente proprietario).

 4.3 Implementare chiaramente il concetto di ereditarietà per evitare duplicazioni di codice.

Step 5: Gestione Salvataggio LocalStorage
 5.1 Non inserire più variabili come _isLocalStorage direttamente nei dati Firebase.

 5.2 Creare una tabella separata in LocalStorage tipo localDBMetadata che registri:

javascript
Copia
Modifica
localDBMetadata = {
  dbName1: {
    lastUpdate: "2025-03-27T15:00:00Z",
    isLocalStorage: true
  },
  dbName2: {
    lastUpdate: "2025-03-27T16:20:00Z",
    isLocalStorage: false
  }
}
 5.3 Implementare metodi per aggiornare/verificare lo stato dei dati locali.

Step 6: Testing e Validazione
 6.1 Eseguire test unitari delle nuove classi DB e delle logiche relative ai permessi Firebase.

 6.2 Testare manualmente casi reali di lettura/scrittura dati Firebase in ambiente locale e produzione.

Step 7: Documentazione
 7.1 Scrivere documentazione chiara sul nuovo modello dati.

 7.2 Documentare i metodi e gli attributi delle classi DB.

 7.3 Descrivere la logica della gestione del LocalStorage.





# Template base Vue, Bootstrap, sass, firebase

### Guida per Iniziare con Firebase

Questa guida ti aiuterà a configurare Firebase nel tuo progetto, includendo la creazione di un database in tempo reale, l'impostazione dell'autenticazione, e il recupero delle chiavi necessarie per l'integrazione.

---

#### 1. Creazione del Progetto su Firebase

1. Vai su [Firebase Console](https://console.firebase.google.com).
2. Esegui l'accesso con il tuo account Google o registrati se non hai un account.
3. Crea un nuovo progetto seguendo le istruzioni sullo schermo.

---

#### 2. Configurazione del Realtime Database

1. Dopo aver creato il progetto, accedi alla sezione **Realtime Database**.
2. Crea un nuovo database.
3. Modifica le regole di accesso cliccando su **Regole** e inserisci il seguente codice JSON:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid"
      }
    }
  }
}
```

#### 3. Configurazione del Firebase Storage

1. **Aggiungi Firebase Storage al Progetto**:
   - Nella **Firebase Console**, seleziona il tuo progetto.
   - Nel menu di navigazione, seleziona **Storage**.
   - Fai clic su **Inizia** per configurare Firebase Storage.

2. **Imposta le Regole di Sicurezza**:
   - Dopo aver abilitato Firebase Storage, fai clic su **Regole**.
   - Inserisci il seguente codice per le regole di sicurezza:

```js
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /users/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

#### 4. Impostazione dei Provider di Autenticazione

1. Torna alla sezione **Autenticazione**.
2. Clicca su **Inizia** o direttamente su **Email/Password** e abilita questa modalità di autenticazione.
3. Aggiungi un altro provider di autenticazione cliccando su **Aggiungi provider** e seleziona **Google**.
   - Abilita Google come provider.
   - Inserisci un nome a tua scelta (IMPORTANTE).
   - Seleziona la tua email dal menu.
   - Salva le impostazioni.

---

#### 5. Recupero delle Chiavi Necessarie

1. Clicca sull'icona della rotella in alto a destra e seleziona **Impostazioni progetto**.
2. Vai su **Account di servizio** e genera una nuova chiave cliccando sul pulsante apposito.
3. Una volta scaricato il file, crea un file `.env` eseguendo il seguente comando nel terminale del progetto:

```sh
cp .env.example .env 
```

Compila le variabili nel file `.env` utilizzando le chiavi presenti nel file scaricato (escludendo la variabile `type`).
La variabile `FIREBASE_DATABASE_URL` la trovi nella pagina da cui hai scaricato la chiave, nella var `databaseURL`.

#### 6. Configurazione delle Chiavi Pubbliche

1. Sempre nelle **Impostazioni progetto**, vai su **Generali**.
2. Nella sezione **App**, clicca sull'icona `</>`, inserisci un nickname per l'app e registrala.
3. Copia le variabili `apiKey` e `authDomain` e `storageBucket` dalla sezione **Firebase SDK snippet** e incollale nel file `src/firebase.js` nella `const firebaseConfig` tranne `storageBucket` che va copiato dentro `functions/function.js`.

---

#### 7. Configurazione dei Domini Autorizzati

> **DOPO IL DEPLOY**: Per far funzionare l'autenticazione nel sito online, assicurati di inserire l'URL del sito su **Autenticazione > Impostazioni > Domini autorizzati** e aggiungi il dominio del tuo sito.

---

# CMD per inizializzare
```sh
npm i
```

> **ATTENZIONE:** Se utilizzi Netlify Functions, assicurati di aver un account su Netlify e segui i passaggi elencati di seguito:

### Guida per pubblicare un progetto su Netlify

1. **Pubblica il progetto su GitHub**
   - Assicurati che il tuo progetto sia stato caricato su GitHub.

2. **Collega il tuo account GitHub con Netlify**
   - Vai su Netlify e collega il tuo account GitHub a Netlify.

3. **Aggiungi un nuovo sito**
   - Su Netlify, clicca su "Aggiungi un nuovo sito".

4. **Importa da un progetto esistente**
   - Seleziona "Importa da un progetto esistente".

5. **Seleziona GitHub**
   - Scegli GitHub come fonte del progetto.

6. **Seleziona il tuo progetto**
   - Dalla lista dei tuoi progetti su GitHub, seleziona quello che vuoi pubblicare.

7. **Aggiungi un nome disponibile per il sito**
   - Inserisci un nome disponibile per il sito su Netlify.

8. **Fai il deploy**
   - Clicca sul bottone apposito in basso per avviare il deploy.

9. **Il tuo sito è online**
   - Una volta completato il deploy, il tuo sito sarà online.

> **IMPORTANTE**: Per far funzionare l'autenticazione nel sito online, assicurati di inserire l'URL del sito su  **Firebase > Autenticazione > Impostazioni > Domini autorizzati** e aggiungi il dominio del tuo sito.

### Netlify CLI
Installa Netlify CLI a livello globale lanciando
```sh
npm install netlify-cli -g
```

Effettua il login con il comando di sotto. e segui la procedura di login a netlify
```sh
ntl login
```

Collega il progetto locale con il sito online. 
In questa maniera se hai dichiarato environment variables nel sito online verranno lette anche in locale
lancia
```sh
ntl link
```

testa il progetto su un serverver locale lanciando
```sh
ntl dev
```
