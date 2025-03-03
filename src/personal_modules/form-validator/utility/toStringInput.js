export function dateTimetoStringInput(value) {
    let date;
    if (value === undefined) return undefined; 
    if (value === null) return null;
    if (typeof value === 'string') {
        if (value.trim() === '') return null;
        const regexData = /^(\d{4})-(\d{2})-(\d{2})$/;
        const regexDateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

        if (regexData.test(value)) {
            date = new Date(value + 'T00:00:00Z');
        }else if(regexDateTime.test(value)){
            return value
        } else {
            throw new Error("Date format non valido toStringInput");
        }
    } else if (value instanceof Date) {
        date = value
    } else {
        throw new Error("Tipo di dato non supportato per toStringInput");
    }

    const offset = date.getTimezoneOffset() * 60000; // Offset in millisecondi
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
}
export function dateToStringInput(value) {
    const result = dateTimetoStringInput(value);
    return result ? result.split('T')[0] : result;
}
export function timeToStringInput(value) {
    const result = dateTimetoStringInput(value);
    return result ? result.split('T')[1] : result;
}