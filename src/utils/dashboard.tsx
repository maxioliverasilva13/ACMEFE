import { BuildingOffice2Icon, ExclamationTriangleIcon, MapIcon, MapPinIcon, ReceiptPercentIcon, ShoppingBagIcon, TagIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { appRoutes } from "./appRoutes";
import { HomeIcon } from "@heroicons/react/24/outline";


export type DashboardItem = {
    title: string;
    href: string;
    validPath: string[],
    icon: any,
}

export const AdminDashboardItems = [
    {
        title: "Inicio",
        href: appRoutes.adminInicio(),
        validPath: [appRoutes.adminInicio()],
        icon: <HomeIcon color="white" strokeWidth={2} width={25} />,
    },
    {
        title: "Empresas",
        href: appRoutes.adminEmpresas(),
        validPath: [appRoutes.adminEmpresas()],
        icon: <BuildingOffice2Icon color="white" strokeWidth={2} width={25} />,
    },
    {
        title: "Tipos Iva",
        href: appRoutes.adminTiposIva(),
        validPath: [appRoutes.adminTiposIva()],
        icon: <ReceiptPercentIcon color="white" strokeWidth={2} width={25} />,
    },
    {
        title: "Departamentos",
        href: appRoutes.adminDepartamentos(),
        validPath: [appRoutes.adminDepartamentos()],
        icon: <MapIcon color="white" strokeWidth={2} width={25} />,
    },
    {
        title: "Ciudades",
        href: appRoutes.adminCiudades(),
        validPath: [appRoutes.adminCiudades()],
        icon: <MapPinIcon color="white" strokeWidth={2} width={25} />,
    },
];

export const EmpresaDashboardItems = [
    {
        title: "Inicio",
        href: appRoutes.empresaInico(),
        validPath: [appRoutes.empresaInico()],
        icon: <HomeIcon color="white" strokeWidth={2} width={25} />,
    },
    {
        title: "Usuarios",
        href: appRoutes.empresaUsuarios(),
        validPath: [appRoutes.empresaUsuarios(), appRoutes.empresaAddUsuarios()],
        icon: <UserGroupIcon color="white" strokeWidth={2} width={25} />,
    },
      {
        title: "Pick Up",
        href: appRoutes.empresaPickups(),
        validPath: [appRoutes.empresaPickups()],
        icon: <MapPinIcon color="white" strokeWidth={2} width={25} />,
    },
    {
        title: "Productos",
        href: appRoutes.empresaProductos(),
        validPath: [appRoutes.empresaProductos(), appRoutes.empresaPorductDetails(), appRoutes.empresaAgregarProductos()],
        icon: <ShoppingBagIcon color="white" strokeWidth={2} width={25} />,
    },

    {
        title: "Categorias",
        href: appRoutes.empresaCategorias(),
        validPath: [appRoutes.empresaCategorias()],
        icon: <TagIcon color="white" strokeWidth={2} width={25} />,
    },
    {
        title: "Reclamos",
        href: appRoutes.empresaReclamos(),
        validPath: [appRoutes.empresaReclamos()],
        icon: <ExclamationTriangleIcon color="white" strokeWidth={2} width={25} />,
    },
];