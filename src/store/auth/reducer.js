import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authCookie = Cookies.get("AUTH") || JSON.stringify({});
const INITIAL_STATE = {
  loginLoading: false,
  signUpLoading: false,
  user: null,
  token: null,
  signUpError: null,
  loginError: null,
  ...JSON.parse(authCookie),
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    loginStart: (state) => {
      return {
        ...state,
        loginLoading: true,
        loginError: null,
      };
    },
    loginSuccess: (state, { payload: { user, token } }) => {
      Cookies.set(
        "AUTH",
        JSON.stringify({
          user,
          token,
        }),
        {
          expires: 29,
        }
      );
      return {
        ...state,
        loginLoading: false,
        token,
        user,
      };
    },
    loginError: (state, { payload: { error } }) => {
      return {
        ...state,
        loginLoading: false,
        loginError: error,
      };
    },
    signUpStart: (state) => {
      return {
        ...state,
        signUpLoading: true,
        signUpError: null,
      };
    },
    signUpSuccess: (state, { payload: { user, token } }) => {
      Cookies.set(
        "AUTH",
        JSON.stringify({
          user,
          token,
        }),
        {
          expires: 29,
        }
      );
      return {
        ...state,
        signUpLoading: false,
        token,
        user,
      };
    },
    signUpError: (state, { payload: { error } }) => {
      return {
        ...state,
        signUpLoading: false,
        signUpError: error,
      };
    },
    logOut: (state) => {
      Cookies.remove("AUTH");
      return {
        ...state,
        user: null,
        token: null,
      };
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  signUpStart,
  signUpSuccess,
  signUpError,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
