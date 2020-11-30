import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  LOADING,
  CLEAR_MESSAGES,
  NEWS_RECEIVED,
  NEWS_FILTERED,
  NEWS_CLEARED,
} from "./types";

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: "Идет авторизация..." });
    const response = await axios.post(
      "https://auth-server-boilerplate.herokuapp.com/signup",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ name: response.data.name, email: response.data.email })
    );
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email is in use" });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: "Идет авторизация..." });
    const response = await axios.post(
      "https://auth-server-boilerplate.herokuapp.com/signin",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        admin: response.data.admin,
      })
    );
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Некорректно введен логин/пароль" });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return {
    type: AUTH_USER,
    payload: {},
  };
};

export const clearMessages = () => ({
  type: CLEAR_MESSAGES,
});

export const submitNews = (formProps, token, callback) => async (dispatch) => {
  try {
    // dispatch({ type: LOADING, payload: "Новость отправляется..." });
    const headers = {
      authorization: token,
    };
    await axios.post(
      "https://auth-server-boilerplate.herokuapp.com/news",
      formProps,
      { headers: headers }
    );
    callback();
  } catch (e) {
    console.log("error while sending news data");
    console.log(e);
  }
};

export const approveNews = (newsId, token) => async (dispatch) => {
  try {
    const headers = {
      authorization: token,
    };
    const response = await axios.post(
      "https://auth-server-boilerplate.herokuapp.com/news/unapproved",
      { id: newsId },
      { headers: headers }
    );
    dispatch({ type: NEWS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log("error while approving the article");
    console.log(e);
  }
};

export const clearNews = () => ({ type: NEWS_CLEARED, payload: [] });

export const deleteNews = (newsId, token) => async (dispatch) => {
  try {
    const headers = {
      authorization: token,
    };
    axios.delete(
      "https://auth-server-boilerplate.herokuapp.com/news/unapproved",
      {
        headers,
        crossdomain: true,
        data: {
          id: newsId,
        },
      }
    );
    const response = await axios.get(
      "https://auth-server-boilerplate.herokuapp.com/news/unapproved",
      {
        headers: headers,
      }
    );

    dispatch({ type: NEWS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log("error while deleting the article");
    console.log(e);
  }
};

export const getMyNews = (token) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_CLEARED, payload: [] });

    const headers = {
      authorization: token,
    };
    const response = await axios.get(
      "https://auth-server-boilerplate.herokuapp.com/news/mynews",
      {
        headers: headers,
      }
    );
    dispatch({ type: NEWS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log("error while receiving news from the server");
    console.log(e);
  }
};

export const getApprovedNews = () => async (dispatch) => {
  try {
    // dispatch({ type: LOADING, payload: "Новости запрашиваются из сервера..." });
    const response = await axios.get(
      "https://auth-server-boilerplate.herokuapp.com/news/"
    );
    dispatch({ type: NEWS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log("error while receiving news from the server");
    console.log(e);
  }
};

export const getUnapprovedNews = (token) => async (dispatch) => {
  try {
    // dispatch({ type: LOADING, payload: "Новости запрашиваются из сервера..." });
    const headers = {
      authorization: token,
    };
    const response = await axios.get(
      "https://auth-server-boilerplate.herokuapp.com/news/unapproved",
      {
        headers: headers,
      }
    );
    dispatch({ type: NEWS_RECEIVED, payload: response.data });
  } catch (e) {
    console.log("error while receiving news from the server");
    console.log(e);
  }
};

export const searchNews = (query, news) => {
  // console.log(query);
  // console.log(news);
  let filteredNews = [];

  if (!query) filteredNews = news;
  else
    filteredNews = news.filter(
      (article) =>
        article.newsHeader.toLowerCase().includes(query) ||
        article.newsBody.toLowerCase().includes(query)
    );
  return { type: NEWS_FILTERED, payload: filteredNews };
  // dispatch({ type: NEWS_RECEIVED, payload: response.data });
};
