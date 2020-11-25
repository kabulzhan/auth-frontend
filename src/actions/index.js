import axios from "axios";
import { AUTH_USER } from "./types";

export const signup = (formProps) => async (dispatch) => {
  const response = await axios.post(
    "https://auth-server-boilerplate.herokuapp.com/signup",
    formProps
  );
  dispatch({ type: AUTH_USER, payload: response.data.token });
};
