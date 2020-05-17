import { templates } from "../../data/projectOptions";
import * as actionTypes from "../actionTypes";

export function templateReducer(state = templates, action) {
  switch (action.type) {
    case actionTypes.UPDATE_TEMPLATE_RISK:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((entry) => {
          if (entry.id === action.payload.id) {
            return {
              ...entry,
              [action.payload.field]: action.payload.data,
            };
          }
          return entry;
        }),
      };
    case actionTypes.UPDATE_TEMPLATE_PROBABILITY:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, probability: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.UPDATE_TEMPLATE_CONSEQUENCE:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, consequence: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.DELETE_TEMPLATE_RISK:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter(
          (entry) => entry.id !== action.payload.id
        ),
      };
    // case actionTypes.SET_PROJECT_INFO:
    //   return {
    //     ...state,
    //     [action.payload.key]: action.payload.value,
    //   };
    case actionTypes.ADD_TO_TEMPLATE:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].concat(
          action.payload.data
        ),
      };
    case actionTypes.REPLACE_TEMPLATE_RISKS:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
      };
    case actionTypes.TOGGLE_TEMPLATE_TYPES:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((entry) => {
          if (entry.id === action.payload.id) {
            return {
              ...entry,
              [action.payload.projectType]: !entry[action.payload.projectType],
            };
          }
          return entry;
        }),
      };
    default:
      return state;
  }
}
