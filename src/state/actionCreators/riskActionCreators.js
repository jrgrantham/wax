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

export function addToProject(type, data) {
  return {
    type: actionTypes.ADD_TO_PROJECT,
    payload: {
      data,
      type,
    },
  };
}

export function replaceRisks(data) {
  return {
    type: actionTypes.REPLACE_RISKS,
    payload: data
  };
}
