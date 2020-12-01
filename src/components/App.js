import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header";

import Welcome from "./Welcome";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import AddNews from "./AddNews";
import MyNews from "./MyNews";
import CheckNews from "./CheckNews";

const App = (props) => {
  return (
    <>
      <Header />
      <Route path="/" exact component={Welcome} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/add_news" component={AddNews} />
      <Route path="/check_news" component={CheckNews} />
      <Route path="/mynews" component={MyNews} />
    </>
  );
};

export default App;
