import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Header.styles.css";
import SigninPopup from "./auth/SigninPopup";
import SignoutButton from "./auth/SignoutButton";
import Button from "@material-ui/core/Button";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <>
          <div style={{ marginRight: "1rem" }}>
            <h4>Привет, {this.props.user.name}</h4>
          </div>
          {this.props.user.admin && (
            <Link to="/check_news">
              <Button variant="contained" style={{ backgroundColor: "orange" }}>
                Проверить присланные новости
              </Button>
            </Link>
          )}
          <Link to="/add_news">
            <Button variant="contained" color="primary">
              Добавить новость
            </Button>
          </Link>
          <Link to="/mynews">
            <Button variant="outlined" color="primary">
              Мои новости
            </Button>
          </Link>

          <SignoutButton />
        </>
      );
    }
    return (
      <>
        <div>
          <h4>Привет, Гость</h4>
        </div>
        <SigninPopup />
      </>
    );
  }

  render() {
    return (
      <div className="header">
        <Link to="/">Главная страница</Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          {this.renderLinks()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
