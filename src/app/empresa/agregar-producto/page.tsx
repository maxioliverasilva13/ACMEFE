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
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AgregarProducto = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CrearProductoForm>({
    resolver: yupResolver(CrearProductoValidationSchema()),
  });
  const [selectedCategorias, setSelectedCategorias] = useState<number[]>([]);
  const [selectedProductosRelacionados, setSelectedProductosRelacionados] = useState<number[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


  const handleNext = (data: CrearProductoForm) => {
    console.log("data", data)
  }

  const files = () => {

  }

  return (
    <div className="w-full h=auto gap-[100px] flex flex-col items-start justify-start">
      <div className="w-full h-auto flex flex-row items-center justify-between"></div>

      <div className="md:w-[800px] max-w-full m-auto h-auto rounded-[20px] flex flex-col items-start justify-start shadow-lg gap-6 md:p-10 p-5 bg-white">
        <h1 className="text-texto mb-5 font-semibold text-[30px]">
          Agregar nuevo producto
        </h1>
        <FileSelect selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
        {
            selectedFiles?.length > 0 && <div className="w-full h-auto py-4 flex flex-row items-center justify-start gap-4 max-w-full overflow-auto">
                {selectedFiles?.map((file, index) => {
                    return <div className="min-w-[200px] w-[200px] h-[130px] rounded-2xl bg-white shadow-md" key={`image-${index}`}>
                    </div>
                })}
            </div>
        }

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
              type="number"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="flex-grow w-full gap-2 flex flex-col items-start justify-start">
          <Label>Tipo Iva</Label>
          <Dropdown
            placeholder="Seleccionar Tipo IVA"
            items={[
              {
                label: "Iva 1",
                value: 1,
              },
              {
                label: "Iva 2",
                value: 2,
              },
            ]}
            onChange={(val: any) =>
              setValue(CrearProductoFormFields.tipoIva, val)
            }
          />
        </div>

        <div className="flex-grow w-full gap-2 flex flex-col items-start justify-start">
          <Label>Categorias</Label>
          <MultiSelect
            placeholder="Seleccionar Categorias"
            items={[
              {
                label: "Iva 1",
                value: 1,
              },
              {
                label: "Iva 2",
                value: 2,
              },
            ]}
            onChange={(val: any) => setSelectedCategorias(val)}
          />
        </div>

        <div className="flex-grow w-full gap-2 flex flex-col items-start justify-start">
          <Label>Productos relacionados</Label>
          <MultiSelect
            placeholder="Agrega productos relacionados"
            items={[
              {
                label: "Sarten Essen - $165",
                value: 1,
              },
              {
                label: "Play 5 - $USD500",
                value: 2,
              },
            ]}
            onChange={(val: any) => setSelectedProductosRelacionados(val)}
          />
        </div>

        <ButtonPrimary className="w-full"
            onClick={() => handleSubmit(handleNext)}
        >
            Registrar producto
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default AgregarProducto;
