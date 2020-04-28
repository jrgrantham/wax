import * as actionTypes from "./actionTypes";
import { riskData } from "../riskTable/dummyData";

const initialState = {
  company: "",
  project: "",
  riskRange: [],
  managerial: [],
  technical: [],
  commercial: [],
  legal: [],
};
// to be used as initial state instead of riskData

export function riskReducer(state = riskData, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROBABILITY:
      console.log(
        // "reducer",
        " risk type: ",
        action.payload.type,
        "\n",
        "risk id:   ",
        action.payload.id,
        "\n",
        "prob value:",
        action.payload.value
      );
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, probability: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.UPDATE_CONSEQUENCE:
      console.log(
        // "reducer",
        " risk type: ",
        action.payload.type,
        "\n",
        "risk id:   ",
        action.payload.id,
        "\n",
        "cons value:",
        action.payload.value
      );
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((entry) => {
          if (entry.id === action.payload.id) {
            return { ...entry, consequence: action.payload.value };
          }
          return entry;
        }),
      };
    case actionTypes.DELETE_RISK:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter(
          (entry) => entry.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
