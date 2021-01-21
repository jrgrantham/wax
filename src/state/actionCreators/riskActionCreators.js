import * as actionTypes from "../actionTypes";
import url from "../../helpers/url";
import axiosWithAuth from "../../authentication/axiosWithAuth";

const riskApi = `${url()}api/users/risks/`;

export const getRisks = () => async (dispatch) => {
  console.log("fetching risks");
  try {
    const res = await axiosWithAuth().get(riskApi);
    dispatch({
      type: actionTypes.GET_RISKS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const addRisk = (newRisk) => async (dispatch) => {
  console.log("adding risk");
  try {
    const res = await axiosWithAuth().post(riskApi, newRisk);
    dispatch({
      type: actionTypes.GET_RISKS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const sendUpdatedRisk = (updatedRisk) => async (dispatch) => {
  console.log("sending updated risk");
  try {
    await axiosWithAuth().put(riskApi, updatedRisk);
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const deleteRisk = (type, id) => async (dispatch) => {
  console.log("adding risk");
  try {
    const res = await axiosWithAuth().delete(riskApi, { data: {id} });
    console.log(res.data);
    dispatch({
      type: actionTypes.DELETE_RISK,
      payload: {
        type,
        id,
      },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export function deleteRiskOld(type, id) {
  return {
    type: actionTypes.DELETE_RISK,
    payload: {
      type,
      id,
    },
  };
}

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

export function replaceRisks(data) {
  return {
    type: actionTypes.REPLACE_RISKS,
    payload: data,
  };
}
