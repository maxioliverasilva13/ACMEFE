"use client";

import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Label from "@/components/Label/Label";
import Modal from "@/components/Modal";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Table from "@/components/Table/Table";
import {
  CrearCategoriaForm,
  CrearCategoriaFormFields,
  CrearCategoriaValidationSchema,
} from "@/forms/CrearCategoria";
import useGlobal from "@/hooks/useGlobal";
import ButtonDelete from "@/shared/Button/ButtonDelete";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import {
  useCrearCategoriaMutation,
  useDeleteCategoriasMutation,
  useListarCategoriasDeEmpresaQuery,
  useListarCategoriasQuery,
} from "@/store/service/CategoriaService";
import { Categoria } from "@/types/categoria";
import { columnsCategorias, formatCategoriasToTable } from "@/utils/categoria";
import { TrashIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const CategoriasPage = () => {
  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedCategorias, setSelectedCategorias] = useState<Categoria[]>([]);
  const [categoriasRelacionadas, setCategoriasRelacionadas] = useState<
    Categoria[]
  >([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const { data: categorias = [], isLoading: isLoadingCategorias } =
    useListarCategoriasQuery({});
  const [handleCrearCategoria] = useCrearCategoriaMutation();
  const [handleRemoveCategorias] = useDeleteCategoriasMutation();

  const { handleSetLoading } = useGlobal();

  const crearCategoriaForm = useForm<CrearCategoriaForm>({
    resolver: yupResolver(CrearCategoriaValidationSchema()),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = crearCategoriaForm;

  useEffect(() => {
    handleSetLoading(isLoadingCategorias);
  }, [isLoadingCategorias]);

  const userRows = formatCategoriasToTable(categorias);

  const handleDeleteCategorias = async () => {
    try {
      const selectedCatsIds = selectedCategorias?.map((cat) => cat?.id);
      if (selectedCatsIds && selectedCatsIds?.length > 0) {
        const categoriasIds = selectedCategorias?.map((cat) => cat?.id)
        const resp = (await handleRemoveCategorias(categoriasIds)) as any;
        if (resp?.data?.ok) {
          toast.success("Categorias eliminadas correctamente");
          setOpenAddModal(false);
          setOpenDeleteModal(false);
          setDisabledActivate(!disabledActivate);
          setSelectedCategorias([]);
        } else {
          throw new Error(resp?.data?.message ?? "Error al eliminar categoria");
        }

      }
    } catch (error) {
      toast.error("Error al borrar categorias");
    }

    // delete categorias on backend
  };

  const addCategoriaContent = () => {
    return (
      <FormProvider {...crearCategoriaForm}>
        <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
          {/* <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
          <AvatarSelector setFile={setSelectedFile} />
        </div> */}
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Nombre</Label>
            <Input
              {...register(CrearCategoriaFormFields.name)}
              error={errors[CrearCategoriaFormFields.name]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>

          <div className="flex-grow w-full gap-2 flex flex-col items-start justify-start">
            <Label>Categorias relacionadas</Label>
            <MultiSelect
              placeholder="Agrega categorias relacionadas"
              items={categorias?.map((cat) => {
                return {
                  label: (
                    <div className="w-full flex-grow h-auto gap-2 flex flex-row items-center justify-start">
                      <div className="flex flex-col items-start justify-center gap-0">
                        <span className="font-semibold text-gray-800">
                          {cat?.categoriaNombre}
                        </span>
                        <span className="font-medium text-sm text-green-700">
                          Cantidad productos - {cat?.cantidadProductos || 0}
                        </span>
                      </div>
                    </div>
                  ),
                  value: cat.categoriaId,
                };
              })}
              onChange={(val: any) => setCategoriasRelacionadas(val)}
            />
          </div>
        </div>
      </FormProvider>
    );
  };

  const handleNext = async (data: CrearCategoriaForm) => {
    // add backend
    try {
      handleSetLoading(true);

      const categoriasIds = categoriasRelacionadas?.map(
        (item: any) => item?.value
      );

      const dataToSend = {
        Nombre: data?.name,
        CategoriasRelacionadas: categoriasIds,
      };

      const resp = (await handleCrearCategoria(dataToSend)) as any;
      if (resp?.data?.ok) {
        toast.success("Categoria agregada correctamente");
        setOpenAddModal(false);
      } else {
        throw new Error(resp?.data?.message ?? "Error al crear categoria");
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      handleSetLoading(false);
    }
  };

  return (
    <div className="w-full h-auto flex flex-grow p-5 flex-col items-start justify-start gap-5">
      <Modal
        textOk="Sí, borrar"
        textCancel="Cancelar"
        title="¿Estás seguro que deseas borrar las categorías seleccionadas?"
        description="Esta opción no tiene retorno, ya que las categorías se borrarán del sistema y ya no se tendrá acceso a las mismas."
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
