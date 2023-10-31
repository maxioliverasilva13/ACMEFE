"use client";

import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import Label from "@/components/Label/Label";
import {
  CrearUsuarioForm,
  CrearUsuarioFormFields,
  CrearUsuarioValidationSchema,
} from "@/forms/CrearUsuarioForm";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateUserMutation } from "@/store/service/UserService";
import useGlobal from "@/hooks/useGlobal";
import useUploadImage from "@/hooks/useUploadFile";
import { DEFAULT_USER_IMAGE } from "@/utils/usuarios";
import toast from "react-hot-toast";
import { UsuarioCreate } from "@/types/usuario";
import { Direccion } from "@/types/direccion";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/utils/appRoutes";
import { Departamento } from "@/types/departamento";
import Dropdown from "@/components/Dropdown/Dropdown";
import { ItemDropdown } from "@/types/dropdown";
import { useLazyListarDepartamentosQuery } from "@/store/service/DepartamentoService";
import {
  formatCiudadesToDropdown,
  formatCiudadesToTable,
  formatDepartamentosToDropdown,
} from "@/utils/ciudades";
import { useLazyListarCiudadesQuery } from "@/store/service/CiudadService";

const AgregarUsuario = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDepartamentoId, setSelectedDepartamentoId] = useState<
    Departamento | undefined
  >(undefined);
  const [getCiudades, { data: dataCiudades }] = useLazyListarCiudadesQuery();
  const [
    getDepartamentos,
    { data: dataDepartamentos },
  ] = useLazyListarDepartamentosQuery();
  const { handleSetLoading, userInfo} = useGlobal();
  const handleLoadData = async () => {
    handleSetLoading(true);
    await getCiudades({});
    await getDepartamentos({});
    handleSetLoading(false);
  };
  const departamentos = dataDepartamentos ?? [];
  const ciudades = dataCiudades ?? [];
  useEffect(() => {
    handleLoadData();
  }, []);

  useEffect(() => {
    setValue(CrearUsuarioFormFields.ciudadId, 0);
    console.log('cambiuooo')
  }, [selectedDepartamentoId]);

  const createUserForm = useForm<CrearUsuarioForm>({
    resolver: yupResolver(CrearUsuarioValidationSchema()),
  });

  const { handleUpload } = useUploadImage();
  const [createUser] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = createUserForm;
  const { push } = useRouter();

  const handleNext = async (data: CrearUsuarioForm) => {
    try {
      let userImage = DEFAULT_USER_IMAGE;
      handleSetLoading(true);
      if (selectedFile) {
        userImage = (await handleUpload(selectedFile)) ?? DEFAULT_USER_IMAGE;
      }
      const dataToSend: UsuarioCreate = {
        nombre: `${data?.nombre} ${data?.apellido}`,
        email: data?.email,
        celular: data?.celular,
        imagen: userImage,
        empresaId: userInfo?.empresaId,
        direccion: {
          calle: data?.calle,
          nroPuerta: data?.nroPuerta,
          calleEntre1: data?.calleEntre1,
          calleEntre2: data?.calleEntre2,
          ciudadId: data?.ciudadId,
        } as Direccion,
      };

      const resp = (await createUser(dataToSend)) as any;
      if (resp?.data?.id) {
        toast.success("Usuario creado correctamente.");
        push(appRoutes.empresaUsuarios() as any);
      } else {
        toast.error("Error al crear usuario", resp?.data);
      }
      handleSetLoading(false);
    } catch (error: any) {
      handleSetLoading(false);
      toast.error("Error al crear usuario ", error?.message);
    }
  };

  return (
    <div className="w-full flex-grow p-5 h-auto flex flex-col gap-10 items-start justify-start">
      <h1 className="font-semibold text-texto text-[30px] ">
        Agregar nuevo usuario
      </h1>

      <div className="w-full h-auto rounded-[20px] flex flex-col items-start justify-start shadow-lg gap-6 md:p-10 p-5 bg-white">
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="w-[150px] h-[150px] min-w-[150px] relative overflow-hidden">
            <AvatarSelector setFile={setSelectedFile} />
          </div>
          <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Nombre</Label>
              <Input
                {...register(CrearUsuarioFormFields.nombre)}
                error={errors[CrearUsuarioFormFields.nombre]?.message}
                type="text"
                className="mt-1.5"
              />
            </div>
            <div className="flex-grow w-full flex flex-col items-start justify-start">
              <Label>Apellido</Label>
              <Input
                {...register(CrearUsuarioFormFields.apellido)}
                error={errors[CrearUsuarioFormFields.apellido]?.message}
                type="text"
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Email</Label>
            <Input
              {...register(CrearUsuarioFormFields.email)}
              error={errors[CrearUsuarioFormFields.email]?.message}
              type="email"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Telefono</Label>
            <Input
              {...register(CrearUsuarioFormFields.celular)}
              error={errors[CrearUsuarioFormFields.celular]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Calle</Label>
            <Input
              {...register(CrearUsuarioFormFields.calle)}
              error={errors[CrearUsuarioFormFields.calle]?.message}
              type="email"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Número de Puerta</Label>
            <Input
              {...register(CrearUsuarioFormFields.nroPuerta)}
              error={errors[CrearUsuarioFormFields.nroPuerta]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Calle entre 1</Label>
            <Input
              {...register(CrearUsuarioFormFields.calleEntre1)}
              error={errors[CrearUsuarioFormFields.calleEntre1]?.message}
              type="email"
              className="mt-1.5"
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Calle entre 2</Label>
            <Input
              {...register(CrearUsuarioFormFields.calleEntre2)}
              error={errors[CrearUsuarioFormFields.calleEntre2]?.message}
              type="text"
              className="mt-1.5"
            />
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Departamento</Label>
            <Dropdown
              placeholder="Seleccionar departamento"
              items={formatDepartamentosToDropdown(departamentos)}
              onChange={(val: any) =>{
                setSelectedDepartamentoId(val);
              }
              }
              onlyOneSelectable
            />
          </div>
          <div className="flex-grow w-full flex flex-col items-start justify-start">
            <Label>Ciudad</Label>
            <Dropdown
              placeholder={
                selectedDepartamentoId
                  ? "Seleccione una ciudad"
                  : "Primero seleccione un departamento."
              }
              items={formatCiudadesToDropdown(ciudades?.filter((ciudad) => ciudad?.departamentoId === selectedDepartamentoId))}
              onChange={(value: any) =>
                setValue(CrearUsuarioFormFields.ciudadId, value)
              }
              error={errors[CrearUsuarioFormFields.ciudadId]?.message}
              onlyOneSelectable
            />
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-row items-center justify-between">
        <ButtonPrimary onClick={handleSubmit(handleNext)} className="">
          Agregar usuario
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default AgregarUsuario;
