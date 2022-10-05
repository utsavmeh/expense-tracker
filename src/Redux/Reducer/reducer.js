// import {
// 	BOOKS_LIST_REQUEST,
// 	BOOKS_LIST_SUCCESS,
// 	BOOKS_LIST_FAIL,
// 	BOOKS_DETAILS_FAIL,
// 	BOOKS_DETAILS_REQUEST,
// 	BOOKS_DETAILS_SUCCESS,
// } from "../constants/booksConstants";

// export const booksListReducer = (state = { books: [] }, action) => {
// 	switch (action.type) {
// 		case BOOKS_LIST_REQUEST:
// 			return { loading: true, books: [] };
// 		case BOOKS_LIST_SUCCESS:
// 			return {
// 				loading: false,
// 				books: action.payload.book,
// 				pages: action.payload.pages,
// 				page: action.payload.page,
// 			};
// 		case BOOKS_LIST_FAIL:
// 			return { loading: false, error: action.payload };
// 		default:
// 			return state;
// 	}
// };

// export const booksDetailsReducer = (state = { book: {} }, action) => {
// 	switch (action.type) {
// 		case BOOKS_DETAILS_REQUEST:
// 			return { loading: true, ...state };
// 		case BOOKS_DETAILS_SUCCESS:
// 			return { loading: false, book: action.payload };
// 		case BOOKS_DETAILS_FAIL:
// 			return { loading: false, error: action.payload };
// 		default:
// 			return state;
// 	}
// };