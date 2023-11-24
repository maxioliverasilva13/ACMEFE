export const separarMayusculas = (cadena: string) => {
    return cadena.replace(/([a-z])([A-Z])/g, '$1 $2');
}