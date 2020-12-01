import React from "react";
import requireAuth from "./requireAuth";
import { connect } from "react-redux";
import * as actions from "../actions";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      // width: "100ch",
    },
  },
}));

const AddNews = (props) => {
  const classes = useStyles();
  const [news, setNews] = React.useState({ header: "", body: "" });
  const [message, setMessage] = React.useState({ type: "", message: "" });

  const handleChange = (event) => {
    let obj = { ...news };
    obj[event.target.name] = event.target.value;
    setNews(obj);
  };

  const handleSubmit = (event) => {
    if (!news.header || !news.body) {
      return setMessage({
        type: "error",
        message: "Все поля обязательны для заполнения",
      });
    }

    const submittedDate = new Date().getTime().toString();
    setMessage({
      type: "sent",
      message: "Новость отправляется на сервер для проверки...",
    });
    props.submitNews({ ...news, submittedDate }, props.token, () => {
      props.history.push("/mynews");
    });
  };

  return (
    <div style={{ margin: "1rem auto", width: "60%" }}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          name="header"
          id="standard-basic"
          label="заголовок новости"
          fullWidth
          style={{ marginBottom: "1rem" }}
          onChange={handleChange}
          value={news.header}
          required={true}
          onFocus={() => setMessage({ type: "", message: "" })}
        />
        <TextField
          name="body"
          id="outlined-multiline-static"
          label="текст новости"
          multiline
          rows={20}
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={news.body}
          required={true}
          onFocus={() => setMessage({ type: "", message: "" })}
        />
        <div style={{ color: `${message.type === "error" ? "red" : "black"}` }}>
          {message.message}
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "50%", marginTop: "1rem" }}
            onClick={handleSubmit}
          >
            Отправить новость модератору
          </Button>
          <Button
            variant="contained"
            style={{
              width: "50%",
              marginTop: "1rem",
              backgroundColor: "orange",
            }}
          >
            Вернуться на главную
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.authenticated,
});

export default connect(mapStateToProps, actions)(requireAuth(AddNews));
