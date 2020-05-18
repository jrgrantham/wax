import * as actionTypes from "../actionTypes";

export function updateTemplateRisk(type, id, field, data) {
  return {
    type: actionTypes.UPDATE_TEMPLATE_RISK,
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
    type: actionTypes.UPDATE_TEMPLATE_PROBABILITY,
    payload: {
      type,
      id,
      value,
    },
  };
}

export function updateTemplateConsequence(type, id, value) {
  return {
    type: actionTypes.UPDATE_TEMPLATE_CONSEQUENCE,
    payload: {
      type,
      id,
      value,
    },
  };
}

export function deleteTemplateRisk(type, id) {
  return {
    type: actionTypes.DELETE_TEMPLATE_RISK,
    payload: {
      type,
      id,
    },
  };
}

export function addToTemplate(type, data) {
  return {
    type: actionTypes.ADD_TO_TEMPLATE,
    payload: {
      data,
      type,
    },
  };
}

export function replaceTemplateRisks(data) {
  return {
    type: actionTypes.REPLACE_TEMPLATE_RISKS,
    payload: data,
  };
}

export function toggleTemplateTypes(type, projectType, id) {
  console.log(type, projectType, id);
  return {
    type: actionTypes.TOGGLE_TEMPLATE_TYPES,
    payload: {
      type,
      projectType,
      id
    },
  };
}