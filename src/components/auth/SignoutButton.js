import React from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import * as actions from "../../actions";

const Signout = ({ signout }) => (
  <Button variant="outlined" color="secondary" onClick={() => signout()}>
    Выход
  </Button>
);

export default connect(null, actions)(Signout);
