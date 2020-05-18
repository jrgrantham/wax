import * as actionTypes from "../actionTypes";
import { user } from "../../data/dummyData";

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
    default:
      return state;
  }
}
