export const apiRoutes = {
  login: () => "/Auth/login",
  register: () => "/Auth/register",
  currentUser: () => "/Auth/currentUser",
  loginUserWithExternalService: () => "/Auth/loginWithExternalService",
  resetPassword: () => "/Auth/resetPassword",
  forgotPassword: () => "/Auth/forgotPassword",
  createEmpresa: () => "/api/Empresa/create",
  listEmpresas: () => "/api/Empresa",
  obtenerEmpresa: (id: number) => `/api/Empresa/${id}`,
  deleteEmpresas: () => `/api/Empresa/deletesById`,
  listOrCreateUsers: () => "/api/User",
  listarCategorias: () => "/api/Categoria",
  listarCategoriasDeEmpresa: (empresaId: number) =>
    `/api/Categoria/categorias-de-empresa?empresaId=${empresaId}`,
  crearProducto: () => "/api/Producto",
  updateProducto: () => "/api/Producto/updateProduct",
  listarMisProductosEmpresa: () => "/api/Producto/mis-productos",
  listarProductosByEmpresa: (empresaId: number) =>
    `/api/Producto/productos-empresa?empresaId=${empresaId}`,
  productoById: (prodId: any) =>
    `/api/Producto/${prodId ? prodId : "[prodId]"}`,
  productosRelacionados: () =>
    `/api/Producto/relacionados`,
  deleteProductoById: (prodId: any) =>
    `/api/Producto/${prodId ? prodId : "[prodId]"}`,
  listarTiposIva: () => "/api/TipoIva",
  userById: (userId: string) => `/api/User/${userId}`,
  listarPickups: () => "/api/PickUp",
  pickupsByEmpresa: (empresaId: number) =>
    `/api/Pickup/listarByEmpresa?empresaId=${empresaId}`,

  tipoIVAById: (id: number) => `/api/TipoIva/${id}`,
  listOrCreateDepartamento: () => "/api/Departamento",
  departamentoById: (id: number) => `/api/Departamento/${id}`,
  listOrCreateCiudad: () => "/api/Ciudad",
  crearCategoria: () => "/api/Categoria",
  deleteCategorias: () => "/api/Categoria",
  ciudadById: (id: number) => `/api/Ciudad/${id}`,
  crearPickup: () => "api/PickUp",
  deletePickups: () => `/api/PickUp/deletesById`,
  listarReclamos: () => "api/Reclamo",
  listarEstadisticasSort: () => "/api/Estadisticas/sort",
  editLookAndFeel: () => "/api/Empresa/editLookAndFeel",
  listarDirecciones: () => "/api/User/listarDirecciones",
  agregarDireccion: () => "/api/User/agregarDireccion",
  modificarDireccion: () => "/api/User/modificarDireccion",
  agregarProductoCarrito: () => "/api/Carrito",
  borrarLinea: () => "/api/Carrito/borrarLinea",
efectuarCompra: () => "/api/Carrito/comprar",
  obtenerCarrito: (empresaId: any) =>
    `/api/Carrito/obtenerCarrito?EmpresaId=${empresaId}`,
};
