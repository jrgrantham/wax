import * as actionTypes from "../actionTypes";
import { risks } from "../../data/dummyData";

export function riskReducer(state = risks, action) {
  switch (action.type) {
    case actionTypes.UPDATE_RISK:
      return {
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            return {
              ...entry,
              [action.payload.field]: action.payload.data,
            };
          }
          return entry;
        }),
      };
    case actionTypes.UPDATE_PROBABILITY:
      return {
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, probability: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.UPDATE_CONSEQUENCE:
      return {
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, consequence: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.DELETE_RISK:
      return {
        entries: state.entries.filter(
          (entry) => entry.id !== action.payload.id
        ),
      };
    case actionTypes.ADD_TO_PROJECT:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].concat(
          action.payload.data
        ),
      };
    case actionTypes.REPLACE_RISKS:
      return {
        entries: action.payload,
      };
    default:
      return state;
  }
}
