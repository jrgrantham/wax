import * as actionTypes from "../actionTypes";

import {dummyClients} from '../../data/dummyClients';

export function clientReducer(state = dummyClients, action) {
  switch (action.type) {
    case actionTypes.SET_BACKGROUND_COLOR:
      return {

      }
    default:
      return state;
  }
}
