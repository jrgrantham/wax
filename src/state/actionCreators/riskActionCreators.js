import * as actionTypes from "../actionTypes";
import url from "../../helpers/url";
import axiosWithAuth from "../../authentication/axiosWithAuth";

const riskApi = `${url()}api/users/risks/`;
const token = localStorage.getItem("token");

export const getRisks = () => async (dispatch) => {
  console.log("fetching risks");
  try {
    const res = await axiosWithAuth(token).get(riskApi);
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

export function deleteRisk(type, id) {
  return {
    type: actionTypes.DELETE_RISK,
    payload: {
      type,
      id,
    },
  };
}

export function addToProject(data) {
  return {
    type: actionTypes.ADD_TO_PROJECT,
    payload: data,
  };
}

export function replaceRisks(data) {
  return {
    type: actionTypes.REPLACE_RISKS,
    payload: data,
  };
}

// const userApi = `${url()}api/users/user`;
// const templateApi = `${url()}api/users/templates`;
// const clientApi = `${url()}api/users/client/`;
// const riskApi = `${url()}api/users/risks/`
// const token = localStorage.getItem("token");

// function getData() {
//   console.log('fetching user data');
//   const selectedUser = localStorage.getItem("selectedClientId");
//   axiosWithAuth(token, 'test')
//     .get(userApi)
//     .then((res) => {
//       // check response, if user not admin, set user
//       // console.log("initial id:", res.data.id);
//       if (!res.data.admin) {
//         console.log('client detected - setting user');
//         props.setUser(res.data);
//         // if user is admin, fetch the user by selected id
//       } else {
//         // props.setUser(res.data);
//         console.log(`admin detected - fetching data, ID: ${selectedUser}`);
//         // if no user in storage, skip.
//         if (selectedUser) {
//           axiosWithAuth(token)
//             .get(clientApi + selectedUser)
//             .then((res) => {
//               console.log(`data for user ID: ${selectedUser} received`);
//               props.setUser(res.data);
//             })
//             .catch((error) => {
//               console.log(error.message);
//             });
//         }
//       }
//       let user = "";
//       // if admin, get by user from local storage
//       if (res.data.admin) {
//         user = selectedUser;
//         // otherwise, get by user info
//       } else {
//         user = res.data.id;
//       }
//       setTimeout(() => {
//         console.log('** 500ms delay **');
//         console.log('fetching risks');
//         axiosWithAuth(token)
//           .get(riskApi + user)
//           .then((res) => {
//             console.log('risks received');
//             props.replaceRisks(sortRisks(res.data));
//           })
//           .catch((error) => {
//             console.log('test');
//             console.log(error.message);
//             // props.history.push("/login");
//           });
//         if (res.data.useTemplates) {
//         console.log('fetching templates');
//         axiosWithAuth(token)
//             .get(templateApi)
//             .then((res) => {
//             console.log('templates received');
//             props.replaceTemplateRisks(res.data);
//             })
//             .catch((error) => {
//               console.log(error.message);
//             });
//         }
//       }, 500);
//     })
//     .catch((error) => {
//       console.log(error.message);
//       // window.location.replace(`${url()}login`)
//       // props.history.push("/login");
//     });
// }
