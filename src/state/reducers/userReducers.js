import * as actionTypes from "../actionTypes";
import { user } from "../../data/newUser";

export function userReducer(state = user, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    case actionTypes.TOGGLE_PROJECT_BOOLEAN:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case actionTypes.SET_PROJECT_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    // case actionTypes.SET_CLIENTS:
    //   console.log(action.payload);
    //   return action.payload
    default:
      return state;
  }
}
