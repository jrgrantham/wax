import * as actionTypes from "../actionTypes";

export function updateRisk(id, field, data) {
  return {
    type: actionTypes.UPDATE_RISK,
    payload: {
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

export function addToProject(data) {
  console.log(data);
  
  return {
    type: actionTypes.ADD_TO_PROJECT,
    payload: data
  };
}

export function replaceRisks(data) {
  return {
    type: actionTypes.REPLACE_RISKS,
    payload: data
  };
}
