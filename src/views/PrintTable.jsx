// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import Header from "./printComponents/PrintHeader";
// import PrintRisk from "./printComponents/PrintRisk";
// import styled from "styled-components";
// import { replaceRisks } from "../state/actionCreators/riskActionCreators";
// import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";
// import { setUser } from "../state/actionCreators/userActionCreators";
// import axiosWithAuth from "../authentication/axiosWithAuth";
// import url from "../helpers/url";

// const userApi = `${url()}api/users/user`;
// const templateApi = `${url()}api/users/templates`;
// const clientApi = `${url()}api/users/client/`;
// const riskApi = `${url()}api/users/risks/`;
// const token = localStorage.getItem("token");

// function PrintTable(props) {
//   function sortRisks(array) {
//     const sortedRisks = array.sort(function (a, b) {
//       return b.risk - a.risk;
//     });
//     return sortedRisks;
//   }

//   function getData() {
//     axiosWithAuth(token)
//       .get(userApi)
//       .then((res) => {
//         // check response, if user not admin, set user
//         console.log("initial id:", res.data.id);
//         if (!res.data.admin) {
//           props.setUser(res.data);
//           // if user is admin, fetch the user by selected id
//         } else {
//           props.setUser(res.data);
//           const selectedUser = localStorage.getItem("selectedClientId");
//           // if no user in storage, skip.
//           if (selectedUser) {
//             const api = clientApi + selectedUser;
//             console.log(api);
//             axiosWithAuth(token)
//               .get(clientApi + selectedUser)
//               .then((res) => {
//                 console.log(res.data);
//                 props.setUser(res.data);
//               })
//               .catch((error) => {
//                 console.log(error.message);
//               });
//           }
//         }
//         let user = "";
//         // if admin, get by user from local storage
//         if (res.data.admin) {
//           user = localStorage.getItem("selectedClientId");
//         // otherwise, get by user info
//         } else {
//           user = res.data.id;
//         }
//         console.log(riskApi + user);
//         axiosWithAuth(token)
//           .get(riskApi + user)
//           .then((res) => {
//             console.log(res.data);
//             props.replaceRisks(sortRisks(res.data));
//           })
//           .catch((error) => {
//             console.log(error.message);
//             props.history.push("/login");
//           });
//         if (res.data.useTemplates) {
//           axiosWithAuth(token)
//             .get(templateApi)
//             .then((res) => {
//               props.replaceTemplateRisks(res.data);
//             })
//             .catch((error) => {
//               console.log(error.message);
//             });
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//         // window.location.replace(`${url()}login`)
//         props.history.push("/login");
//       });
//   }

//   // useEffect(() => {
//   //   getData();
//   //   return function cleanup() {
//   //     (console.log("unmounted")) // send state here
//   //   }
//   // }, []);

//   const type = props.user.selected.toLowerCase();
//   const risks = props.risks.entries.filter((risk) => risk.type === type);

//   // console.log(risks);

//   // const maxRisks = props.user[type.slice(0, 3) + "MaxRisks"];
//   // const usedRisks = props.risks.entries.filter((risk) => risk.type === type)
//   //   .length;
//   // const riskLimit = usedRisks < maxRisks;

//   function checkTarget(event) {
//     if (event.target.id === "menu" || event.target.id === "subMenu") {
//       return;
//     }
//   }

//   useEffect(() => {
//     // if (riskLimit) {
//     //   setShowTemplate(false);
//     // }
//     getData();
//     return () => {
//       console.log("unmounted risks"); // send state here
//     };
//   }, []);

//   const selected = props.user.selected.toLowerCase().slice(0, 3) + "Color";
//   const color = props.user[selected];

//   return (
//     <Container onClick={(event) => checkTarget(event)} color={color}>
//       <Header />
//       <div className="risks">
//         {risks.map((risk, index) => (
//           <PrintRisk risk={risk} key={index} />
//         ))}
//       </div>
//     </Container>
//   );
// }

// export default connect((state) => state, {
//   replaceRisks,
//   setUser,
//   replaceTemplateRisks,
// })(PrintTable);

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: 0 20px;
//   min-height: 100vh;
//   background-color: white;
//   padding: 0px 0 50px 0;
//   /* border: 1px solid black; */
//   .risks {
//     background-color: #e5e5e5;
//     width: 100%;
//     max-width: 1500px;
//     margin-top: 186px;
//     padding-bottom: 15px;
//     // border: 7px solid;
//     border-color: ${(props) => props.color};
//     border-top: none;
//     border-radius: 0 0 0 20px;
//   }
// `;
