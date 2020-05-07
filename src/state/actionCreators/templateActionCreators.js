import * as actionTypes from "../actionTypes";

export function updateTemplateRisk(type, id, field, data) {
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

export function updateTemplateProbability(type, id, value) {
  return {
    type: actionTypes.UPDATE_PROBABILITY,
    payload: {
      type,
      id,
      value,
    },
  };
}

export function updateTemplateConsequence(type, id, value) {
  return {
    type: actionTypes.UPDATE_CONSEQUENCE,
    payload: {
      type,
      id,
      value,
    },
  };
}

export function deleteTemplateRisk(type, id) {
  return {
    type: actionTypes.DELETE_RISK,
    payload: {
      type,
      id,
    },
  };
}

export function addToTemplate(type, data) {
  return {
    type: actionTypes.ADD_TO_PROJECT,
    payload: {
      data,
      type,
    },
  };
}

export function replaceTemplateRisks(type, data) {
  return {
    type: actionTypes.REPLACE_RISKS,
    payload: {
      type,
      data,
    },
  };
}

export function updateTemplateTypes(type, data) {
  return {
    type: actionTypes.REPLACE_RISKS,
    payload: {
      type,
      data,
    },
  };
}