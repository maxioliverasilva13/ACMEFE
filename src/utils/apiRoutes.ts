
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
    deleteEmpresas: () => `/api/Empresa/deletesById`

}