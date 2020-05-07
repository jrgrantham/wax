import * as actionTypes from "../actionTypes";

export function updateRisk(type, id, field, data) {
  return {
    type: actionTypes.UPDATE_RISK,
    payload: {
      type,
      id,
      field,
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
  return {
    type: actionTypes.SET_PROJECT_INFO,
    payload: info,
  };
}

export function setRiskOptions(riskType, key, value) {
  return {
    type: actionTypes.SET_RISK_OPTIONS,
    payload: {
      riskType,
      key,
      value,
    },
  };
}

export function addToProject(type, data) {
  return {
    type: actionTypes.ADD_TO_PROJECT,
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
  };
}

export function setSelected(type) {
  return {
    type: actionTypes.SET_SELECTED,
    payload: type,
  };
}

export function setRiskColor(type, color) {
  return {
    type: actionTypes.SET_RISK_COLOR,
    payload: { type, color },
  };
}

export function toggleProjectBoolean(key) {
  return {
    type: actionTypes.TOGGLE_PROJECT_BOOLEAN,
    payload: key,
  };
}

export function setProjectAdmin(data) {  
  console.log(data);
  
  return {
    type: actionTypes.SET_PROJECT_ADMIN,
    payload: data,
  };
}

export function replaceRisks(type, data) {
  return {
    type: actionTypes.REPLACE_RISKS,
    payload: {
      type,
      data,
    },
  };
}
