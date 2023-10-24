
export const apiRoutes = {
    login: () => "/Auth/login",
    register: () => "/Auth/register",
    currentUser: () => "/Auth/currentUser",
    loginUserWithExternalService: () => "/Auth/loginWithExternalService",
    resetPassword: () => "/Auth/resetPassword",
    forgotPassword: () => "/Auth/forgotPassword",
    createEmpresa: () => "/api/Empresa/create",
    listEmpresas: () => "/api/Empresa",
    obtenerEmpresa: (id:number) => `/api/Empresa/${id}`,
    deleteEmpresas: () => `/api/Empresa/deletesById`,
    listOrCreateUsers: () => "/api/User",
    listarCategorias: () => "/api/Categoria",
    crearProducto: () => "/api/Producto",
    updateProducto: () => "/api/Producto/updateProduct",
    listarMisProductosEmpresa: () => "/api/Producto/mis-productos",
    productoById: (prodId: any) => `/api/Producto/${prodId ? prodId: "[prodId]"}`,
    deleteProductoById: (prodId: any) => `/api/Producto/${prodId ? prodId: "[prodId]"}`,
    listarTiposIva: () => "/api/TipoIva",
    userById: (userId: string) => `/api/User/${userId}`,
    listarPickups: () => "/api/PickUp",
    tipoIVAById: (id: number) => `/api/TipoIva/${id}`,
    listOrCreateDepartamento: () => "/api/Departamento",
    departamentoById: (id: number) => `/api/Departamento/${id}`,
    listOrCreateCiudad: () => "/api/Ciudad",
    ciudadById: (id: number) => `/api/Ciudad/${id}`,
    crearPickup : ()=> "api/PickUp",
    deletePickups: () => `/api/PickUp/deletesById`,
    listarReclamos : () => "api/Reclamo",
    listarEstadisticasSort: () => "/api/Estadisticas/sort"

}