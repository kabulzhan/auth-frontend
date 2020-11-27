import React, { useEffect } from "react";
import requireAuth from "./requireAuth";
import { connect } from "react-redux";
import * as actions from "../actions";
import Button from "@material-ui/core/Button";
import CheckButton from "./buttons/CheckButton";

const CheckNews = ({
  getUnapprovedNews,
  approveNews,
  deleteNews,
  token,
  news,
}) => {
  useEffect(() => {
    console.log("get unapproved news");
    getUnapprovedNews(token);
  }, [token]);

  const handleApproveNews = (id) => {
    console.log("approve news");
    approveNews(id, token);
  };
  const handleDeleteNews = (id) => deleteNews(id, token);
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      {news.map((article) => (
        <div
          style={{
            margin: "1.5rem auto",
            border: "black 1px solid",
            padding: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyItems: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3>{article.newsHeader}</h3>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <em>
                {new Date(Number(article.submittedDate)).toLocaleString(
                  "ru-RU"
                )}
              </em>
            </div>
          </div>
          <div>{article.newsBody.substring(0, 50)}</div>

          <div>
            <p />
            <strong>Статус:</strong>{" "}
            {article.approved
              ? "Опубликован на сайте "
              : "Еще не утвержден модератором"}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CheckButton
              sent="Отправляется..."
              color="primary"
              handleSubmit={handleApproveNews}
              id={article._id}
            >
              Отправить
            </CheckButton>
            <CheckButton
              sent="Удаляется..."
              color="secondary"
              handleSubmit={handleDeleteNews}
              id={article._id}
            >
              Удалить
            </CheckButton>
            {/* <Button
              id={`approve ${article._id}`}
              variant="outlined"
              color="primary"
              size="small"
              
              style={{
                marginRight: "0",
                marginLeft: "auto",
              }}
              onClick={(e) => {
                console.log("clicked");
                document
                  .getElementById(`approve ${article._id}`)
                  .setAttribute("disabled", "true");
                // e.target.disabled = true;
                // handleSubmit(article._id);
              }}
            >
              Одобрить
            </Button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loadingMessage: state.auth.loadingMessage,
  token: state.auth.authenticated,
  news: state.news.news,
});

export default connect(mapStateToProps, actions)(requireAuth(CheckNews));