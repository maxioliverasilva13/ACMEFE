"use client";

import ModalDelete from "@/components/ModalDelete";
import Table from "@/components/Table/Table";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Usuario } from "@/types/usuario";
import { appRoutes } from "@/utils/appRoutes";
import { columnsUser, formatUsuariosToTable } from "@/utils/usuarios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EmpresaUsuarios = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<Usuario[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleAddUser = () => {
    push(appRoutes.empresaAddUsuarios() as any);
  };

  const mockLostOfUsers: Usuario[] = [
    {
      id: 1,
      image: "https://i.pravatar.cc/150?img=61",
      name: "Maximiliano",
      tel: "Tel 1",
      dir: "Direccion 1",
      califications: 5,
    },
    {
      id: 2,
      image: "https://i.pravatar.cc/150?img=55",
      name: "Gustavo",
      tel: "Tel 2",
      dir: "Direccion 2",
      califications: 1,
    },
    {
      id: 3,
      image: "https://i.pravatar.cc/150?img=13",
      name: "Maximiliano",
      tel: "Tel 1",
      dir: "Direccion 2",
      califications: 3,
    },
  ];

  const userRows = formatUsuariosToTable(mockLostOfUsers);

  const handleDeleteUsers = () => {
    setOpenDeleteModal(false);
    setSelectedUsers([]);
    // delete users on backend
  }

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <ModalDelete
        textOk="Si, borrar"
        textCancel="Cancelar"
        title="Estas seguro que deseas borrar los usuarios eleccionados"
        description="Esta opcion no  tiene retorno, ya que los usuarios se borraran del sistema y ya no tendran acceso al mismo"
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeleteUsers()}
      />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedUsers?.length > 0 && (
          <ButtonDelete
            icon={<TrashIcon width={20} color="white" />}
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Borrar Seleccionados
          </ButtonDelete>
        )}
        <ButtonSecondary onClick={() => setDisabledActivate(!disabledActivate)}>
          {disabledActivate ? "Deshabilitar seleccion" : "Habilitar seleccion"}
        </ButtonSecondary>
        <ButtonPrimary onClick={() => handleAddUser()}>
          Agregar Usuario
        </ButtonPrimary>
      </div>
      <div className="mt-4 w-full">
        <Table
          multiDisabled={disabledActivate}
          title="Listado de usuarios"
          data={userRows}
          cols={columnsUser}
          setSelectedItems={setSelectedUsers}
          selectedItems={selectedUsers}
        />
      </div>
    </div>
  );
};

export default EmpresaUsuarios;
