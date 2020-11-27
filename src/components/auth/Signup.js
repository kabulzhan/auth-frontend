import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signup extends Component {
  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push("/feature");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Name</label>
          <div>
            <Field
              name="name"
              type="text"
              component="input"
              autoComplete="none"
            />
          </div>
        </fieldset>
        <fieldset>
          <label>Email</label>
          <div>
            <Field
              name="email"
              type="text"
              component="input"
              autoComplete="none"
            />
          </div>
        </fieldset>
        <fieldset>
          <label>Password</label>
          <div>
            <Field
              name="password"
              type="password"
              component="input"
              autoComplete="none"
            />
          </div>
        </fieldset>
        <div>{this.props.loadingMessage}</div>
        <div>{this.props.errorMessage}</div>
        <button>Sign Up!</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loadingMessage,
  errorMessage: state.auth.errorMessage,
});

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(Signup);
