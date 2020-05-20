import * as actionTypes from "../actionTypes";

export function updateTemplateRisk(id, field, data) {
  return {
    type: actionTypes.UPDATE_TEMPLATE_RISK,
    payload: {
      id,
      field,
      data,
    },
  };
}

export function updateTemplateProbability(id, value) {
  return {
    type: actionTypes.UPDATE_TEMPLATE_PROBABILITY,
    payload: {
      id,
      value,
    },
  };
}

export function updateTemplateConsequence(id, value) {
  return {
    type: actionTypes.UPDATE_TEMPLATE_CONSEQUENCE,
    payload: {
      id,
      value,
    },
  };
}

export function deleteTemplateRisk(id) {
  return {
    type: actionTypes.DELETE_TEMPLATE_RISK,
    payload: {
      id,
    },
  };
}

export function addToTemplate(data) {
  return {
    type: actionTypes.ADD_TO_TEMPLATE,
    payload: data
  };
}

export function replaceTemplateRisks(data) {
  return {
    type: actionTypes.REPLACE_TEMPLATE_RISKS,
    payload: data,
  };
}

export function toggleTemplateTypes(projectType, id) {
  console.log(projectType, id);
  return {
    type: actionTypes.TOGGLE_TEMPLATE_TYPES,
    payload: {
      projectType,
      id
    },
  };
}