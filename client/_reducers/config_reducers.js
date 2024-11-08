// searchAndPageReducer.js

const initialState = {
  searchQuery: "", // 초기 검색어 값
  pageNumber: 1, // 초기 페이지 값
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_PAGE_NUMBER":
      return {
        ...state,
        pageNumber: action.payload,
      };
    default:
      return state;
  }
}
