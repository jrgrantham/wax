import * as actionTypes from "../actionTypes";
import { riskData } from "../../riskManagement/dummyData";

const initialState = {
  company: "",
  nature: "burn",
  type: "experiment",
  project: "",
  application: "",
  riskRange: ["TBC", "Low", "Medium", "High"],
  options: {
    managerial: {
      display: true,
      defaultOwner: "JG",
      color: "red",
    },
    technical: {
      display: true,
      defaultOwner: "DJ",
      color: "blue",
    },
    commercial: {
      display: false,
      defaultOwner: "CG",
      color: "green",
    },
    legal: {
      display: true,
      defaultOwner: "",
      color: "orange",
    },
    environmental: {
      display: true,
      defaultOwner: "",
      color: "yellow",
    },
  },
  managerial: [],
  technical: [],
  commercial: [],
  legal: [],
  environmental: [],
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
      console.log('test');
      
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter(
          (entry) => entry.id !== action.payload.id
        ),
      };
    case actionTypes.SET_PROJECT_INFO:
      console.log('set project info');
      return {
        ...state,
        company: action.payload.company,
        nature: action.payload.nature,
        type: action.payload.type,
        project: action.payload.project,
        application: action.payload.application,
      };
      case actionTypes.SET_RISK_INFO:
      console.log('set risk info');
      return {
        ...state,

      };
    default:
      return state;
  }
}