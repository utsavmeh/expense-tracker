import { getExpenseDetailsApi } from "../../http/expenseDetails";
import {
  GET_EXPENSE_DETAILS,
  SET_LOADER_TRUE,
  SET_LOADER_FALSE
} from "../constants";



export const getExpenseDetails = () => async (dispatch) => {

  dispatch({ type: SET_LOADER_TRUE });
  try {

    const data = await getExpenseDetailsApi();
    dispatch({ 
      type: GET_EXPENSE_DETAILS,
      payload: data
    });
    dispatch({ type: SET_LOADER_FALSE });

  } catch (error) {
    dispatch({ type: SET_LOADER_FALSE });
    console.log(error);
  }
};
