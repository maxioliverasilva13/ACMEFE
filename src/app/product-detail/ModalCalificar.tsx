import { Dialog, Transition } from "@/app/headlessui";
import React, { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import Label from "@/components/Label/Label";
import Textarea from "@/shared/Textarea/Textarea";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useCalificarProductoMutation } from "@/store/service/ProductoService";
import useGlobal from "@/hooks/useGlobal";
import toast from "react-hot-toast";

export interface ModalCalificarProps {
  productId: number;
  show: boolean;
  onCloseModalCalificar: () => void;
}

const ModalCalificar: FC<ModalCalificarProps> = ({
  show,
  onCloseModalCalificar,
  productId,
}) => {
  const { handleSetLoading } = useGlobal();
  const [calificarProducto] = useCalificarProductoMutation();
  const [puntuacion, setPuntuacion] = useState<number>(0);
  const [comentario, setComentario] = useState<string>("");

  const handleChangeComentario = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(e.target.value);
  };

  const handleSave = async () => {
    handleSetLoading(true);
    const dataToSend = {
      productoId: productId,
      comentario: comentario,
      rate: puntuacion,
    };
    const resp = (await calificarProducto(dataToSend)) as any;
    if (!resp.error) {
      toast.success("Calificación guardada correctamente.");
    } else {
      toast.error(resp.error.data.message);
    }
    handleSetLoading(false);
  };
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onCloseModalCalificar}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block py-8 h-screen w-full max-w-xl">
              <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="headlessui-dialog-title-70"
                  >
                    Calificar producto
                  </h3>
                  <span className="absolute left-3 top-3">
                    <ButtonClose onClick={onCloseModalCalificar} />
                  </span>
                </div>
                <div className="px-8 my-5 flex justify-center flex-wrap">
                  <div className="mt-0.5 w-full flex flex-col justify-center items-center gap-2 text-yellow-500">
                    <FiveStartIconForRate
                      withHover={true}
                      defaultPoint={puntuacion}
                      setPuntuacion={setPuntuacion}
                      iconClass="w-10 h-10"
                    />
                    <span className="text-sm text-gray-600">{puntuacion}</span>
                  </div>
                  <div className="flex-grow w-full flex flex-col items-start justify-start">
                    <Label>Comentario</Label>
                    <Textarea
                      onChange={handleChangeComentario}
                      value={comentario}
                      placeholder="Comentario de la puntuación"
                      className="mt-1.5 max-h-[300px]"
                    />
                  </div>
                  <ButtonSecondary
                    onClick={handleSave}
                    className="mt-10 border border-slate-300 dark:border-slate-700 "
                  >
                    Guardar calificación
                  </ButtonSecondary>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCalificar;
