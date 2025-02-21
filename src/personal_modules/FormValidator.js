// Spiegazione delle principali scelte:
// Stato interno per ogni campo
// Ogni campo del form ha una voce in this.state che tiene traccia del valore iniziale, del tipo (da impostare con setType), dello stato di validazione, del validator da utilizzare e di eventuali opzioni aggiuntive.

// Mappa dei validator di default
// La proprietà this.validators associa una stringa (tipo di campo) al metodo validator corrispondente. Quando chiami setType, se esiste un validator per quel tipo, questo viene associato al campo.

// Metodi di validazione

// Il metodo check(key) esegue il validator associato al campo, aggiorna lo stato di validazione e ritorna il risultato.
// checkAll() permette di validare l’intero form.
// areValid() ritorna true se tutti i campi con un validator definito sono validi.
// Gestione delle classi per errori
// Il metodo classError(key) restituisce la classe CSS (ad esempio, 'is-valid' o 'is-invalid') in base allo stato di validazione del campo.

// Metodi aggiuntivi
// I metodi getValid() e getNotValid() permettono di ottenere oggetti contenenti solo i campi validi o non validi, mentre reset() ripristina i valori iniziali e azzera lo stato di validazione.

// Questa architettura rende il form centralizzato, modulare e facilmente estendibile in futuro per aggiungere ulteriori funzionalità o personalizzazioni.

export class FormValidator {
    constructor(fields) {
        if (typeof fields !== 'object' || fields === null) {
            throw new Error('Input selector must be an object');
        }
        // Creiamo un oggetto per salvare lo stato iniziale di ogni campo
        this.state = {};
        for (const key in fields) {
            if (Object.prototype.hasOwnProperty.call(fields, key)) {
                // Assegniamo il valore iniziale come proprietà direttamente sull'istanza
                this[key] = fields[key];
                // Salviamo lo stato iniziale, il tipo (potrebbe essere usato per validazioni più specifiche) e lo stato di validazione
                this.state[key] = {
                    initialValue: fields[key],
                    type: null, // il tipo di input da validare viene settato in automatico quando viene inizializzato il componente
                    validated: null, // il tipo di input da validare viene settato in automatico quando viene inizializzato il componente
                    validator: null, // se settato definisce il metodo con cui viene validato il campo
                    validatorOptions: null,
                };
            }
        }
    }

    /**
    * Restituisce un oggetto semplice con tutte le proprietà del form.
    */
    get() {
        const result = {};
        for (const key in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, key)) {
                result[key] = this[key];
            }
        }
        return result;
    }

    /**
    * Restituisce un oggetto con solo i campi validi (validated === true).
    */
    getValid() {
        const result = {};
        for (const key in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, key)) {
                if (this.state[key].validated === true) {
                    result[key] = this[key];
                }
            }
        }
        return result;
    }

    /**
    * Restituisce un oggetto con solo i campi non validi (validated === false).
    */
    getNotValid() {
        const result = {};
        for (const key in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, key)) {
                if (this.state[key].validated === false) {
                    result[key] = this[key];
                }
            }
        }
        return result;
    }

    /**
    * Resetta i campi ai valori iniziali e reimposta lo stato di validazione.
    */
    reset() {
        for (const key in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, key)) {
                this[key] = this.state[key].initialValue;
                this.state[key].validated = null;
            }
        }
    }

    /**
    * Valida tutti i campi che hanno un validator definito.
    * Ritorna true se tutti i campi validati risultano validi.
    */
    checkAll() {
        let allValid = true;
        for (const key in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, key)) {
                if (this.state[key].validator) {
                    const valid = this.check(key);
                    if (!valid) {
                        allValid = false;
                    }
                }
            }
        }
        return allValid;
    }

    /**
   * Verifica se tutti i campi che hanno un validator sono validi.
   */
    areValid() {
        // Se per ogni campo con un validator lo stato validato è true, il form è valido
        for (const key in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, key)) {
                if (this.state[key].validator && this.state[key].validated !== true) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
    * Verifica se un campo specifico è valido.
    */
    isFieldValid(key) {
        if (this.state[key]) {
            return this.state[key].validated === true;
        }
        return false;
    }

    /**
    * Valida il campo specificato:
    * - Se il campo ha un validator definito, lo esegue con il valore corrente e le eventuali opzioni.
    * - Imposta lo stato di validazione nel campo e ritorna true se il campo è valido, false altrimenti.
    */
    check(key) {
        if (!this.state[key] || !this.state[key].validator) {
            console.warn(`Nessun validator definito per il campo "${key}"`);
            return true; // Se non è definito un validator, consideriamo il campo valido
        }
        const value = this[key];
        const options = this.state[key].options;
        // Richiamiamo il validator con il contesto della classe per poter eventualmente accedere ad altri metodi se serve
        const valid = this.state[key].validator.call(this, value, options);
        this.state[key].validated = valid;
        return valid;
    }

    /**
   * Imposta il tipo per un campo e associa il validator di default corrispondente.
   * - `type`: stringa che indica il tipo di validazione (es. 'string', 'email', ecc.)
   * - `options`: parametri aggiuntivi (es. [min, max] oppure un oggetto con proprietà specifiche)
   */
    setType(key, type, validatorOptions = null) {
        if (!this.state[key]) {
            console.error(`Il campo "${key}" non esiste.`);
            return;
        }
        this.state[key].type = type;
        this.state[key].validatorOptions = validatorOptions;
        if (this.state[key].validator === null || this.state[key].validator === true) {
            this.state[key].validator = this['VL_' + type];
        }
    }

    /**
   * Ritorna la classe CSS da assegnare al campo in base al suo stato di validazione:
   * - 'is-valid' se il campo è valido
   * - 'is-invalid' se il campo non è valido
   * - '' se non è stato ancora validato
   */
    classError(key) {
        if (!this.state[key]) return '';
        if (this.state[key].validated === true) return 'is-valid';
        if (this.state[key].validated === false) return 'is-invalid';
        return '';
    }

    // --------------------------
    // Validator di default
    // Ogni funzione riceve il valore e, eventualmente, delle opzioni (min/max, valore di confronto, ecc.)
    // Restituiscono true se il valore è valido, false altrimenti.

    VL_text(value, options) {
        let min = 3;
        let max = 255;
        if (options && Array.isArray(options)) {
            min = options[0] || min;
            max = options[1] || max;
        }
        if (typeof value !== 'string') return false;
        return value.length >= min && value.length <= max;
    }

    VL_email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (typeof value !== 'string') return false;
        return emailRegex.test(value);
    }

    VL_integer(value, options) {
        let min = 1;
        let max = 255;
        if (options && Array.isArray(options)) {
            min = options[0] || min;
            max = options[1] || max;
        }
        const intValue = parseInt(value, 10);
        if (isNaN(intValue)) return false;
        return intValue % 1 === 0 && intValue >= min && intValue <= max;
    }

    VL_decimal(value, options) {
        let min = 1;
        let max = 9999.99;
        if (options && Array.isArray(options)) {
            min = options[0] || min;
            max = options[1] || max;
        }
        const num = parseFloat(value);
        if (isNaN(num)) return false;
        return num >= min && num <= max;
    }

    VL_boolean(value) {
        return value === '0' || value === '1' || value === 0 || value === 1;
    }

    VL_password(value, options) {
        let min = 8;
        let max = 255;
        if (options && Array.isArray(options)) {
            min = options[0] || min;
            max = options[1] || max;
        }
        if (typeof value !== 'string') return false;
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?!.*\s).+$/;
        return value.length >= min && value.length <= max && regexPassword.test(value);
    }

    VL_retypePassword(value, options) {
        // options deve contenere una proprietà 'compare' con il valore originale da confrontare
        if (!options || typeof options.compare === 'undefined') {
            console.error('Valore di confronto mancante per la validazione "retype-password".');
            return false;
        }
        return value === options.compare;
    }

    VL_date(value) {
        const regexDate = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (typeof value !== 'string') return false;
        return regexDate.test(value);
    }

    VL_endDate(value, options) {
        // options deve contenere una proprietà 'start' con la data iniziale
        const regexDate = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (typeof value !== 'string' || !options || !options.start) return false;
        if (!regexDate.test(value) || !regexDate.test(options.start)) return false;
        return new Date(options.start) <= new Date(value);
    }

    VL_time(value) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (typeof value !== 'string') return false;
        return timeRegex.test(value);
    }

}