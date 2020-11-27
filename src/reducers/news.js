import { NEWS_RECEIVED, NEWS_FILTERED } from "../actions/types";

const INITIAL_STATE = {
  news: [],
  filteredNews: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEWS_RECEIVED:
      return { ...state, news: action.payload, filteredNews: action.payload };
    case NEWS_FILTERED:
      return { ...state, filteredNews: action.payload };
    default:
      return state;
  }
}
