import { NEWS_RECEIVED } from "../actions/types";

const INITIAL_STATE = {
  news: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEWS_RECEIVED:
      return { ...state, news: action.payload };
    default:
      return state;
  }
}
