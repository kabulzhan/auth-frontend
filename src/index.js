import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
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
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/add_news" component={AddNews} />
        <Route path="/check_news" component={CheckNews} />
        <Route path="/mynews" component={MyNews} />
        {/* <Route path="/signout" component={Signout} /> */}
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
