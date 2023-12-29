import Cookies from "js-cookie";

export const getToken = (tokenName) => {
  return Cookies.get(tokenName);
};

export const setToken = (tokenName, tokenValue) => {
  return Cookies.set(tokenName, tokenValue);
};

export const removeToken = (tokenName) => {
  return Cookies.remove(tokenName);
};
