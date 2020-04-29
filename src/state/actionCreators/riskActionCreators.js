import * as actionTypes from "../actionTypes";

export function updateProbability(type, id, value) {
  return {
    type: actionTypes.UPDATE_PROBABILITY,
    payload: {
      type,
      id,
      value,
    },
  };
}

export function updateConsequence(type, id, value) {
  return {
    type: actionTypes.UPDATE_CONSEQUENCE,
    payload: {
      type,
      id,
      value,
    },
  };
}

export function deleteRisk(type, id) {
  return {
    type: actionTypes.DELETE_RISK,
    payload: {
      type,
      id,
    },
  };
}

export function setProjectInfo(info) {
  console.log(info);
  return {
    type: actionTypes.SET_PROJECT_INFO,
    payload: info,
  };
}

export function setRiskInfo(info) {
  console.log(info);
  return {
    type: actionTypes.SET_RISK_INFO,
    payload: info,
  };
}