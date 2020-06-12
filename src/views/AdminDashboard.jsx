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

function AdminDashboard(props) {
  const [displayClients, setDisplayClients] = useState(true);

  // if admin, need to fetch client by different method
  // set the chosen project id to local storage

  useEffect(() => {
    setTimeout(() => {
      // getData();
    }, 1000);
    return () => {};
  }, []);

  return (
    <Container>
      <header>
        <h3>Admin Dashboard</h3>
        <div>
          <button className='dashboard left'
            onClick={() => setDisplayClients(true)}
            style={
              displayClients
                ? { backgroundColor: "darkseagreen" }
                : { backgroundColor: "lightgrey" }
            }
          >
            <h5>Clients</h5>
          </button>
          <button className='dashboard right'
            onClick={() => setDisplayClients(false)}
            style={
              displayClients
                ? { backgroundColor: "lightgrey" }
                : { backgroundColor: "darkseagreen" }
            }
          >
            <h5>Templates</h5>
          </button>
        </div>
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
    display: flex;
    justify-content: space-between;
    padding: 20px;
    /* padding: 10px 0 20px 0; */
    position: fixed;
    background-color: white;
    width: calc(100%);
    max-width: 1500px;
  }

  button.dashboard {
    width: 140px;
    max-width: 450px;
    /* margin: 10px 10px; */
    border: none;
    border-radius: 0px;
    /* border-radius: 10px; */
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  button.left {
    border-radius: 10px 0 0 10px;
  }
  button.right {
    border-radius: 0 10px 10px 0;
  }
`;
