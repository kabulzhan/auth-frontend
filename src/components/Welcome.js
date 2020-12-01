import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TextField from "@material-ui/core/TextField";
import Spinner from "./with-spinner/spinner.component";

const News = ({
  filteredNews,
  news,
  clearNews,
  getApprovedNews,
  searchNews,
  isLoading,
}) => {
  useEffect(() => {
    clearNews();
    getApprovedNews();
  }, [getApprovedNews]);

  const handleChange = (e) => {
    searchNews(e.target.value, news);
  };
  if (isLoading) return <Spinner />;
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <TextField
        id="standard-basic"
        label="Поиск по новостям..."
        fullWidth
        onChange={handleChange}
      />
      {filteredNews.map((article) => (
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
  token: state.auth.authenticated,
  news: state.news.news,
  filteredNews: state.news.filteredNews,
  isLoading: state.news.isNewsLoading,
});

export default connect(mapStateToProps, actions)(News);
