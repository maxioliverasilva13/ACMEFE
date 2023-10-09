import { appRoutes } from "./appRoutes";

export const public_routes = [
  appRoutes.login(),
  appRoutes.resetPassword(),
  appRoutes.register(),
  appRoutes.forgotPassword(),
];

export const empresaRoutes = [
  appRoutes.empresaInico(),
  appRoutes.empresaUsuarios(),
  appRoutes.empresaAddUsuarios(),
  appRoutes.empresaPickups(),
  appRoutes.empresaProductos(),
  appRoutes.empresaAgregarProductos(),
  appRoutes.empresaCategorias(),
  appRoutes.empresaReclamos(),
  appRoutes.empresaPorductDetails(),
];

export const adminRoutes = [
  appRoutes.adminInicio(),
  appRoutes.adminEmpresas(),
  appRoutes.adminAddEmpresas(),
  appRoutes.adminAddTipoIva(),
  appRoutes.adminTiposIva(),
  appRoutes.adminDepartamentos(),
  appRoutes.adminProfile(),
  appRoutes.empresaProfile(),
];

export const userRoutes = [
 appRoutes.userInicio(),
];