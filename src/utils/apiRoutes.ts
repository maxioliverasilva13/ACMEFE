
export const apiRoutes = {
    login: () => "/Auth/login",
    register: () => "/Auth/register",
    currentUser: () => "/Auth/currentUser",
    loginUserWithExternalService: () => "/Auth/loginWithExternalService",
    resetPassword: () => "/Auth/resetPassword",
    forgotPassword: () => "/Auth/forgotPassword",
    listOrCreateUsers: () => "/api/User",
    listarCategorias: () => "/api/Categoria",
    crearProducto: () => "/api/Producto",
    updateProducto: () => "/api/Producto/updateProduct",
    listarMisProductosEmpresa: () => "/api/Producto/mis-productos",
    productoById: (prodId: any) => `/api/Producto/${prodId ? prodId: "[prodId]"}`,
    deleteProductoById: (prodId: any) => `/api/Producto/${prodId ? prodId: "[prodId]"}`,
    listarTiposIva: () => "/api/TipoIva",
    userById: (userId: string) => `/api/User/${userId}`,
}