import Text from "@/components/Table/components/Text";
import { TipoIva } from "@/types/tipoIva";
import { ColumnItem } from "@/types/table";
import {
  InformationCircleIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";

export const columnsTiposIva: ColumnItem[] = [
  {
    title: "Nombre",
    key: "nombre",
    icon: <InformationCircleIcon width={20} color="#A3AED0" />,
  },
  {
    title: "Porcentaje",
    key: "porcentaje",
    icon: <ReceiptPercentIcon width={20} color="#A3AED0" />,
  },
];

export const formatTiposIvaToTable = (tiposIVA: TipoIva[]) => {
  return tiposIVA?.map((tiposIVA) => {
    return {
      id: tiposIVA?.id,
      nombre: <Text message={tiposIVA?.nombre} />,
      porcentaje: <Text message={tiposIVA?.porcentaje} />,
    };
  });
};
