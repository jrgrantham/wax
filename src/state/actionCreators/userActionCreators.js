import * as actionTypes from "../actionTypes";
import url from "../../helpers/url";
import axiosWithAuth from "../../authentication/axiosWithAuth";

const userApi = `${url()}api/users/user`;
const token = localStorage.getItem("token");

export const getUser = () => async (dispatch) => {
  console.log("fetching user data");
  try {
    const res = await axiosWithAuth(token).get(userApi);
    dispatch({
      type: actionTypes.GET_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const sendUserChanges = (key, value, id) => async (dispatch) => {
  console.log("key:", key, "value:", value, "id:", id);
  try {
    await axiosWithAuth(token).put(userApi, { key, value, id });
    // const response = await axiosWithAuth(token).put(userApi, { key, value, id });
    // console.log(response);
    dispatch({
      type: actionTypes.SET_PROJECT_VALUE,
      payload: {
        key,
        value,
      },
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
}

export function toggleProjectBoolean(key) {
  return {
    type: actionTypes.TOGGLE_PROJECT_BOOLEAN,
    payload: key,
  };
}

export function setProjectValue(key, value) {
  return {
    type: actionTypes.SET_PROJECT_VALUE,
    payload: {
      key,
      value,
    },
  };
}
