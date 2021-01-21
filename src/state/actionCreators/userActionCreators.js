import * as actionTypes from "../actionTypes";
import url from "../../helpers/url";
import axiosWithAuth from "../../authentication/axiosWithAuth";

const userApi = `${url()}api/users/user`;
const adminApi = `${url()}api/users/admin`;
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

export const sendUserChanges = (key, value ) => async (dispatch) => {
  console.log("key:", key, "value:", value );
  try {
    await axiosWithAuth(token).put(userApi, { key, value });
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

export const sendAdminChanges = (key, value ) => async (dispatch) => {
  console.log("key:", key, "value:", value );
  try {
    await axiosWithAuth(token).put(adminApi, { key, value });
    alert("Success");
  } catch (e) {
    alert("Failed");
    console.log(e);
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
