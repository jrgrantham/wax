import * as actionTypes from "./actionTypes";
import { riskData } from "../riskTable/dummyData";

const initialState = {
  company: "",
  project: "",
  ranking: [],
  managerial: [],
  technical: [],
  commercial: [],
  legal: [],
  values: [],
};
// to be used as initial state instead of riskData

export function riskReducer(state = riskData, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_LIKLIHOOD:
      return {
        ...state,
        values: state.values.map((type) => {
          if (type === action.payload.type) {
            type.entries.map((entry) => {
              if (entry === action.payload.entry) {
                entry.liklihood = entry.liklihood++;
              }
            });
          }
        }),
      };
    // case actionTypes.REMOVE_FAVOURITE:
    //   return {
    //     ...state,
    //     favourites: state.favourites.filter(
    //       character => character.id !== action.payload.id,
    //     ),
    //     characters: [...state.characters, action.payload]
    //   };
    // case actionTypes.IMPORT_CHARACTERS:
    //   return {
    //     ...state,
    //     characters: action.payload
    //   };
    default:
      return state;
  }
}
