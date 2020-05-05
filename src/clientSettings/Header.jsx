import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Container>
      <header>
        <h4>Main Settings</h4>
      </header>
      <div className="links">
        <Link to="risk-table">View Risk Table</Link>
        <Link to="risk-document">View Risk Document</Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: auto;
  /* border: 1px solid red; */

  a {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 5px;
    margin: 10px 0px 10px 10px;
    background-color: #f0f0f0;
  }
`;
