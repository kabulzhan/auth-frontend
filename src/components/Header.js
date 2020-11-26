import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Header.styles.css";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign out</Link>
          <Link to="/feature">Feature</Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/signup">Sign up</Link>
        <Link to="/signin">Sign in</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="header">
        <Link to="/">Main Page</Link>
        {this.renderLinks()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Header);
