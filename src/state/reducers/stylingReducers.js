import * as actionTypes from "../actionTypes";

const initialState = {
  background: '',
  managerial: '',
  commercial: '',
  technical: '',
  environmental: '',
  legal: '',
  header: '',
  risk1: 'red',
  risk2: '',
  high: '',
  medium: '',
  low: '',
  tbc: '',
  owner: '',
};
// to be used as initial state instead of riskData

export function stylingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BACKGROUND_COLOR:
      return {

      }
    default:
      return state;
  }
}
