// Spiegazione delle principali scelte:
// Stato interno per ogni campo
// Ogni campo del form ha una voce in this.state che tiene traccia del valore iniziale, del tipo (da impostare con setType), dello stato di validazione, del validator da utilizzare e di eventuali opzioni aggiuntive.

// Mappa dei validator di default
// La proprietà this.validators associa una stringa (tipo di campo) al metodo validator corrispondente. Quando chiami setType, se esiste un validator per quel tipo, questo viene associato al campo.

// Metodi di validazione

// Il metodo checkField(field) esegue il validator associato al campo, aggiorna lo stato di validazione e ritorna il risultato.
// check() permette di validare l’intero form.
// areValid() ritorna true se tutti i campi con un validator definito sono validi.
// Gestione delle classi per errori
// Il metodo classValidator(field) restituisce la classe CSS (ad esempio, 'is-valid' o 'is-invalid') in base allo stato di validazione del campo.

// Metodi aggiuntivi
// I metodi getValid() e getNotValid() permettono di ottenere oggetti contenenti solo i campi validi o non validi, mentre reset() ripristina i valori iniziali e azzera lo stato di validazione.

// Questa architettura rende il form centralizzato, modulare e facilmente estendibile in futuro per aggiungere ulteriori funzionalità o personalizzazioni.
import Validator from "./utility/Validator.js";
import requireParam from "./utility/requireParam.js";
export default class FormValidator {
    constructor(fields) {
        if (typeof fields !== 'object' || fields === null) {
            throw new Error('Input selector must be an object');
        }

        // Lista dei metodi della classe
        const methodNames = Object.getOwnPropertyNames(FormValidator.prototype).filter(name => name !== 'constructor');

        // Creiamo un oggetto per salvare lo stato iniziale di ogni campo
        this.state = { _loading: false };
        for (const field in fields) {
            if (Object.prototype.hasOwnProperty.call(fields, field)) {
                // Controlliamo se il campo ha un nome riservato
                if (methodNames.includes(field)) {
                    throw new Error(`Il nome del campo '${field}' è riservato e non può essere utilizzato.`);
                }
                // Assegniamo il valore iniziale come proprietà direttamente sull'istanza
                this[field] = fields[field];
                // Salviamo lo stato iniziale, il tipo (potrebbe essere usato per validazioni più specifiche) e lo stato di validazione
                this.state[field] = {
                    initialValue: fields[field],
                    type: null, // il tipo di input da validare viene settato in automatico quando viene inizializzato il componente
                    validated: null, // il tipo di input da validare viene settato in automatico quando viene inizializzato il componente
                    validator: null, // se settato definisce il metodo con cui viene validato il campo
                    validatorOptions: undefined,
                };
            }
        }
    }

    /**
    * Restituisce un oggetto semplice con tutte le proprietà del form.
    */
    get() {
        const result = {};
        for (const field in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, field)) {
                result[field] = this[field];
            }
        }
        return result;
    }

    /**
    * Restituisce un oggetto con solo i campi validi (validated === true).
    */
    getValid() {
        const result = {};
        for (const field in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, field)) {
                if (this.state[field].validated === true) {
                    result[field] = this[field];
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
        for (const field in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, field)) {
                if (this.state[field].validated === false) {
                    result[field] = this[field];
                }
            }
        }
        return result;
    }

    /**
    * Resetta i campi ai valori iniziali e reimposta lo stato di validazione.
    */
    reset() {
        for (const field in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, field) && field !== '_loading') {
                this[field] = this.state[field].initialValue;
                this.state[field].validated = null;
            }
        }
    }

    /**
    */
    triggerOnChange(value = undefined, check = undefined, field = undefined) {
        if (this.state.logsOn) { console.log({ trigger: { value, check, field } }) }
        if (this.onChange) { return this.onChange({ value, check, field }); }
        return null;
    }

    /**
    * Valida tutti i campi che hanno un validator definito.
    * Ritorna true se tutti i campi validati risultano validi.
    */
    check() {
        let allValid = true;
        for (const field in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, field)) {
                if (this.state[field].validator) {
                    this.state[field].validated = null
                    const valid = this.checkField(field);
                    if (!valid) {
                        allValid = false;
                        this.state[field].validated = false;
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
        for (const field in this.state) {
            if (Object.prototype.hasOwnProperty.call(this.state, field)) {
                if (this.state[field].validator && this.state[field].validated !== true) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
    * Verifica se un campo specifico è valido.
    */
    isFieldValid(field) {
        if (this.state[field]) {
            return this.state[field].validated === true;
        }
        return false;
    }

    /**
    * Valida il campo specificato:
    * - Se il campo ha un validator definito, lo esegue con il valore corrente e le eventuali opzioni.
    * - Imposta lo stato di validazione nel campo e ritorna true se il campo è valido, false altrimenti.
    */
    checkField(field) {
        if (!this.state[field] || !this.state[field].validator) {
            // console.log('CheckField notRequired:', field, '=>', this.state[field].validated);
            return true; // Se non è definito un validator, consideriamo il campo valido
        }
        const value = this[field];
        const validatorOptions = this.state[field].validatorOptions;
        const valid = validatorOptions !== null ? this.state[field].validator.call(this, value, validatorOptions) : this.state[field].validator.call(this, value);
        this.state[field].validated = valid ? true : this.state[field].validated === null ? null : false;
        // console.log('CheckField:', field, '=>', this.state[field].validated);
        return this.state[field].validated;
    }

    /**
   * Imposta il tipo per un campo e associa il validator di default corrispondente.
   * - `type`: stringa che indica il tipo di validazione (es. 'string', 'email', ecc.)
   * - `validatorOptions`: parametri aggiuntivi (es. [min, max] oppure un oggetto con proprietà specifiche)
   */
    setType(field = requireParam('field'), type = requireParam('type'), validation = {}) {
        if (!this.state[field]) { console.error(`Il campo "${field}" non esiste.`); return; }
        this.state[field].type = type;
        if (validation === false) { this.state[field].validated === true; return; }
        this.state[field].validator = validation.validator ? validation.validator : Validator[type];
        if (validation.validator) delete validation.validator;
        this.state[field].validatorOptions = validation;
    }

    /**
   * Ritorna la classe CSS da assegnare al campo in base al suo stato di validazione:
   * - 'is-valid' se il campo è valido
   * - 'is-invalid' se il campo non è valido
   * - '' se non è stato ancora validato
   */
    classValidator(field) {
        if (!this.state[field]) return '';
        if (this.state[field].validated === true) return 'is-valid';
        if (this.state[field].validated === false) return 'is-invalid';
        return '';
    }

    /**
   * 
   */
    initField(field = requireParam('field'), type = requireParam('type'), validation = requireParam('validation')) {
        this.setType(field, type, validation);
        this.checkField(field);
    }
}