"use client";

import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Label from "@/components/Label/Label";
import Modal from "@/components/Modal";
import Table from "@/components/Table/Table";
import {
  CrearCategoriaForm,
  CrearCategoriaFormFields,
  CrearCategoriaValidationSchema,
} from "@/forms/CrearCategoria";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import { Categoria } from "@/types/categoria";
import { columnsCategorias, formatCategoriasToTable } from "@/utils/categoria";
import { TrashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CategoriasPage = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedCategorias, setSelectedCategorias] = useState<Categoria[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CrearCategoriaForm>({
    resolver: yupResolver(CrearCategoriaValidationSchema()),
  });

  const mockLostOfCategorias: Categoria[] = [
    {
      id: 1,
      imagen: "https://i.pravatar.cc/150?img=61",
      nombre: "Maximiliano",
      productos: 0,
    },
    {
      id: 2,
      imagen: "https://i.pravatar.cc/150?img=55",
      nombre: "Gustavo",
      productos: 5,
    },
    {
      id: 3,
      imagen: "https://i.pravatar.cc/150?img=13",
      nombre: "Pepe",
      productos: 0,
    },
  ];

  const userRows = formatCategoriasToTable(mockLostOfCategorias);

  const handleDeleteCategorias = () => {
    setOpenDeleteModal(false);
    setSelectedCategorias([]);
    // delete users on backend
  };

  const addCategoriaContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
          <AvatarSelector setFile={setSelectedFile} />
        </div>
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Nombre</Label>
          <Input
            {...register(CrearCategoriaFormFields.name)}
            error={errors[CrearCategoriaFormFields.name]?.message}
            type="text"
            className="mt-1.5"
          />
        </div>
      </div>
    );
  };

  const handleNext = (data: any) => {
    // add backend
    console.log("data is", data);
  };

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <Modal
        textOk="Si, borrar"
        textCancel="Cancelar"
        title="Estas seguro que deseas borrar las categorias eleccionados"
        description="Esta opcion no  tiene retorno, ya que las categorias se borraran del sistema y ya no tendran acceso al mismo"
        onCloseModalDelete={() => setOpenDeleteModal(false)}
        show={openDeleteModal}
        onConfirm={() => handleDeleteCategorias()}
      />

      <Modal
        textOk="Agregar"
        textCancel="Cancelar"
        title="Agregar nueva categoria"
        description="Esta categoria sera unica para esta empresa y podras usarla para cualquier producto"
        onCloseModalDelete={() => setOpenAddModal(false)}
        show={openAddModal}
        content={addCategoriaContent()}
        onConfirm={handleSubmit(handleNext)}
      />
      <div className="w-full h-auto gap-4 flex flex-row items-center justify-end">
        {selectedCategorias?.length > 0 && (
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
        <ButtonPrimary onClick={() => setOpenAddModal(true)}>
          Agregar Categoria
        </ButtonPrimary>
      </div>
      <div className="mt-4 w-full">
        <Table
          multiDisabled={disabledActivate}
          title="Listado de categorias"
          data={userRows}
          cols={columnsCategorias}
          setSelectedItems={setSelectedCategorias}
          selectedItems={selectedCategorias}
        />
      </div>
    </div>
  );
};

export default CategoriasPage;
