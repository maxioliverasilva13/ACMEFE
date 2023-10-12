import Text from "@/components/Table/components/Text";
import { Departamento } from "@/types/departamento";
import { ColumnItem } from "@/types/table";
import {
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const columnsDepartamentos: ColumnItem[] = [
  {
    title: "Nombre",
    key: "nombre",
    icon: <InformationCircleIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Cantidad de Ciudades",
    key: "cantCiudades",
    icon: <InformationCircleIcon width={20} color="#A3AED0" />,
  },
];

export const formatDepartamentosToTable = (departamentos: Departamento[]) => {
  return departamentos?.map((depto) => {
    return {
      id: depto?.id,
      nombre: <Text message={depto?.nombre} />,
      cantCiudades: <Text message={depto?.ciudades?.length ?? 0} />,
    };
  });
};
