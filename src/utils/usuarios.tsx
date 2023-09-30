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

export const columnsUser: ColumnItem[] = [
  {
    title: "Nombre",
    key: "name",
    icon: <UserCircleIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Email",
    key: "email",
    icon: <AtSymbolIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Telefono",
    key: "tel",
    icon: <PhoneIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Direccion",
    key: "dir",
    icon: <MapPinIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Calificaciones",
    key: "califications",
    icon: <StarIcon width={20} color="#A3AED0" />,
  },
];

export const formatUsuariosToTable = (usuarios: Usuario[]) => {
  return usuarios?.map((user) => {
    return {
      id: user?.id,
      name: (
        <div className="w-full h-auto flex flex-row items-center justify-start gap-2 ">
          <div className="w-[60px] relative h-[60px] min-w-[60px] rounded-full overflow-hidden">
            <Image
              alt="User Avatar"
              src={user?.image}
              layout="fill"
              objectFit="cover"
              className="rounded-full "
            />
          </div>
          <Text message={user?.name} />
        </div>
      ),
      email: (
        <Text message={<a href={`mailTo:${user?.email}`}>{user?.email}</a>} />
      ),
      tel: <Text message={user?.tel} />,
      dir: <Text message={user?.dir} />,
      califications: (
        <div className="w-auto h-auto flex flex-row items-center gap-2 justify-start">
          <StarIconSolid width={20} color="#bd8a00" />
          <Text message={user?.califications} />
        </div>
      ),
    };
  });
};
