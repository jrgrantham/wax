import { templates } from "../../data/projectOptions";
import * as actionTypes from "../actionTypes";

export function templateReducer(state = templates, action) {
  switch (action.type) {
    case actionTypes.UPDATE_TEMPLATE_RISK:
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
    case actionTypes.UPDATE_TEMPLATE_PROBABILITY:
      return {
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, probability: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.UPDATE_TEMPLATE_CONSEQUENCE:
      return {
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, consequence: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.DELETE_TEMPLATE:
      console.log(action.payload.templateId);
      return {
        entries: state.entries.filter(
          (entry) => entry.id !== action.payload.templateId
        ),
      };
    case actionTypes.ADD_TO_TEMPLATE:
      console.log(action.payload);

      return {
        entries: state.entries.concat(action.payload),
      };
    case actionTypes.REPLACE_TEMPLATE_RISKS:
      return {
        entries: action.payload,
      };
    case actionTypes.GET_TEMPLATES:
      return {
        entries: action.payload,
      };
    case actionTypes.TOGGLE_TEMPLATE_TYPES:
      return {
        entries: state.entries.map((entry) => {
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
