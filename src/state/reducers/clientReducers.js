import * as actionTypes from "../actionTypes";

export function clientReducer(state = [], action) {
  switch (action.type) {
    case actionTypes.SET_CLIENTS:
      // console.log(action.payload);
      return action.payload;
    case actionTypes.DELETE_CLIENT:
      // console.log(action.payload);
      return state.filter((client) => client.id !== action.payload);
    default:
      return state;
  }
}
