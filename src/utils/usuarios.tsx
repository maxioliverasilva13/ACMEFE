import Text from "@/components/Table/components/Text";
import { ColumnItem } from "@/types/table";
import { Usuario } from "@/types/usuario";
import {
  AtSymbolIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";

export const DEFAULT_USER_IMAGE =
  "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png";

export const PRODUCT_NO_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";


export const columnsUser: ColumnItem[] = [
  {
    title: "Nombre",
    key: "nombre",
    icon: <UserCircleIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Email",
    key: "email",
    icon: <AtSymbolIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Telefono",
    key: "celular",
    icon: <PhoneIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Calificaciones",
    key: "calificaciones",
    icon: <StarIcon width={20} color="#A3AED0" />,
  },
];

export const formatUsuariosToTable = (usuarios: Usuario[]) => {
  return usuarios?.map((user) => {
    return {
      id: user?.id,
      nombre: (
        <div className="w-full h-auto flex flex-row items-center justify-start gap-2 ">
          <div className="w-[60px] relative h-[60px] min-w-[60px] rounded-full overflow-hidden">
            <Image
              alt="User Avatar"
              src={user?.imagen}
              layout="fill"
              objectFit="cover"
              className="rounded-full "
            />
          </div>
          <Text message={user?.nombre} />
        </div>
      ),
      email: (
        <Text message={<a href={`mailTo:${user?.email}`}>{user?.email}</a>} />
      ),
      celular: <Text message={<a href={`tel:${user?.celular}`}>{user?.celular}</a>} />,
      calificaciones: (
        <div className="w-auto h-auto flex flex-row items-center gap-2 justify-start">
          <StarIconSolid width={20} color="#bd8a00" />
          <Text message={user?.calificaciones} />
        </div>
      ),
    };
  });
};

export const getUserRoleText = (user: any) => {
  const roles = user?.roles;
  if (user && roles?.includes("Admin")) {
    return "Administrador";
  } else if (user && roles?.includes("Vendedor")) {
    return "Vendedor";
  } else {
    return "Usuario";
  }
};
