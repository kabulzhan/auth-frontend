import React, { useEffect } from "react";
import requireAuth from "./requireAuth";
import { connect } from "react-redux";
import * as actions from "../actions";
import CheckButton from "./buttons/CheckButton";
import Spinner from "./with-spinner/spinner.component";

const CheckNews = ({
  clearNews,
  getUnapprovedNews,
  approveNews,
  deleteNews,
  token,
  news,
  isLoading,
}) => {
  useEffect(() => {
    clearNews();
    getUnapprovedNews(token);
  }, [token]);

  const handleApproveNews = (id) => {
    approveNews(id, token);
  };
  const handleDeleteNews = (id) => deleteNews(id, token);
  if (isLoading) return <Spinner />;
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      {news.map((article) => (
        <div
          style={{
            margin: "1.5rem auto",
            border: "black 1px solid",
            padding: "1rem",
          }}
          key={article._id}
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
          <div>{article.newsBody.substring(0, 200) + "..."}</div>

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
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.authenticated,
  news: state.news.news,
  isLoading: state.news.isNewsLoading,
});

export default connect(mapStateToProps, actions)(requireAuth(CheckNews));
