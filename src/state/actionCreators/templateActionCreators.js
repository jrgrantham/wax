import * as actionTypes from "../actionTypes";
import url from "../../helpers/url";
import axiosWithAuth from "../../authentication/axiosWithAuth";

const templateApi = `${url()}api/users/templates`;
const token = localStorage.getItem("token");

export const getTemplates = () => async (dispatch) => {
  console.log("fetching templates");
  try {
    const res = await axiosWithAuth(token).get(templateApi);
    dispatch({
      type: actionTypes.GET_TEMPLATES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const updateTemplate = (template) => async (dispatch) => {
  try {
    await axiosWithAuth().put(templateApi, template);
    // dispatch({
    //   type: actionTypes.UPDATE_TEMPLATE,
    //   payload: {},
    // });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const deleteTemplate = (templateId) => async (dispatch) => {
  const id = { templateId };
  console.log(templateId);
  console.log(id);
  try {
    await axiosWithAuth().delete(templateApi, { data: id });
    dispatch({
      type: actionTypes.DELETE_TEMPLATE,
      payload: {
        templateId,
      },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

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

export function addToTemplate(data) {
  return {
    type: actionTypes.ADD_TO_TEMPLATE,
    payload: data,
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
      id,
    },
  };
}
