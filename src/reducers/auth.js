import {
  AUTH_USER,
  AUTH_ERROR,
  LOADING,
  CLEAR_MESSAGES,
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
  loadingMessage: "",
  user: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      const { name, email, admin } = action.payload;
      return {
        ...state,
        authenticated: action.payload.token,
        user: { name, email, admin },
      };
    case LOADING:
      return { ...state, loadingMessage: action.payload, errorMessage: "" };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload, loadingMessage: "" };
    case CLEAR_MESSAGES:
      return { ...state, errorMessage: "", loadingMessage: "" };
    default:
      return state;
  }
}
