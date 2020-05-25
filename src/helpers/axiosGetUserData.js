// import { connect } from "react-redux";
// import axiosWithAuth from "../authentication/axiosWithAuth";
// import url from "../helpers/url";

// const userApi = `${url()}api/users/user`;
// const allClientsApi = `${url()}api/users/clients`;
// const clientApi = `${url()}api/users/client/`;
// const token = localStorage.getItem("token");

// function getUserData(props) {

//   // if admin, need to fetch client by different method
//   // set the chosen project id to local storage

//   axiosWithAuth(token)
//   .get(userApi)
//   .then((res) => {
//     // check response, if user not admin, set user
//     if (!res.data.admin) {
//       props.setUser(res.data);
//       // if user is admin, fetch the user by selected id
//     } else {
//       props.setUser(res.data);
//       const selectedUser = localStorage.getItem("selectedClientId");
//       // if no user in storage, skip.
//       if (selectedUser) {
//         const api = clientApi + selectedUser;
//         console.log(api);
//         axiosWithAuth(token)
//           .get(clientApi + selectedUser)
//           .then((res) => {
//             console.log(res.data);
//             props.setUser(res.data);
//           })
//           .catch((error) => {
//             console.log(error.message);
//           });
//       }
//     }
//   })
//   .catch((error) => {
//     console.log(error.message);
//     props.history.push("/login");
//   });
// }

// export default connect((state) => state, { })(
//   getUserData
// );