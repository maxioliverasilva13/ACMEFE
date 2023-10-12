"use client";

import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Usuario } from "@/types/usuario";
import { appRoutes } from "@/utils/appRoutes";
import { columnsUser, formatUsuariosToTable } from "@/utils/usuarios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useLazyListUsersQuery,
  useDeleteUserMutation,
} from "@/store/service/UserService";
import useGlobal from "@/hooks/useGlobal";

const EmpresaUsuarios = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<Usuario[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [getUserInfo, { data, isLoading }] = useLazyListUsersQuery();
  const { handleSetLoading } = useGlobal();
  const [deleteUser] = useDeleteUserMutation();

  const handleLoadUserInfo = async () => {
    handleSetLoading(true);
    const resp = await getUserInfo({});
    handleSetLoading(false);
    // console.log(resp?.data);
  };

  useEffect(() => {
    handleLoadUserInfo();
  }, []);

  const users = data ?? [];

  const handleAddUser = () => {
    push(appRoutes.empresaAddUsuarios() as any);
  };

  const userRows = formatUsuariosToTable(users);

  const handleDeleteUsers = () => {
    selectedUsers?.forEach((usr) => {
      deleteUser(usr.id);
    });

    setOpenDeleteModal(false);
    setSelectedUsers([]);
  };

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <Modal
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
          title="Usuarios"
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
