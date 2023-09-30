
export const prepareHeaders = (headers: any) => {
//   const token = getToken();
  const token = "";
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  if (token) {
    // include token in req header
    headers.set("Authorization", `bearer ${token}`);
    return headers;
  } else {
    // public path
    return headers;
  }
};
