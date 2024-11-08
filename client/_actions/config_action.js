export const setSearchQuery = (query) => ({
  type: "SET_SEARCH_QUERY",
  payload: query,
});

// 페이지 번호 업데이트 액션
export const setPageNumber = (pageNumber) => ({
  type: "SET_PAGE_NUMBER",
  payload: pageNumber,
});
