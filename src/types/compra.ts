import { Usuario } from "./usuario";

export type SortCompra = {
    id: number;
    costoTotal : number;
    metodoPago: string;
    metodoEnvio: string;
    user? : Usuario
}