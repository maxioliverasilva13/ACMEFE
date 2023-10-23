export const DEFAULT_TOKEN_KEY = "token";

export const handleStorageToken = (token: string) => {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.setItem(DEFAULT_TOKEN_KEY, token);
};

export const handleClearToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  sessionStorage.removeItem(DEFAULT_TOKEN_KEY);
};

export const handleGetToken = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return sessionStorage.getItem(DEFAULT_TOKEN_KEY);
};
