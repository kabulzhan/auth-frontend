import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
// import Signout from "./components/auth/Signout";
import AddNews from "./components/AddNews";
import MyNews from "./components/MyNews";
import CheckNews from "./components/CheckNews";

const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
    },
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
