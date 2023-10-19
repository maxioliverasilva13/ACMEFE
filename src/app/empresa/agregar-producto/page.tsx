"use client";

import Dropdown from "@/components/Dropdown/Dropdown";
import FileSelect from "@/components/FileSelect/FileSelect";
import Label from "@/components/Label/Label";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import {
  CrearProductoForm,
  CrearProductoFormFields,
  CrearProductoValidationSchema,
} from "@/forms/CrearProducto";
import useGlobal from "@/hooks/useGlobal";
import useUploadImage from "@/hooks/useUploadFile";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { useListarCategoriasQuery } from "@/store/service/CategoriaService";
import {
  useCrearProductoMutation,
  useListarMisProductosEmpresaQuery,
} from "@/store/service/ProductoService";
import { useListarTiposIvaQuery } from "@/store/service/TipoIvaService";
import { CategoriaList } from "@/types/categoria";
import { PRODUCT_NO_IMAGE } from "@/utils/usuarios";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AgregarProducto = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CrearProductoForm>({
    resolver: yupResolver(CrearProductoValidationSchema()),
  });
  const { handleSetLoading } = useGlobal();
  const { data: categorias, isLoading: isLoadingCategorias } =
    useListarCategoriasQuery({});
  const { data: tiposIva, isLoading: isLoadingTiposIva } =
    useListarTiposIvaQuery({});
  const { data: productos = [], isFetching: isLoadingProductos } =
    useListarMisProductosEmpresaQuery({});

  const [selectedCategorias, setSelectedCategorias] = useState<number[]>([]);
  const [selectedProductosRelacionados, setSelectedProductosRelacionados] =
    useState<number[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<any>({});
  const { handleUpload } = useUploadImage();
  const [handleCreateProduct] = useCrearProductoMutation();

  useEffect(() => {
    handleSetLoading(
      isLoadingCategorias || isLoadingTiposIva || isLoadingProductos
    );
  }, [isLoadingCategorias, isLoadingTiposIva, isLoadingProductos]);

  const handleNext = async (data: CrearProductoForm) => {
    if (selectedCategorias?.length === 0) {
      toast.error("Selecciona al menos una cateogira");
    }
    try {
      handleSetLoading(true);
      const productImages: string[] = [];
      await Promise.all(
        selectedFiles?.map(async (item) => {
          const fileUrl = await handleUpload(item);
          if (fileUrl) {
            productImages?.push(fileUrl);
          }
        })
      );

      const dataToSend = {
        Nombre: data.nombre,
        Descripcion: data.descripcion,
        DocumentoPdf: data.documentoPdf,
        Precio: data?.precio,
        TipoIva: data?.tipoIva,
        Categoria: selectedCategorias,
        ProductosRelacionados: selectedProductosRelacionados,
        Imagenes: productImages,
      };
      const resp = (await handleCreateProduct(dataToSend)) as any;
      if (resp?.data?.ok) {
        toast.success("Producto creado correctamente");
      } else {
        toast.error("Error al crear producto", resp?.data?.message);
      }

      handleSetLoading(false);
    } catch (error) {
      handleSetLoading(false);
      console.error("Error al crear producto");
    }

    // send to backend
  };

  const getPreview = (file: File, index: number) => {
    const reader = new FileReader();
    reader.onload = function (e: any) {
      setPreviews({
        ...previews,
        [index]: e.target.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const removeItem = (file: File, index: number) => {
    setSelectedFiles(selectedFiles?.filter((fil) => fil !== file));
    setPreviews({
      ...previews,
      [index]: null,
    });
  };

  return (
    <div className="w-full h=auto gap-[100px] flex flex-col items-start justify-start">
      <div className="w-full h-auto flex flex-row items-center justify-between"></div>

      <div className="md:w-[800px] max-w-full m-auto h-auto rounded-[20px] flex flex-col items-start justify-start shadow-lg gap-6 md:p-10 p-5 bg-white">
        <h1 className="text-texto mb-5 font-semibold text-[30px]">
          Agregar nuevo producto
        </h1>
        <FileSelect
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
        {selectedFiles?.length > 0 && (
          <div className="w-full h-auto py-4 flex flex-row items-center justify-start gap-4 max-w-full flex-wrap overflow-auto">
            {selectedFiles?.map((file, index) => {
              if (!previews[index]) {
                getPreview(file, index);
              }
              return (
                <div
                  className="min-w-[200px] w-[200px] relative h-[130px] rounded-2xl bg-white shadow-md"
                  key={`image-${index}`}
                >
                  <XMarkIcon
                    fontSize={20}
                    color="black"
                    className="absolute p-2 rounded-full bg-white shadow-md hover:bg-red-300 cursor-pointer transition-all hover:text-white w-[28px] h-[28px] -top-2 -right-2 z-20"
                    onClick={() => removeItem(file, index)}
                  />
                  {previews[index] && (
                    <img
                      src={previews[index]}
                      alt={`Image-${index}`}
                      className="w-full h-full object-cover rounded-2xl absolute"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex w-full flex-row items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Nombre</Label>
            <Input
              {...register(CrearProductoFormFields.nombre)}
              error={errors[CrearProductoFormFields.nombre]?.message}
              placeholder="Nombre del producto"
              type="text"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Titulo</Label>
            <Input
              {...register(CrearProductoFormFields.titulo)}
              error={errors[CrearProductoFormFields.titulo]?.message}
              placeholder="Titulo del producto"
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Descripcion</Label>
            <Textarea
              {...register(CrearProductoFormFields.descripcion)}
              error={errors[CrearProductoFormFields.descripcion]?.message}
              placeholder="Descripcion del producto"
              className="mt-1.5 max-h-[300px]"
            />
          </div>
        </div>
        <div className="flex-grow w-full flex flex-col items-start justify-start">
          <Label>Documento PDF</Label>
          <Input
            {...register(CrearProductoFormFields.documentoPdf)}
            error={errors[CrearProductoFormFields.documentoPdf]?.message}
            placeholder="DocumentoPDF"
            type="text"
            className="mt-1.5"
          />
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Precio</Label>
            <Input
              {...register(CrearProductoFormFields.precio)}
              error={errors[CrearProductoFormFields.precio]?.message}
              placeholder="Precio del producto"
              className="mt-1.5"
              type="text"
            />
          </div>

          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Link Ficha</Label>
            <Input
              {...register(CrearProductoFormFields.linkAcata)}
              error={errors[CrearProductoFormFields.linkAcata]?.message}
              placeholder="Link de la ficha del producto"
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="flex-grow w-full gap-2 flex flex-col items-start justify-start">
          <Label>Tipo Iva</Label>
          <Dropdown
            placeholder="Seleccionar Tipo IVA"
            items={
              tiposIva?.map((item) => {
                return {
                  label: `${item.nombre} - %${item.porcentaje}`,
                  value: item?.id,
                };
              }) ?? []
            }
            onChange={(val: any) =>
              setValue(CrearProductoFormFields.tipoIva, val)
            }
          />
        </div>

        <div className="flex-grow w-full gap-2 flex flex-col items-start justify-start">
          <Label>Categorias</Label>
          <MultiSelect
            placeholder="Seleccionar Categorias"
            items={
              categorias?.map((item) => {
                return {
                  label: item?.categoriaNombre,
                  value: item?.categoriaId,
                };
              }) ?? []
            }
            onChange={(val: any) =>
              setSelectedCategorias(val?.map((itm: any) => itm?.value))
            }
          />
        </div>

        <div className="flex-grow w-full gap-2 flex flex-col items-start justify-start">
          <Label>Productos relacionados</Label>
          <MultiSelect
            placeholder="Agrega productos relacionados"
            items={productos?.map((prod) => {
              return {
                label: (
                  <div className="w-full flex-grow h-auto gap-2 flex flex-row items-center justify-start">
                    <img
                      className="fit-cover w-10 h-10 rounded-full shadow-sm"
                      src={prod?.imagenes[0]?.url || PRODUCT_NO_IMAGE}
                    />
                    <div className="flex flex-col items-start justify-center gap-0">
                      <span className="font-semibold text-gray-800">
                        {prod.nombre}
                      </span>
                      <span className="font-medium text-sm text-green-700">
                        ${prod.precio || 0}
                      </span>
                    </div>
                  </div>
                ),
                value: prod.id,
              };
            })}
            onChange={(val: any) => setSelectedProductosRelacionados(val?.id)}
          />
        </div>

        <ButtonPrimary className="w-full" onClick={handleSubmit(handleNext)}>
          Registrar producto
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default AgregarProducto;
