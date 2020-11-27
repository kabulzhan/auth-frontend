import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const News = ({ clearNews, getApprovedNews, news }) => {
  useEffect(() => {
    clearNews();
    getApprovedNews();
  }, [getApprovedNews]);
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

export default connect(mapStateToProps, actions)(News);
