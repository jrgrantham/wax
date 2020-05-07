import * as actionTypes from "../actionTypes";
import { riskData } from "../../data/dummyData";

// const initialState = {
//   company: "",
//   nature: "burn",
//   type: "experiment",
//   project: "",
//   application: "",
//   riskRange: ["TBC", "Low", "Medium", "High"],
//   options: {
//     managerial: {
//       display: true,
//       defaultOwner: "JG",
//       color: "red",
//     },
//     technical: {
//       display: true,
//       defaultOwner: "DJ",
//       color: "blue",
//     },
//     commercial: {
//       display: false,
//       defaultOwner: "CG",
//       color: "green",
//     },
//     legal: {
//       display: true,
//       defaultOwner: "",
//       color: "orange",
//     },
//     environmental: {
//       display: true,
//       defaultOwner: "",
//       color: "yellow",
//     },
//   },
//   managerial: [],
//   technical: [],
//   commercial: [],
//   legal: [],
//   environmental: [],
// };
// to be used as initial state instead of riskData

export function projectReducer(state = riskData, action) {
  switch (action.type) {
    case actionTypes.UPDATE_RISK:
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
    case actionTypes.UPDATE_PROBABILITY:
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
    case actionTypes.ADD_TO_PROJECT:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].concat(
          action.payload.data
        ),
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
    case actionTypes.REPLACE_RISKS:
      return {
        ...state,
        [action.payload.type]: action.payload.data,
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
