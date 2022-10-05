import { GET_EXPENSE_DETAILS } from "../constants";

const initialState = {
	expenseDetails: {}
}

export const expenseDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_EXPENSE_DETAILS:
			return {
				...state,
				expenseDetails: action.payload
			};
		default:
			return state;
	}
};
