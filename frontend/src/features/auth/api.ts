import { api } from "../../services/api";
import { authEndpoints } from "../../utils/ApiEndpoints";
import type { loginDTO, registerUserDTO } from "./Schema";

export const login = async (data: loginDTO) => {
  const res = await api.post(authEndpoints.login, data);
  return res.data;
};

export const signup = async (data: registerUserDTO) => {
  const res = await api.post(authEndpoints.signup, data);
  return res.data;
};
