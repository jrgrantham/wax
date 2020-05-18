import * as actionTypes from "../actionTypes";

export function clientReducer(state = [], action) {
  switch (action.type) {
    case 'actionTypes.SET_BACKGROUND_COLOR':
      return {

      }
    default:
      return state;
  }
}
