import { SET_LOADER_TRUE } from "../constants";

export const setLoaderTrue = () => async (dispatch) => {
    dispatch({
        type: SET_LOADER_TRUE,
        payload: true,
    });
}