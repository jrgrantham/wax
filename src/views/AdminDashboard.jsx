import React, { useState } from "react";
import { connect } from "react-redux";
import Clients from "./Clients";
import Templates from "./Templates";
import styled from "styled-components";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";
import { setUser } from "../state/actionCreators/userActionCreators";
import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";
import { useEffect } from "react";

// const templateApi = `${url()}api/users/templates`;
const userApi = `${url()}api/users/user`;
const allClientsApi = `${url()}api/users/clients`;
const clientApi = `${url()}api/users/client/`;
const token = localStorage.getItem("token");

function AdminDashboard(props) {
  const [displayClients, setDisplayClients] = useState(true);

  // if admin, need to fetch client by different method
  // set the chosen project id to local storage

  function getData() {
    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // check response, if user not admin, set user
        if (!res.data.admin) {
          props.setUser(res.data);
          // if user is admin, fetch the user by selected id
        } else {
          props.setUser(res.data);
          const selectedUser = localStorage.getItem("tempUser");
          // if no user in storage, skip.
          if (selectedUser) {
            const api = clientApi + selectedUser;
            console.log(api);
            axiosWithAuth(token)
              .get(clientApi + selectedUser)
              .then((res) => {
                console.log(res.data);
                props.setUser(res.data);
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        // window.location.replace(`${url()}login`)
        props.history.push("/login");
      });
    axiosWithAuth(token)
      .get(allClientsApi)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    // if (props.user.admin) {
    // axiosWithAuth(token)
    //   .get(templateApi)
    //   .then((res) => {
    //     props.replaceTemplateRisks(res.data);
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    // }
  }

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <Container>
      <header>
        <h3>Admin Dashboard</h3>
        <button
          onClick={() => setDisplayClients(true)}
          style={
            displayClients
              ? { backgroundColor: "lightgreen" }
              : { backgroundColor: "lightgrey" }
          }
        >
          <h5>Client Management</h5>
        </button>
        <button
          onClick={() => setDisplayClients(false)}
          style={
            displayClients
              ? { backgroundColor: "lightgrey" }
              : { backgroundColor: "lightgreen" }
          }
        >
          <h5>Risk Templates</h5>
        </button>
      </header>
      {displayClients ? <Clients /> : <Templates />}
    </Container>
  );
}

export default connect((state) => state, { replaceTemplateRisks, setUser })(
  AdminDashboard
);

const Container = styled.div`
  background-color: white;
  max-width: 1500px;
  margin: auto;
  /* z-index: 2; */

  header {
    padding: 10px 0 20px 0;
    position: fixed;
    background-color: white;
    width: 100%;
    max-width: 1500px;
  }

  button {
    width: 40%;
    max-width: 450px;
    margin: 10px 10px;
    border: none;
    border-radius: 10px;
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
  }
`;
