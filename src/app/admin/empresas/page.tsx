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
import { useState ,useEffect} from "react";

import { useListEmpresasQuery } from "@/store/service/EmpresaService";
import { useDeleteEmpresasMutation  } from "@/store/service/EmpresaService";
import useGlobal from "@/hooks/useGlobal";
import toast from "react-hot-toast";
const AdminEmpresas = () => {

  const { handleSetLoading} = useGlobal();

  const { data, isLoading } = useListEmpresasQuery("EmpresaInfo");

  const [deleteEmpresas] = useDeleteEmpresasMutation();


  const { push } = useRouter();
  const [disabledActivate, setDisabledActivate] = useState<boolean>(false);
  const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleAddEmpresa = () => {
    push(appRoutes.adminAddEmpresas() as any);
  };

  const empresas: any = data || [];

  const rowEmpresas = formatEmpresasToTable(empresas);

    useEffect(()=>{
      if(!isLoading){
        handleSetLoading(false)
        return;
      }
      handleSetLoading(true);
  }, [isLoading])


  const handleDeleteEmpresas = async() => {
    setOpenDeleteModal(false);
    handleSetLoading(true);
    
    const empresasIds =  selectedEmpresas.map(empresa => empresa.id);
    try{
      await deleteEmpresas({  empresasIds});
      toast.success("Empresas eliminadas correctamente");
      handleSetLoading(false);


    }catch(e){
      handleSetLoading(false);
      toast.error("Ha ocurrido un error");

    }
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
