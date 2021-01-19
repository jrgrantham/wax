import * as actionTypes from "../actionTypes";

export function setClients(clients) {
  return {
    type: actionTypes.SET_CLIENTS,
    payload: clients,
  };
}

export function deleteClient(id) {
  return {
    type: actionTypes.DELETE_CLIENT,
    payload: id,
  };
}
