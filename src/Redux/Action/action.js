// import axios from "axios";
// import {
// 	BOOKS_LIST_REQUEST,
// 	BOOKS_LIST_SUCCESS,
// 	BOOKS_LIST_FAIL,
// 	BOOKS_DETAILS_FAIL,
// 	BOOKS_DETAILS_REQUEST,
// 	BOOKS_DETAILS_SUCCESS,
// } from "../constants/booksConstants";

// export const listBooks = () => async (dispatch) => {
// 	try {
// 		dispatch({ type: BOOKS_LIST_REQUEST });
// 		const { data } = await axios.get(
// 			`/books?keyword=&pageNumber=`
// 		);

// 		dispatch({
// 			type: BOOKS_LIST_SUCCESS,
// 			payload: data,
// 		});
// 	} catch (error) {
// 		dispatch({
// 			type: BOOKS_LIST_FAIL,
// 			payload:
// 				error.response && error.response.data.message
// 					? error.response.data.message
// 					: error.message,
// 		});
// 	}
// };

// export const detailBooks = async (dispatch, id) => {
// 	try {
// 		dispatch({ type: BOOKS_DETAILS_REQUEST });

// 		const { data } = await axios.get(`/books/${id}`);
// 		dispatch({
// 			type: BOOKS_DETAILS_SUCCESS,
// 			payload: data,
// 		});
// 	} catch (error) {
// 		dispatch({
// 			type: BOOKS_DETAILS_FAIL,
// 			payload:
// 				error.response && error.response.data.message
// 					? error.response.data.message
// 					: error.message,
// 		});
// 	}
// };