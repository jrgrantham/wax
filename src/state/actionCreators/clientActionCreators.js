import * as actionTypes from "../actionTypes";
import url from "../../helpers/url";
import axiosWithAuth from "../../authentication/axiosWithAuth";

const allClientsApi = `${url()}api/users/clients`;
const clientApi = `${url()}api/users/client`;
const token = localStorage.getItem("token");

export const getClients = () => async (dispatch) => {
  console.log("fetching clients");
  try {
    const response = await axiosWithAuth(token).get(allClientsApi);
    dispatch({
      type: actionTypes.GET_CLIENTS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const sendNewClient = (user) => async (dispatch) => {
  console.log('sending new client');
  try {
    const res = await axiosWithAuth(token).post(clientApi, user);
    console.log("new client returned ID: ", res.data.id);
    localStorage.setItem("selectedClientId", res.data.id);
    dispatch({
      type: actionTypes.NEW_CLIENT,
      payload: user,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export const deleteClient = (client) => async (dispatch) => {
  console.log(client);
  try {
    await axiosWithAuth().delete(clientApi, { data: client });
    dispatch({
      type: actionTypes.DELETE_CLIENT,
      payload: client.id,
    });
  } catch (e) {
    dispatch({
      type: actionTypes.USERS_ERROR,
      payload: console.log(e),
    });
  }
};

export function setClients(clients) {
  return {
    type: actionTypes.SET_CLIENTS,
    payload: clients,
  };
}
