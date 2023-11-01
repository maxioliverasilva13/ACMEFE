import Text from "@/components/Table/components/Text";
import { Categoria, CategoriaList } from "@/types/categoria";
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

export const DEFAULT_CATEGORIA_DESTACADA_IMAGE = "https://www.competethemes.com/wp-content/uploads/2015/11/one-category-front-page.png";

export const formatCategoriasToTable = (categorias: CategoriaList[]) => {
  return categorias?.map((categoria) => {
    return {
      id: categoria?.categoriaId,
      nombre: <Text message={categoria?.categoriaNombre} />,
      productos: <Text message={categoria?.cantidadProductos} />,
    };
  });
};

export const formatCategoriasToDropdown = (categorias: CategoriaList[]) => {
  return categorias?.map((cat) => {
    return {
      label: cat.categoriaNombre,
      value: cat.categoriaId,
    };
  });
};
