import Text from "@/components/Table/components/Text";
import { Empresa } from "@/types/empresa";
import { ColumnItem } from "@/types/table";
import {
  AtSymbolIcon,
  InformationCircleIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export const columnsEmpresa: ColumnItem[] = [
  {
    title: "Nombre",
    key: "nombre",
    icon: <InformationCircleIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Direccion",
    key: "direccion",
    icon: <MapPinIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Teléfono",
    key: "telefono",
    icon: <PhoneIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Correo",
    key: "correo",
    icon: <AtSymbolIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Costo de Envío",
    key: "costoEnvio",
    icon: <TruckIcon width={20} color="#A3AED0" />,
  },
];

export const formatEmpresasToTable = (empresas: Empresa[]) => {
  return empresas?.map((empresa) => {
    return {
      id: empresa?.id,
      nombre: (
        <div className="w-full h-auto flex flex-row items-center justify-start gap-2 ">
          <div className="w-[60px] relative h-[60px] min-w-[60px] rounded-full overflow-hidden">
            <Image
              alt="Ícono de Empresa"
              src={empresa?.imagen}
              layout="fill"
              objectFit="cover"
              className="rounded-full "
            />
          </div>
          <Text message={empresa?.nombre} />
        </div>
      ),
      email: (
        <Text
          message={<a href={`mailTo:${empresa?.correo}`}>{empresa?.correo}</a>}
        />
      ),
      telefono: <Text message={empresa?.telefono} />,
      correo: <Text message={empresa?.correo} />,
      direccion: <Text message={empresa?.direccion} />,
      costoEnvio: <Text message={empresa?.costoEnvio} />,
    };
  });
};
