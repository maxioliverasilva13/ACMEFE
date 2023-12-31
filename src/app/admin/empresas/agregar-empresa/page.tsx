"use client";

import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Label from "@/components/Label/Label";
import {
  CrearEmpresaForm,
  CrearEmpresaFormFields,
  CrearEmpresaValidationSchema,
} from "@/forms/CrearEmpresaForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobal from "@/hooks/useGlobal";
import toast from "react-hot-toast";
import { useCreateEmpresaMutation } from "@/store/service/EmpresaService";

import { DEFAULT_EMPRESA_IMAGE } from "@/utils/empresas";
import useUploadImage from "@/hooks/useUploadFile";
import { Sketch } from "@uiw/react-color";

const AgregarEmpresa = () => {
  const { handleUpload } = useUploadImage();

  const [selectedFile, setFileSelected] = useState<File>();
  const [selectedColors, setSelectedColors] = useState<{
    main: string;
    secondary: string;
    background: string;
  }>({
    main: "#332f7f",
    secondary: "#95d5c7",
    background: "#ffffff",
  });

  const [openPickers, setOpenPickers] = useState<{
    main: boolean;
    secondary: boolean;
    background: boolean;
  }>({
    main: false,
    secondary: false,
    background: false,
  });

  const createEmpresaForm = useForm<CrearEmpresaForm>({
    resolver: yupResolver(CrearEmpresaValidationSchema()),
  });

  const [createEmpresa] = useCreateEmpresaMutation();
  const { handleSetLoading } = useGlobal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = createEmpresaForm;

  const clearForm = () => {
    createEmpresaForm.setValue("nombre", "");
    createEmpresaForm.setValue("direccion", "");
    createEmpresaForm.setValue("telefono", "");
    createEmpresaForm.setValue("correo", "");
    createEmpresaForm.setValue("costoEnvio", 0);
    createEmpresaForm.setValue("wallet", "");
    createEmpresaForm.setValue("nombreUsuarioAdmin", "");
    createEmpresaForm.setValue("telefonoUsuarioAdmin", "");
    createEmpresaForm.setValue("emailUsuarioAdmin", "");
    setFileSelected(undefined);
  };

  const handleNext = async (empresaFrom: CrearEmpresaForm) => {
    try {
      handleSetLoading(true);
      let imageToUse = DEFAULT_EMPRESA_IMAGE;
      if (selectedFile) {
        imageToUse =
          (await handleUpload(selectedFile)) ?? DEFAULT_EMPRESA_IMAGE;
      }
      const response: any = await createEmpresa({
        ...empresaFrom,
        Imagen: imageToUse,
        colorPrincipal: selectedColors.main,
        colorSecundario: selectedColors.secondary,
        colorFondo: selectedColors.background,
      });
      if (response.error) {
        const messageError = response.error.data;
        handleSetLoading(false);
        toast.error(messageError);
        return;
      }
      toast.success(`Empresa creada correctamente`);
      handleSetLoading(false);
      createEmpresaForm.reset(empresaFrom);
      createEmpresaForm.clearErrors();
      clearForm();
    } catch (e) {
      handleSetLoading(false);
      toast.error("Ha ocurrido un error inesperado!");
    }
  };

  const togglePicker = (picker: string) => {
    setOpenPickers((prevState: any) => ({
      ...prevState,
      [picker]: !prevState[picker],
    }));
  };

  const handleColorChange = (picker: string, color: string) => {
    setSelectedColors((prevState) => ({
      ...prevState,
      [picker]: color,
    }));
  };

  return (
    <div className="w-full flex-grow p-5 h-auto flex flex-col gap-10 items-start justify-start">
      <h1 className="font-semibold text-texto text-[30px] ">
        Agregar nueva empresa
      </h1>

      <div className="w-full flex flex-col xl:flex-row gap-5">
        <div className="w-full xl:w-1/2 h-auto rounded-[20px] flex flex-col items-start justify-start shadow-lg gap-6 md:p-10 p-5 bg-white">
          <div className="w-full h-auto flex items-center justify-center gap-4">
            <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
              <div className="flex-grow w-full flex flex-col items-start justify-start">
                <Label>Nombre</Label>
                <Input
                  {...register(CrearEmpresaFormFields.nombre)}
                  error={errors[CrearEmpresaFormFields.nombre]?.message}
                  type="text"
                  className="mt-1.5"
                />
              </div>
              <div className="flex-grow w-full flex flex-col items-start justify-start">
                <Label>Dirección</Label>
                <Input
                  {...register(CrearEmpresaFormFields.direccion)}
                  error={errors[CrearEmpresaFormFields.direccion]?.message}
                  type="text"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex items-center justify-center gap-4">
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Telefono</Label>
              <Input
                {...register(CrearEmpresaFormFields.telefono)}
                error={errors[CrearEmpresaFormFields.telefono]?.message}
                type="text"
                className="mt-1.5"
              />
            </div>
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Correo electrónico de Empresa</Label>
              <Input
                {...register(CrearEmpresaFormFields.correo)}
                error={errors[CrearEmpresaFormFields.correo]?.message}
                type="email"
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Costo de Envío</Label>
            <Input
              {...register(CrearEmpresaFormFields.costoEnvio)}
              error={errors[CrearEmpresaFormFields.costoEnvio]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Wallet de Ethereum</Label>
            <Input
              {...register(CrearEmpresaFormFields.wallet)}
              error={errors[CrearEmpresaFormFields.wallet]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="flex flex-col w-full xl:w-1/2">
          <div className="xl:mt-0 mt-5 w-full md:w-full">
            <h1 className="font-semibold text-texto text-[20px] ">
              Usuario administrador por defecto
            </h1>
            <div className="mt-5 w-full h-auto rounded-[20px] flex flex-col items-start justify-start shadow-lg gap-6 md:p-10 p-5 bg-white">
              <div className="w-full h-auto flex items-center justify-center gap-4">
                <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
                  <div className="flex-grow w-full flex flex-col items-start justify-start">
                    <Label>Nombre</Label>
                    <Input
                      {...register(CrearEmpresaFormFields.nombreUsuarioAdmin)}
                      error={
                        errors[CrearEmpresaFormFields.nombreUsuarioAdmin]
                          ?.message
                      }
                      type="text"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full h-auto flex items-center justify-center gap-4">
                <div className="flex-grow w-full flex flex-col items-start justify-start">
                  <Label>Telefono</Label>
                  <Input
                    {...register(CrearEmpresaFormFields.telefonoUsuarioAdmin)}
                    error={
                      errors[CrearEmpresaFormFields.telefonoUsuarioAdmin]
                        ?.message
                    }
                    type="text"
                    className="mt-1.5"
                  />
                </div>
                <div className="flex-grow w-full flex flex-col items-start justify-start">
                  <Label>Correo electrónico</Label>
                  <Input
                    {...register(CrearEmpresaFormFields.emailUsuarioAdmin)}
                    error={
                      errors[CrearEmpresaFormFields.emailUsuarioAdmin]?.message
                    }
                    type="email"
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <h1 className="font-semibold text-texto text-[20px] ">
              Look and Feel de la Tienda
            </h1>
            <div className="mt-5 w-full h-auto rounded-[20px] flex flex-wrap items-start justify-center shadow-lg gap-6 md:p-10 p-5 bg-white">
              <div className="flex flex-col items-center gap-2">
                <Label>Logo de la Empresa</Label>
                <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
                  <AvatarSelector
                    setFile={setFileSelected}
                    defaultImage={DEFAULT_EMPRESA_IMAGE}
                  />
                </div>
              </div>
              <div className="flex-grow w-full flex flex-col items-start justify-start">
                <Label>Color Principal</Label>
                <div
                  className="w-full h-11 px-4 py-3 transition-all cursor-pointer relative rounded-2xl flex items-center justify-center border-2 border-neutral-200"
                  style={{ backgroundColor: selectedColors.main }}
                  onClick={() => togglePicker("main")}
                >
                  <div className="w-auto h-auto absolute top-4 left-4 z-10">
                    {openPickers.main && (
                      <Sketch
                        color={selectedColors.main}
                        onChange={(color: any) => {
                          handleColorChange("main", color?.hex);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-grow w-full flex flex-col items-start justify-start">
                <Label>Color Secundario</Label>
                <div
                  className="w-full h-11 px-4 py-3 transition-all cursor-pointer relative rounded-2xl flex items-center justify-center border-2 border-neutral-200"
                  style={{ backgroundColor: selectedColors.secondary }}
                  onClick={() => togglePicker("secondary")}
                >
                  <div className="w-auto h-auto absolute top-0 left-0 z-10">
                    {openPickers.secondary && (
                      <Sketch
                        color={selectedColors.secondary}
                        onChange={(color: any) => {
                          handleColorChange("secondary", color?.hex);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-grow w-full flex flex-col items-start justify-start">
                <Label>Color de Fondo</Label>
                <div
                  className="w-full h-11 px-4 py-3 transition-all cursor-pointer relative rounded-2xl flex items-center justify-center border-2 border-neutral-200"
                  style={{ backgroundColor: selectedColors.background }}
                  onClick={() => togglePicker("background")}
                >
                  <div className="w-auto h-auto absolute top-0 left-0 z-10">
                    {openPickers.background && (
                      <Sketch
                        color={selectedColors.background}
                        onChange={(color: any) => {
                          handleColorChange("background", color?.hex);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-center">
        <ButtonPrimary onClick={handleSubmit(handleNext)} type="button">
          Agregar Empresa
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default AgregarEmpresa;
