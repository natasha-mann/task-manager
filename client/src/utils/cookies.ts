import Cookies from "js-cookie";

export const setTokenCookie = (token: string): void => {
  Cookies.set("auth_token", token, { expires: 7 });
};

export const getTokenFromCookie = (): string | undefined => {
  return Cookies.get("auth_token");
};

export const removeTokenCookie = (): void => {
  Cookies.remove("auth_token");
};
