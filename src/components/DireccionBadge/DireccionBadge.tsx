interface Props {
  calle: string;
  nroPuerta: string;
  calleEntre1: string;
  calleEntre2: string;
  ciudad: string;
  departamento: string;
}

const DireccionBadge = ({
  calle,
  nroPuerta,
  calleEntre1,
  calleEntre2,
  ciudad,
  departamento,
}: Props) => {
  return (
    <div className="w-full h-auto max-w-full flex flex-col items-start justify-start gap-1 overflow-hidden truncate">
      <span className="font-semibold text-gray-800 text-lg">{calle} {nroPuerta}</span>
      <span className="text-sm font-medium text-gray-700">{calleEntre1} {calleEntre2}</span>
      <span className="text-sm font-medium text-gray-700">{ciudad} - {departamento}</span>
    </div>
  );
};

export default DireccionBadge;
