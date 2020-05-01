import * as actionTypes from "../actionTypes";

export function updateRisk(type, id, data) {
  console.log(data);

  return {
    type: actionTypes.UPDATE_RISK,
    payload: {
      type,
      id,
      data,
    },
  };
}

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

export function setRiskOptions(riskType, info) {
  return {
    type: actionTypes.SET_RISK_OPTIONS,
    payload: {
      riskType,
      info,
    },
  };
}

export function addEmptyRow(type, data) {
  console.log(data);
  return {
    type: actionTypes.ADD_EMPTY_ROW,
    payload: {
      data,
      type,
    },
  };
}

export function toggleRiskDisplay(type) {
  return {
    type: actionTypes.TOGGLE_RISK_DISPLAY,
    payload: type,
  }
}

export function sortByRisk(type, data) {
  console.log(type);
  return {
    type: actionTypes.SORT_BY_RISK,
    payload: {
      type,
      data
    }
  }
}