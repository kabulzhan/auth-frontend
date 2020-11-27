import React, { useEffect } from "react";
import requireAuth from "./requireAuth";
import { connect } from "react-redux";
import * as actions from "../actions";

const MyNews = ({ getMyNews, token, news }) => {
  useEffect(() => {
    getMyNews(token);
  }, [token]);
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

export default connect(mapStateToProps, actions)(requireAuth(MyNews));
