import React, { useState } from "react";
import Clients from "./Clients";
import Templates from "./Templates";
import styled from "styled-components";

export default function AdminDashboard() {
  const [displayClients, setDisplayClients] = useState(true);
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
