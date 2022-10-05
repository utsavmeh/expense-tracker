import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { expenseDetailsReducer } from './Reducer/expenseDetails';
import { loader } from './Reducer/loader';

const reducer = {
	expenseDetails: expenseDetailsReducer,
	loader: loader,
};

const initialState = {};
const middleware = [thunk];
const store = configureStore(
	{reducer},
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;