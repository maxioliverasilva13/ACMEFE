export const appRoutes = {
    login: () => "/login",
    forgotPassword: () => "/forgot-pass",
    register: () => "/signup",
    resetPassword: () => "/reset-password",

    // Admin routes
    adminInicio: () => "/admin",
    adminEmpresas: () => "/admin/empresas",
    adminAddEmpresas: () => "/admin/empresas/agregar-empresa",
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
    empresaCategorias: () => "/empresa/categorias",
    empresaReclamos: () => "/empresa/reclamos",
    empresaPorductDetails: () => "/empresa/product-detail",
    empresaPorductDetailsWithId: (id:any) => `/empresa/product-detail/${id}`,

    // Persona comun routes
    productDetail: () => "/product-detail",
    
    //user routes
    userInicio: () => "/inicio"
}