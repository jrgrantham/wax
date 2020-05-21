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
const clientsApi = `${url()}api/users/clients`;
const token = localStorage.getItem("token");

function AdminDashboard(props) {
  const [displayClients, setDisplayClients] = useState(true);

  function getData() {
    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // console.log(res.data);
        props.setUser(res.data);
      })
      .catch((error) => {
        console.log(error.message);
        // window.location.replace(`${url()}login`)
        props.history.push("/login");
      });
    axiosWithAuth(token)
      .get(clientsApi)
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
    border-radius: 10px;
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
  }
`;
