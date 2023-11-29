"use client";

import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import useEmpresa from "@/hooks/useEmpresa";
import Label from "@/components/Label/Label";
import { Sketch } from "@uiw/react-color";
import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { LookAndFeel } from "@/types/lookAndFeel";
import Input from "@/shared/Input/Input";
import Modal from "@/components/Modal";
import { CategoriaDestacada, CategoriaList } from "@/types/categoria";
import { useListarCategoriasDeEmpresaQuery } from "@/store/service/CategoriaService";
import useGlobal from "@/hooks/useGlobal";
import Dropdown from "@/components/Dropdown/Dropdown";
import { formatCategoriasToDropdown } from "@/utils/categoria";
import { DEFAULT_CATEGORIA_DESTACADA_IMAGE } from "@/utils/categoria";
import useUploadImage from "@/hooks/useUploadFile";
import { DEFAULT_EMPRESA_IMAGE } from "@/utils/empresas";
import { useEditLookAndFeelMutation } from "@/store/service/EmpresaService";
import toast from "react-hot-toast";

const ModificarLookAndFeel = () => {
  const { currentEmpresa } = useEmpresa();
  const { handleSetLoading } = useGlobal();
  const { handleUpload } = useUploadImage();
  const [editLookAndFeel] = useEditLookAndFeelMutation();

  const { data: categorias, isLoading: isLoadingCategorias } =
    useListarCategoriasDeEmpresaQuery(currentEmpresa?.id);

  const categoriaDestacada = currentEmpresa?.lookAndFeel?.categoriaDestacada;
  const [openSelectModal, setOpenSelectModal] = useState<boolean>(false);

  const [nombreSitioValue, setNombreSitioValue] = useState<string>(
    currentEmpresa?.lookAndFeel?.nombreSitio || ""
  );
  const [nombreCategoriaDestacadaValue, setNombreCategoriaDestacadaValue] =
    useState<string>(categoriaDestacada?.nombre || "");
  const [plazoDias, setPlazoDias] = useState<number>(currentEmpresa?.diasEmail ?? 0);
  const [empresaFile, setEmpresaFile] = useState<File>();
  const [selectedCategoryFile, setSelectedCategoryFile] = useState<File>();
  const [selectedCategoria, setSelectedCategoria] = useState<
    CategoriaList | undefined
  >();
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [errores, setErrores] = useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<{
    main: string;
    secondary: string;
    background: string;
  }>({
    main: currentEmpresa?.lookAndFeel?.colorPrincipal || "#332f7f",
    secondary: currentEmpresa?.lookAndFeel?.colorSecundario || "#95d5c7",
    background: currentEmpresa?.lookAndFeel?.colorFondo || "#ffffff",
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

  useEffect(() => {
    setOpenPickers({
      main: false,
      secondary: false,
      background: false,
    });
  }, [isModifying]);

  useEffect(() => {
    console.log(selectedCategoria);
  }, [selectedCategoria]);

  useEffect(() => {
    if (!isLoadingCategorias) {
      setSelectedCategoria(
        categoriaDestacada
          ? categorias?.find(
              (cat) => cat.categoriaId === categoriaDestacada.categoriaId
            )
          : undefined
      );
    }
    handleSetLoading(isLoadingCategorias);
  }, [isLoadingCategorias]);

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

  const selectCategoriaContent = () => {
    return (
      <div className="w-full my-4 h-auto flex flex-col items-center justify-start gap-2">
        <Dropdown
          placeholder="Seleccionar categoría"
          items={formatCategoriasToDropdown(categorias || [])}
          onChange={(val: number) =>
            setSelectedCategoria(
              categorias?.find(
                (cat) => cat.categoriaId === val
              ) as CategoriaList
            )
          }
          onlyOneSelectable
        />
      </div>
    );
  };

  const handleNombreSitioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNombreSitioValue(e.target.value);
  };

  const handleChangeNombreCatDestacada = (e: ChangeEvent<HTMLInputElement>) => {
    if (errores && e.target.value !== "") {
      setErrores(false);
    }
    setNombreCategoriaDestacadaValue(e.target.value);
  };

  const errors = (): boolean => {
    if (selectedCategoria && nombreCategoriaDestacadaValue.trim() === "") {
      console.log("Error, el nombre de la sección no puede estar vacío.");
      setErrores(true);
      return true;
    }
    setErrores(false);
    return false;
  };

  const handleSave = async () => {
    if (!errors()) {
      try {
        handleSetLoading(true);
        let categoryImage = DEFAULT_CATEGORIA_DESTACADA_IMAGE;
        let newOrModifiedCatDestacada: CategoriaDestacada | null = null;
        if (selectedCategoria) {
          if (selectedCategoryFile) {
            categoryImage =
              (await handleUpload(selectedCategoryFile)) ??
              DEFAULT_CATEGORIA_DESTACADA_IMAGE;
          }

          newOrModifiedCatDestacada = {
            nombre: nombreCategoriaDestacadaValue,
            imagenUrl: selectedCategoryFile
              ? categoryImage
              : categoriaDestacada !== null
              ? ""
              : DEFAULT_CATEGORIA_DESTACADA_IMAGE,
            categoriaId: selectedCategoria.categoriaId,
          };
        } else {
          newOrModifiedCatDestacada = null;
        }
        let empresaImage;
        if (empresaFile) {
          empresaImage = await handleUpload(empresaFile);
        }

        const dataToSend = {
          plazoDias: plazoDias,
          colorPrincipal: selectedColors.main,
          colorSecundario: selectedColors.secondary,
          colorFondo: selectedColors.background,
          logoUrl: empresaImage
            ? empresaImage
            : currentEmpresa?.lookAndFeel.logoUrl,
          nombreSitio:
            nombreSitioValue.trim() !==
            currentEmpresa?.lookAndFeel.nombreSitio.trim()
              ? nombreSitioValue
              : currentEmpresa?.lookAndFeel.nombreSitio,
          categoriaDestacada: newOrModifiedCatDestacada,
        } as LookAndFeel;
        const response: any = await editLookAndFeel(dataToSend);
        if (response.error) {
          const messageError = response.error.data;
          handleSetLoading(false);
          toast.error(messageError);
          return;
        }
        toast.success(`LookAndFeel modificado correctamente.`);
        handleSetLoading(false);
      } catch (e) {
        handleSetLoading(false);
        toast.error("Ha ocurrido un error inesperado.");
      }
    }
  };

  return (
    <div className="w-full flex-grow pl-2 h-auto flex flex-col gap-5 items-start justify-start">
      <Modal
        textOk="Aceptar"
        textCancel="Cancelar"
        title="Seleccionar categoría destacada"
        description="La categoría que selecciones, aparecerá en un apartado con una imagen que configurarás a continuación."
        onCloseModalDelete={() => {
          setOpenSelectModal(false);
          setSelectedCategoria(undefined);
        }}
        show={openSelectModal}
        content={selectCategoriaContent()}
        onConfirm={() => setOpenSelectModal(false)}
      />
      <div className="w-full h-auto flex items-center justify-between">
        <h1 className="font-semibold text-texto text-[30px] ">
          Modificar Look and Feel
        </h1>
      </div>

      <div className="flex w-full flex-row flex-wrap items-center justify-center xl:justify-start gap-10 px-10 py-8 bg-white rounded-2xl shadow-xl select-none">
        <div className="flex flex-col items-start gap-2">
          <Label>Logo de la Empresa</Label>
          <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
            <AvatarSelector
              setFile={setEmpresaFile}
              defaultImage={
                currentEmpresa?.lookAndFeel.logoUrl || DEFAULT_EMPRESA_IMAGE
              }
              disabled={!isModifying}
            />
          </div>
          <Label>Nombre del Sitio</Label>
          <Input
            value={nombreSitioValue}
            onChange={handleNombreSitioChange}
            disabled={!isModifying}
            size={40}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Color Principal</Label>
            <div
              className={clsx(
                "w-52 h-11 px-4 py-3 transition-all  relative rounded-2xl flex items-center justify-center border-2 border-neutral-200",
                isModifying ? "cursor-pointer" : "cursor-not-allowed"
              )}
              style={{ backgroundColor: selectedColors.main }}
              onClick={() => isModifying && togglePicker("main")}
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
              className={clsx(
                "w-52 h-11 px-4 py-3 transition-all  relative rounded-2xl flex items-center justify-center border-2 border-neutral-200",
                isModifying ? "cursor-pointer" : "cursor-not-allowed"
              )}
              style={{ backgroundColor: selectedColors.secondary }}
              onClick={() => isModifying && togglePicker("secondary")}
            >
              <div className="w-auto h-auto absolute top-4 left-4 z-10">
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
              className={clsx(
                "w-52 h-11 px-4 py-3 transition-all  relative rounded-2xl flex items-center justify-center border-2 border-neutral-200",
                isModifying ? "cursor-pointer" : "cursor-not-allowed"
              )}
              style={{ backgroundColor: selectedColors.background }}
              onClick={() => isModifying && togglePicker("background")}
            >
              <div className="w-auto h-auto absolute top-4 left-4 z-10">
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
        <div className="h-auto flex flex-row items-center justify-center">
          <ButtonPrimary
            onClick={() => setIsModifying(!isModifying)}
            type="button"
          >
            {!isModifying
              ? "Habilitar Modificación"
              : "Deshabilitar Modificación"}
          </ButtonPrimary>
        </div>
      </div>

      <div className="w-full h-auto flex items-center justify-between">
        <h1 className="font-semibold text-texto text-[30px] ">
          Plazo de dias para enviar email de recordatorio
        </h1>
      </div>

      <div className="flex w-full flex-col flex-wrap items-start justify-center xl:justify-start gap-4 px-10 py-8 bg-white rounded-2xl shadow-xl select-none">
        <span>
          Se enviara un correo cada la cantidad de dias especificada para
          recordarle al usuario que tiene productos en el carrito{" "}
        </span>

        <div className="flex flex-col gap-2">
          <Label>Plazo de dias</Label>
          <Input
            value={plazoDias}
            onChange={(e) => setPlazoDias(Number(e.target.value))}
            placeholder="Ingrese un plazo de dias"
            size={5}
            maxLength={5}
            max={5}
            type="number"
          />
          {errores && (
            <Label className="text-xs text-red-600 font-semibold">
              El nombre de la sección para la categoría es requerido.
            </Label>
          )}
        </div>
      </div>

      <div className="w-full h-auto flex items-center justify-between">
        <h1 className="font-semibold text-texto text-[30px] ">
          Categoría destacada
        </h1>
      </div>
      <div className="flex w-full flex-row flex-wrap items-center justify-start px-10 py-8 bg-white rounded-2xl shadow-xl">
        <div className="flex flex-col gap-5 w-full">
          {!categoriaDestacada && (
            <Label className="text-xl">
              Al parecer la empresa no cuenta con una categoría destacada.
              Puedes configuarla a continuación si así lo deseas.
            </Label>
          )}

          {selectedCategoria && (
            <div className="flex flex-wrap gap-10 justify-center items-center xl:justify-start">
              <div className="flex flex-col gap-5 items-center xl:items-start">
                <Label>Imagen para la categoría destacada</Label>
                <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
                  <AvatarSelector
                    setFile={setSelectedCategoryFile}
                    defaultImage={
                      currentEmpresa?.lookAndFeel.categoriaDestacada
                        ?.imagenUrl || DEFAULT_CATEGORIA_DESTACADA_IMAGE
                    }
                    disabled={false}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Nombre para la sección destacada</Label>
                  <Input
                    value={nombreCategoriaDestacadaValue}
                    onChange={handleChangeNombreCatDestacada}
                    placeholder="Ingrese un nombre para la sección."
                    size={40}
                  />
                  {errores && (
                    <Label className="text-xs text-red-600 font-semibold">
                      El nombre de la sección para la categoría es requerido.
                    </Label>
                  )}
                </div>
              </div>
              <div className="flex flex-col p-10 border rounded-2xl bg-slate-50">
                <Label className="">
                  Categoría seleccionada:
                  <span className="font-semibold text-lg">
                    {` ${selectedCategoria.categoriaNombre}`}
                  </span>
                </Label>
                <Label className="">
                  Productos vinculados:
                  <span className="font-semibold text-lg">
                    {` ${selectedCategoria.cantidadProductos}`}
                  </span>
                </Label>
              </div>
            </div>
          )}
          <div className="flex justify-center xl:justify-start mt-5">
            <ButtonPrimary
              className={selectedCategoria && "!bg-red-600"}
              onClick={() => setOpenSelectModal(!openSelectModal)}
            >
              {!selectedCategoria
                ? "Seleccionar Categoría"
                : "Cambiar de Categoría"}
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <ButtonPrimary onClick={handleSave} type="button">
          Guardar Cambios
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default ModificarLookAndFeel;
