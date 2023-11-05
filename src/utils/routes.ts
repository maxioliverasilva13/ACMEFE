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
  appRoutes.empresaEditarProducto(),
  appRoutes.empresaLookAndFeel(),
];

export const adminRoutes = [
  appRoutes.adminInicio(),
  appRoutes.adminEmpresas(),
  appRoutes.adminAddEmpresas(),
  appRoutes.adminAddTipoIva(),
  appRoutes.adminTiposIva(),
  appRoutes.adminDepartamentos(),
  appRoutes.adminCiudades(),
  appRoutes.adminProfile(),
  appRoutes.empresaProfile(), 
  appRoutes.adminEditEmpresas()
];

export const userRoutes = [
 appRoutes.userInicio(),
 appRoutes.tiendaHome(""),
 "home-2",
 appRoutes.productoDetails(),
 appRoutes.carrito(),
 appRoutes.checkout(),
];
