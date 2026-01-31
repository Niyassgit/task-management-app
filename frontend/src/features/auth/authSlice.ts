import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../types/AuthUser";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
}

const getSafeUser = (): AuthUser | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "undefined") return null;
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  user: getSafeUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;