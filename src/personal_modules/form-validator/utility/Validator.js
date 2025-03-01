export default {
    ['text'](value, { min, max } = {}) {
        min = min !== undefined && !isNaN(Number(min)) ? Number(min) : 2;
        max = max !== undefined && !isNaN(Number(max)) ? Number(max) : 255;
        if (typeof value !== 'string') {
            console.error('Errore no stai passando al flidValidation una stringa');
            return false
        };
        return value.length <= max && value.length >= min
    },

    ['email'](value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (typeof value !== 'string') {
            console.error('Errore no stai passando al flidValidation una stringa');
            return false
        };
        return emailRegex.test(value);
    },

    ['number'](value, { min, max } = {}) {
        min = min !== undefined && !isNaN(Number(min)) ? Number(min) : 0;
        max = max !== undefined && !isNaN(Number(max)) ? Number(max) : 255;

        const intValue = parseInt(value, 10);
        if (isNaN(intValue)) return false;
        return intValue % 1 === 0 && intValue >= min && intValue <= max;
    },
    ['decimal'](value, { min, max } = {}) {
        min = min !== undefined && !isNaN(Number(min)) ? Number(min) : 0.1;
        max = max !== undefined && !isNaN(Number(max)) ? Number(max) : 9999.99;
        const num = parseFloat(value);
        if (isNaN(num)) return false;
        return num >= min && num <= max;
    },
    ['checkbox'](value, { required = true } = {}) {
        switch (typeof value) {
            case 'boolean':
            case 'number':
                return value === required;
            case 'string':
                if (value === 'true') {
                    if (required === true) {
                        return true
                    } else {
                        return false
                    }
                }
                if (value === 'false') {
                    if (required === false) {
                        return true
                    } else {
                        return false
                    }
                }
            default:
                console.log('A checkbox validator non è stato passato un valore corretto');
                return false;
        }
    },

    ['boolean'](value, required = true) {
        return this.checkbox(value, { required });
    },

    ['password'](value, { min, max } = {}) {
        min = min !== undefined && !isNaN(Number(min)) ? Number(min) : 8;
        max = max !== undefined && !isNaN(Number(max)) ? Number(max) : 255;
        // migliorare la regex. deve controllare che non 
        // siano presenti spazi e che ci sia una lettera grande e 
        // un numero e un simbolo
        if (typeof value !== 'string') return false;
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?!.*\s).+$/;
        return value.length >= min && value.length <= max && regexPassword.test(value);
    },

    ['retypePassword'](value, compare) {
        // options deve contenere una proprietà 'compare' con il valore originale da confrontare
        if (compare === undefined) {
            console.error('Valore di confronto mancante per la validazione "retype-password" passare compare.');
            return false;
        }
        return value === compare;

    },

    ['date'](value) {
        const regexDate = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (typeof value !== 'string') return false;
        return regexDate.test(value);
    },

    ['endDate'](value, startDate) {
        // options deve contenere una proprietà 'start' con la data iniziale
        const regexDate = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (typeof value !== 'string' || !startDate) return false;
        if (!regexDate.test(value) || !regexDate.test(startDate)) return false;
        return new Date(options.start) <= new Date(value);
    },

    ['time'](value) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (typeof value !== 'string') return false;
        return timeRegex.test(value);
    },
}