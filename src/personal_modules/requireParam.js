export default function requireParam(param) {
    const error = `Il parametro "${param}" è obbligatorio`;
    console.error(error);
    return undefined
}