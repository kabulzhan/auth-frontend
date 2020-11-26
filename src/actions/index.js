import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://auth-server-boilerplate.herokuapp.com/signup",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    console.log("email in use");
    dispatch({ type: AUTH_ERROR, payload: "Email is in use" });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://auth-server-boilerplate.herokuapp.com/signin",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    console.log("email in use");
    dispatch({ type: AUTH_ERROR, payload: "Incorrect credentials" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: "",
  };
};
