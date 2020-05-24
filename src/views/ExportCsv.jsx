import React from "react";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";
import { useEffect } from "react";
import { connect } from "react-redux";
import { replaceRisks } from "../state/actionCreators/riskActionCreators";
import styled from "styled-components";

function ExportCSV(props) {
  const userApi = `${url()}api/users/user`;
  const riskApi = `${url()}api/users/risks/`;
  const token = localStorage.getItem("token");

  function getData() {
    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // check response, if user not admin, set user
        console.log("initial id:", res.data.id, "admin", res.data.admin);
        // if (!res.data.admin) {
        //   // props.setUser(res.data);
        //   // if user is admin, fetch the user by selected id
        // } else {
        //   // props.setUser(res.data);
        //   const selectedUser = localStorage.getItem("selectedClientId");
        //   // if no user in storage, skip.
        //   if (selectedUser) {
        //     const api = clientApi + selectedUser;
        //     console.log(api);
        //     axiosWithAuth(token)
        //       .get(clientApi + selectedUser)
        //       .then((res) => {
        //         console.log(res.data);
        //         props.setUser(res.data);
        //       })
        //       .catch((error) => {
        //         console.log(error.message);
        //       });
        //   }
        // }
        let user = "";
        // if admin, get by user from local storage
        if (res.data.admin) {
          console.log("admin, so get local storage");
          user = localStorage.getItem("selectedClientId");
          // otherwise, get by user info
        } else {
          user = res.data.id;
          console.log("initial id:", res.data.id, "admin", res.data.admin);
        }
        console.log("fetching user number:", user);
        axiosWithAuth(token)
          .get(riskApi + user)
          .then((res) => {
            console.log(res.data);
            props.replaceRisks(res.data);
          })
          .catch((error) => {
            console.log(error.message);
            props.history.push("/login");
          });
      })
      .catch((error) => {
        console.log(error.message);
        props.history.push("/login");
      });
  }

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const header = [
    "user id",
    "account / email",
    "risk type",
    "description",
    "liklihood",
    "consequence",
    "risk",
    "mitigation",
    "owner",
    "risk id",
  ];
  let objectToArray = [];
  objectToArray.push(header);
  props.risks.entries.forEach((risk) => {
    objectToArray.push(Object.values(risk));
  });
  console.log(objectToArray);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    objectToArray.map((risk) => risk.join(",")).join("\n");
  console.log(csvContent);

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link); // Required for FF

  // link.click(); // This will download the data file named "my_data.csv"
  function onClick() {
    link.click()
    props.history.push('/')
  }

  return (
    <Container>
      <h6 onClick={() => onClick()}>click here to download CSV</h6>
    </Container>
  );
}

export default connect((state) => state, {
  replaceRisks,
})(ExportCSV);

const Container = styled.div`
  display: flex;
  justify-content: center;

  h6 {
    margin-top: 100px;
    padding: 0.6rem 1.6rem;
    border: 1px solid black;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
          background-color: lightblue;
          cursor: pointer;
          /* transform: scale(1.3); */
        }
  }
`;
