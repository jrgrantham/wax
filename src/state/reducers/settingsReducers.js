import * as actionTypes from "../actionTypes";
import { globalSettings} from "../../data/globalSettings";

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

export function settingsReducer(state = globalSettings, action) {
  switch (action.type) {
  //   case actionTypes.UPDATE_RISK:
  //     console.log(action.payload.data);
  //     return {
  //       ...state,
  //       [action.payload.type]: state[action.payload.type].map((entry) => {
  //         if (entry.id === action.payload.id) {
  //           return {
  //             ...entry,
  //             [action.payload.field]: action.payload.data,
  //           };
  //         }
  //         return entry;
  //       }),
  //     };
  //   case actionTypes.UPDATE_PROBABILITY:
  //     return {
  //       ...state,
  //       [action.payload.type]: state[action.payload.type].map((entry) => {
  //         if (entry.id === action.payload.id) {
  //           return { ...entry, probability: action.payload.value };
  //         }
  //         return entry;
  //       }),
  //     };
  //   case actionTypes.UPDATE_CONSEQUENCE:
  //     return {
  //       ...state,
  //       [action.payload.type]: state[action.payload.type].map((entry) => {
  //         if (entry.id === action.payload.id) {
  //           return { ...entry, consequence: action.payload.value };
  //         }
  //         return entry;
  //       }),
  //     };
  //   case actionTypes.DELETE_RISK:
  //     return {
  //       ...state,
  //       [action.payload.type]: state[action.payload.type].filter(
  //         (entry) => entry.id !== action.payload.id
  //       ),
  //     };
  //   case actionTypes.SET_PROJECT_INFO:
  //     console.log("set project info");
  //     return {
  //       ...state,
  //       company: action.payload.company,
  //       nature: action.payload.nature,
  //       type: action.payload.type,
  //       project: action.payload.project,
  //       application: action.payload.application,
  //     };
  //   case actionTypes.SET_RISK_OPTIONS:
  //     console.log("set risk info reducer");
  //     return {
  //       ...state,
  //       options: {
  //         ...state.options,
  //         [action.payload.riskType]: action.payload.info,
  //       },
  //     };
  //   case actionTypes.ADD_TO_PROJECT:
  //     console.log("set risk info reducer");
  //     return {
  //       ...state,
  //       [action.payload.type]: state[action.payload.type].concat(
  //         action.payload.data
  //       ),
  //     };
  //   case actionTypes.TOGGLE_RISK_DISPLAY:
  //     return {
  //       ...state,
  //       options: {
  //         ...state.options,
  //         [action.payload]: {
  //           ...state.options[action.payload],
  //           display: !state.options[action.payload].display,
  //         },
  //       },
  //     };
  //   case actionTypes.SORT_BY_RISK:
  //     return {
  //       ...state,
  //       [action.payload.type]: action.payload.data,
  //     };
    default:
      return state;
  }
}