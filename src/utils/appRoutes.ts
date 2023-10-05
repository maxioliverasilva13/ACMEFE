export const appRoutes = {
    // Admin routes
    adminInicio: () => "/admin",
    adminEmpresas: () => "/admin/empresas",
    adminAddEmpresas: () => "/admin/empresas/agregar-empresa",
    adminAddTipoIva: () => "/admin/tipos-iva/agregar-tipo-iva",
    adminTiposIva: () => "/admin/tipos-iva",
    adminDepartamentos: () => "/admin/departamentos",
    adminProfile: () => "/admin/profile",
    empresaProfile: () => "/empresa/profile",
    // Empresas Routes
    empresaInico: () => "/empresa/inicio",
    empresaUsuarios: () => "/empresa/usuarios",
    empresaAddUsuarios: () => "/empresa/agregar-usuarios",
    empresaPickups: () => "/empresa/pickups",
    empresaProductos: () => "/empresa/productos",
    empresaAgregarProductos: () => "/empresa/agregar-producto",
    empresaCategorias: () => "/empresa/categorias",
    empresaReclamos: () => "/empresa/reclamos",
    empresaPorductDetails: () => "/empresa/product-detail",

    // Persona comun routes
    productDetail: () => "/product-detail",
}