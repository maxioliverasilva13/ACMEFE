import Text from "@/components/Table/components/Text";
import { Pickup } from "@/types/pickup";
import { ColumnItem } from "@/types/table";
import Image from "next/image";
import defaultImage from "@/images/noimage.jpg";
import {
  HashtagIcon,
  MapPinIcon,
  PhoneIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import DireccionBadge from "@/components/DireccionBadge/DireccionBadge";

export const columnsPickups: ColumnItem[] = [
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
    title: "Telefono",
    key: "telefono",
    icon: <PhoneIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Direccion",
    key: "direccion",
    icon: <MapPinIcon width={20} color="#A3AED0" />,
  },
];

export const formatPickupsToTable = (pickup: Pickup[]) => {
  return pickup?.map((pickup) => {
    return {
      id: pickup?.id,
      nombre: (
        <div className="flex flex-row items-center justify-start gap-2 max-w-full">
          <div className="w-[60px] relative h-[60px] min-w-[60px] rounded-full overflow-hidden">
            <Image
              alt="Categoria Avatar"
              src={pickup?.foto ?? defaultImage?.src}
              layout="fill"
              objectFit="cover"
              className="rounded-full "
            />
          </div>
          <Text message={pickup?.nombre} />
        </div>
      ),
      direccion: (
        <DireccionBadge
          calle={pickup?.calle}
          nroPuerta={pickup?.nroPuerta}
          calleEntre1={pickup?.calleEntre1}
          calleEntre2={pickup?.calleEntre2}
          ciudad={"San Jose de mayo"}
          departamento={"San jose"}
        />
      ),
      productos: <Text message={pickup?.plazoDiasPreparacion} />,
      telefono: <Text message={pickup?.telefono} />,
    };
  });
};
