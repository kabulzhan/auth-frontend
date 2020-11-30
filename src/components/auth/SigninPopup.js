import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import "./SigninPopup.styles.css";

import { connect } from "react-redux";
import * as actions from "../../actions";

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.clearMessages();
  };

  const [email, setEmail] = React.useState("user@test.com");
  const [password, setPassword] = React.useState("123");

  const onSubmit = () => {
    const formProps = { email: email, password: password };
    props.signin(formProps, handleClose);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Вход
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Авторизация:</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.loadingMessage}</DialogContentText>
          <div className="error">{props.errorMessage}</div>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Электронная почта"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            error={props.errorMessage ? true : false}
            value={email}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Пароль"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            error={props.errorMessage ? true : false}
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={onSubmit} color="primary">
            Войти
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => ({
  loadingMessage: state.auth.loadingMessage,
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, actions)(FormDialog);
