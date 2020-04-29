import * as actionTypes from "../actionTypes";

export function updateProbability(type, id, value) {
  return {
    type: actionTypes.UPDATE_PROBABILITY,
    payload: {
      type,
      id,
      value
    }
  };
}

export function updateConsequence(type, id, value) {
  return {
    type: actionTypes.UPDATE_CONSEQUENCE,
    payload: {
      type,
      id,
      value
    }
  };
}

export function deleteRisk(type, id) {
  return {
    type: actionTypes.DELETE_RISK,
    payload: {
      type,
      id
    }
  }
}

