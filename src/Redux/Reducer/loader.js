import { SET_LOADER_FALSE, SET_LOADER_TRUE } from "../constants";

export const loader = (state = { loader: false}, action) => {
    switch(action.type){
        case SET_LOADER_TRUE:
            return{
                loader: true
            }
        case SET_LOADER_FALSE:
            return{
                loader: false
            }
        default:
            return state
    }
}