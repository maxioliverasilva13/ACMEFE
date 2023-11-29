"use client";
import Modal from "@/components/Modal";
import { useLottie } from "lottie-react";
import paymentSuccessLottie from "../../../../lotties/paymentSuccess.json";
import { appRoutes } from "@/utils/appRoutes";
import { useRouter } from "next/navigation";

interface Props {
  setOpen: any;
  compraId: any;
}

const PaymentSuccessModal = ({ setOpen, compraId }: Props) => {
  const router = useRouter();
  const options = {
    animationData: paymentSuccessLottie,
    loop: true,
  };

  const { View } = useLottie(options);
  const handleGoToCompra = () => {
    router.push(appRoutes.ordenesDetailWithId(compraId) as any);
    // TODO: redirect to compra
  };

  return (
    <Modal
      textOk="Ver compra"
      textCancel="Cerrar"
      title="Compra realizada correctamente"
      content={<div className="w-[320px] h-auto mx-auto">{View}</div>}
      contentTop
      description="Tu compra se realizo correctamente, visita la pagina de la informacion para obtener mas detalles de la misma"
      onCloseModalDelete={() => setOpen(false)}
      show={true}
      onConfirm={() => handleGoToCompra()}
    />
  );
};

export default PaymentSuccessModal;
