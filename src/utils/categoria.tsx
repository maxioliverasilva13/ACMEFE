import Text from "@/components/Table/components/Text";
import { Categoria } from "@/types/categoria";
import { ColumnItem } from "@/types/table";
import { Usuario } from "@/types/usuario";
import defaultImage from "@/images/noimage.jpg";
import {
    HashtagIcon,
  MapPinIcon,
  PhoneIcon,
  PhotoIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export const columnsCategorias: ColumnItem[] = [
  {
    title: "Id",
    key: "id",
    icon: <HashtagIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Imagen",
    key: "imagen",
    icon: <PhotoIcon width={20} color="#A3AED0" />,
  },

  {
    title: "Nombre",
    key: "nombre",
    icon: <TagIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Productos",
    key: "productos",
    icon: <ShoppingBagIcon width={20} color="#A3AED0" />,
  },
];

export const formatCategoriasToTable = (categorias: Categoria[]) => {
  return categorias?.map((categoria) => {
    return {
      id: categoria?.id,
      imagen: (
        <div className="w-[60px] relative h-[60px] min-w-[60px] rounded-full overflow-hidden">
          <Image
            alt="Categoria Avatar"
            src={categoria?.imagen ?? defaultImage?.src}
            layout="fill"
            objectFit="cover"
            className="rounded-full "
          />
        </div>
      ),
      nombre: <Text message={categoria?.nombre} />,
      productos: <Text message={categoria?.productos} />,
    };
  });
};
