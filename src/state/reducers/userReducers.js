import * as actionTypes from "../actionTypes";
import { user } from "../../data/dummyData";

export function userReducer(state = user, action) {
  switch (action.type) {
    case actionTypes.SET_PROJECT_INFO:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case actionTypes.SET_RISK_OPTIONS:
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload.riskType]: {
            ...state.options[action.payload.riskType],
            [action.payload.key]: action.payload.value
          }
        },
      };
    case actionTypes.TOGGLE_RISK_DISPLAY:
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload]: {
            ...state.options[action.payload],
            display: !state.options[action.payload].display,
          },
        },
      };
    case actionTypes.SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case actionTypes.SET_RISK_COLOR:
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload.type]: {
            ...state.options[action.payload.type],
            color: action.payload.color,
          },
        },
      };
    case actionTypes.TOGGLE_PROJECT_BOOLEAN:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case actionTypes.SET_PROJECT_ADMIN:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
}
