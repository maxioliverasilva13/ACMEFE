import { SortProduct } from "@/types/producto";
import { EstadReclamo, Reclamo } from "@/types/reclamo";
import { SortUser } from "@/types/usuario";
import moment from "moment";
import 'moment/locale/es'; 

moment.locale('es');


const usuarios: SortUser[] = [
  {
    email: "usuario1@example.com",
    nombre: "Usuario 1",
    imagen: "https://i.pravatar.cc/150?img=60",
    tel: "123-456-7890",
  },
  {
    email: "usuario2@example.com",
    nombre: "Usuario 2",
    imagen: "https://i.pravatar.cc/150?img=33",
    tel: "987-654-3210",
  },
];

const productos: SortProduct[] = [
  {
    nombre: "Producto 1",
    imagen: "https://i.pravatar.cc/150?img=12",
    precio: 19.99,
  },
  {
    nombre: "Producto 2",
    imagen: "https://i.pravatar.cc/150?img=23",
    precio: 29.99,
  },
];

export const generateRandomReclamos = (): Reclamo[] => {
  const reclamos: Reclamo[] = [];

  for (let i = 0; i < 10; i++) {
    const randomUsuario = usuarios[Math.floor(Math.random() * usuarios.length)];
    const randomProducto =
      productos[Math.floor(Math.random() * productos.length)];

    const nuevoReclamo: Reclamo = {
      fecha: moment(new Date()).subtract(i, "days").fromNow().toString(), // Puedes ajustar la fecha según tus necesidades
      producto: randomProducto,
      usuario: randomUsuario,
      description: `Descripción del reclamo ${i + 1}`,
      estado: i % 2 === 0 ? EstadReclamo.activo : EstadReclamo.cerrado, // Por defecto, establecemos el estado como "Activo"
    };

    reclamos.push(nuevoReclamo);
  }
  return reclamos;
};


export const dividirReclamosPorFecha = (reclamos: Reclamo[]): { [fecha: string]: Reclamo[] } => {
    const reclamosPorFecha: { [fecha: string]: Reclamo[] } = {};

    for (const reclamo of reclamos) {
      const fecha = reclamo.fecha;
  
      if (!reclamosPorFecha[fecha]) {
        reclamosPorFecha[fecha] = [];
      }
  
      reclamosPorFecha[fecha].push(reclamo);
    }
  
    return reclamosPorFecha;
  }