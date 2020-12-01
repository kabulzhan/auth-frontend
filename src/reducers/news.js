import { NEWS_RECEIVED, NEWS_FILTERED, NEWS_CLEARED } from "../actions/types";

const INITIAL_STATE = {
  news: [],
  filteredNews: [],
  isNewsLoading: true,
};

export default function news(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEWS_CLEARED:
      return { ...state, news: action.payload, isNewsLoading: true };
    case NEWS_RECEIVED:
      return {
        ...state,
        news: action.payload,
        filteredNews: action.payload,
        isNewsLoading: false,
      };
    case NEWS_FILTERED:
      return { ...state, filteredNews: action.payload };
    default:
      return state;
  }
}
