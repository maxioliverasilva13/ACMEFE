"use client";

import ModalDelete from "@/components/Modal";
import Table from "@/components/Table/Table";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Empresa } from "@/types/empresa";
import { appRoutes } from "@/utils/appRoutes";
import { columnsEmpresa, formatEmpresasToTable } from "@/utils/empresas";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminEmpresas = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleAddEmpresa = () => {
    push(appRoutes.adminAddEmpresas() as any);
  };

  const empresas: Empresa[] = [
    {
      id: 1,
      nombre: "Genexus Corp",
      direccion: "Liniers 3788",
      correo: "administration@genexus.com",
      telefono: "4332 5599",
      imagen: "https://i.pravatar.cc/150?img=01",
      costoEnvio: 250,
      wallet: "0x2545151a551d155ad1515ada15da155da51da45614ad465a6d",
    },
    {
      id: 2,
      nombre: "Microsoft",
      direccion: "Gral. Flores 7822",
      correo: "administration@genexus.com",
      telefono: "4228 5587",
      imagen: "https://i.pravatar.cc/150?img=18",
      costoEnvio: 300,
      wallet: "0x0525454261321564115645ds5d41s55465456465465456456",
    },
    {
      id: 3,
      nombre: "Apple",
      direccion: "Genexus Corp",
      correo: "administration@genexus.com",
      telefono: "4165 2396",
      imagen: "https://i.pravatar.cc/150?img=20",
      costoEnvio: 200,
      wallet: "0x45d4d5s4d5s4654654654d6s5d4s65d4654654879879878798",
    },
  ];

  const rowEmpresas = formatEmpresasToTable(empresas);

  const handleDeleteEmpresas = () => {
    setOpenDeleteModal(false);
    setSelectedEmpresas([]);
  };

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <ModalDelete
        textOk="Sí, borrar"
        textCancel="Cancelar"
        title="¿Estás seguro de que deseas borrar las empresas seleccionadas?"
        description="Esta opción no tiene retorno, ya que las empresas seleccionadas se borrarán del sistema."
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeleteEmpresas()}
      />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedEmpresas?.length > 0 && (
          <ButtonDelete
            icon={<TrashIcon width={20} color="white" />}
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
            type="button"
          >
            Borrar Seleccionados
          </ButtonDelete>
        )}
        <ButtonSecondary onClick={() => setDisabledActivate(!disabledActivate)} type="button">
          {disabledActivate ? "Deshabilitar seleccion" : "Habilitar seleccion"}
        </ButtonSecondary>
        <ButtonPrimary onClick={() => handleAddEmpresa()} type="button">
          Agregar Empresa
        </ButtonPrimary>
      </div>
      <div className="mt-4 w-full">
        <Table
          multiDisabled={disabledActivate}
          title="Listado de empresas"
          data={rowEmpresas}
          cols={columnsEmpresa}
          setSelectedItems={setSelectedEmpresas}
          selectedItems={selectedEmpresas}
        />
      </div>
    </div>
  );
};

export default AdminEmpresas;
