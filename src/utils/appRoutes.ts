export const appRoutes = {
    login: () => "/login",
    forgotPassword: () => "/forgot-pass",
    register: () => "/signup",
    resetPassword: () => "/reset-password",

    // Admin routes
    adminInicio: () => "/admin",
    adminEmpresas: () => "/admin/empresas",
    adminAddEmpresas: () => "/admin/empresas/agregar-empresa",
    adminEditEmpresas: () => `/admin/empresas/editar-empresa`,
    adminAddTipoIva: () => "/admin/tipos-iva/agregar-tipo-iva",
    adminTiposIva: () => "/admin/tipos-iva",
    adminDepartamentos: () => "/admin/departamentos",
    adminCiudades: () => "/admin/ciudades",
    adminProfile: () => "/admin/profile",
    empresaProfile: () => "/empresa/profile",

    // Empresas Routes
    empresaInico: () => "/empresa/inicio",
    empresaUsuarios: () => "/empresa/usuarios",
    empresaAddUsuarios: () => "/empresa/agregar-usuario",
    empresaPickups: () => "/empresa/pickups",
    empresaProductos: () => "/empresa/productos",
    empresaAgregarProductos: () => "/empresa/agregar-producto",
    empresaEditarProducto: () => "/empresa/editar-producto",
    empresaCategorias: () => "/empresa/categorias",
    empresaReclamos: () => "/empresa/reclamos",
    empresaVentas: () => "/empresa/ventas",
    empresaPorductDetails: () => "/empresa/product-detail",
    empresaPorductDetailsWithId: (id:any) => `/empresa/product-detail/${id}`,
    empresaVentaDetalle : () => `/empresa/venta-detalle`,  
    empresaVentaDetalleWithId : (id:any) => `/empresa/venta-detalle/${id}`,  
    empresaLookAndFeel: () => "/empresa/look-and-feel",

    // Persona comun routes
    productDetail: () => "/product-detail",
    
    //user routes
    userInicio: () => "/inicio",
    tiendaHome: (empresaId: any) => `${empresaId}/inicio`,
    productoDetails: () => `/detalles`,
    carrito: () => `/carrito`,
    userAccount: () => `/account`,
    carritoPath: (empresaId: any) => `/${empresaId}/carrito`,
    checkout: () => `/checkout`,
    checkoutPath: (empresaId: any) => `/${empresaId}/checkout`,
    productoDetailsFullPath: (productId: any, empresaId: any) => `productos/${productId}/detalles`,
    ordenesDetail : () =>  `ordenes`,
    ordenesDetailWithId : (compraId:any) =>  `ordenes/${compraId}` 

}