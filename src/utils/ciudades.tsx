import Text from "@/components/Table/components/Text";
import { Ciudad } from "@/types/ciudad";
import { Departamento } from "@/types/departamento";
import { ColumnItem } from "@/types/table";
import {
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export const columnsCiudades: ColumnItem[] = [
  {
    title: "Nombre",
    key: "nombre",
    icon: <InformationCircleIcon width={20} color="#A3AED0" />,
  },
];

export const formatCiudadesToTable = (ciudades: Ciudad[]) => {
  return ciudades?.map((ciudad) => {
    return {
      id: ciudad?.id,
      nombre: <Text message={ciudad?.nombre} />,
    };
  });
};

export const formatDepartamentosToDropdown = (departamentos: Departamento[]) => {
  return departamentos?.map((departamento) => {
    return {
      label: departamento.nombre,
      value: departamento.id,
    };
  });
};

export const formatCiudadesToDropdown = (ciudades: Ciudad[]) => {
  return ciudades?.map((ciudad) => {
    return {
      label: ciudad.nombre,
      value: ciudad.id,
    };
  });
};
