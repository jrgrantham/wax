import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import removeIcon from "../../images/removeIcon.png";

export default function Header() {
  return (
    <Container>
      <header>
        <h4>Main Settings</h4>
      </header>
      <div className="links">
        <Link to="/">
          <p>Close</p>
          <img src={removeIcon} alt="remove" />
        </Link>
        {/* <Link to="risk-document">View Risk Document</Link> */}
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

  img {
    width: 30px;
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 110px;
    padding: 0.3rem 0.8rem;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    background-color: #f0f0f0;
  }
`;
