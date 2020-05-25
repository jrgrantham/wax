import * as actionTypes from "../actionTypes";

export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  }
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
      value
    }
  }
}