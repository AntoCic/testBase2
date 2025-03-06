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

    ['email'](value, { min, max } = {}) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(value)) return false;

        min = min !== undefined && !isNaN(Number(min)) ? Number(min) : 2;
        max = max !== undefined && !isNaN(Number(max)) ? Number(max) : 255;
        if (typeof value !== 'string') {
            console.error('Errore no stai passando al flidValidation una stringa');
            return false
        };

        return value.length <= max && value.length >= min;
    },

    // ['number'](value, { min, max } = {}) {
    //     min = min !== undefined && !isNaN(Number(min)) ? Number(min) : 0;
    //     max = max !== undefined && !isNaN(Number(max)) ? Number(max) : 255;

    //     const intValue = parseInt(value, 10);
    //     if (isNaN(intValue)) return false;
    //     return intValue % 1 === 0 && intValue >= min && intValue <= max;
    // },
    ['number'](value, { min, max } = {}) {
        min = min !== undefined && !isNaN(Number(min)) ? Number(min) : 0;
        max = max !== undefined && !isNaN(Number(max)) ? Number(max) : 255;
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
        if (typeof value !== 'string') return false;
        const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;
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

    ['date'](value, { min, max, required } = {}) {
        if (required === true && (value === null || value === undefined || (typeof value === 'string' ? value.trim() === '' : false))) {
            return false;
        }
        let data = value instanceof Date ? value : new Date(value);
        data.setHours(0, 0, 0, 0);

        if (min && !(min instanceof Date)) min = new Date(min);
        if (max && !(max instanceof Date)) max = new Date(max);

        if (min instanceof Date && !isNaN(min)) min.setHours(0, 0, 0, 0);
        if (max instanceof Date && !isNaN(max)) max.setHours(0, 0, 0, 0);

        if ((min && data < min) || (max && data > max)) {
            return false;
        }
        return true;
    },

    ['datetime-local'](value, { min, max, required } = {}) {
        if (required === true && (value === null || value === undefined || (typeof value === 'string' ? value.trim() === '' : false))) {
            return false;
        }
        let data = value instanceof Date ? value : new Date(value);

        if (min && !(min instanceof Date)) min = new Date(min);
        if (max && !(max instanceof Date)) max = new Date(max);

        if ((min && data < min) || (max && data > max)) {
            return false;
        }
        return true;
    },

    ['endDate'](value, startDate) {
        // options deve contenere una proprietà 'start' con la data iniziale
        const regexDate = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (typeof value !== 'string' || !startDate) return false;
        if (!regexDate.test(value) || !regexDate.test(startDate)) return false;
        return new Date(options.start) <= new Date(value);
    },

    ['time'](value, { min, max, required } = {}) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (required === true && (value === null || value === undefined || (typeof value === 'string' ? !timeRegex.test(value) : false))) {
            return false;
        }
        if (!(min || max)) return true;

        const toMinutes = (time) => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };
        const timeValue = toMinutes(value);
        if (min) {
            if (typeof min === 'string' && timeRegex.test(min)) {
                const minValue = min ? toMinutes(min) : null;
                if (minValue !== null && timeValue < minValue) {
                    return false;
                }
            } else { throw new Error("time min non è corretto"); }
        }
        if (max) {
            if (typeof max === 'string' && timeRegex.test(max)) {
                const maxValue = max ? toMinutes(max) : null;
                if (maxValue !== null && timeValue > maxValue) {
                    return false;
                }
            } else { throw new Error("time max non è corretto"); }
        }
        return true;
    },
    ['select'](value, { } = {}) { return value !== null; },
    ['radio'](value, { } = {}) { return value !== null; }
}