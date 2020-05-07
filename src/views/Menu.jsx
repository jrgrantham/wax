import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Menu(props) {
  return (
    <Container
      id="menu"
      style={props.showMenu ? { right: "0px" } : { right: "-350px" }}
    >
      <div className="menu" id="subMenu">
        <Link to="project-settings">
          <h6>Project Settings</h6>
        </Link>
        <Link to="risk-document">
          <h6>View Risk Document</h6>
        </Link>
        <h6>Export to PDF</h6>
        <h6>Export to spreadsheet</h6>
        {props.projectRisks.admin ? (
          <Link to="templates">
            <h6>Edit Templates</h6>
          </Link>
        ) : null}
      </div>
      <div>
        <h6>Change Password</h6>
        <h6>Log Out</h6>
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(Menu);

const Container = styled.div`
  height: 100%;
  width: 350px;
  position: fixed;
  z-index: 2;
  right: -00px;
  transition: right 0.3s;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 30px 30px 20px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }

  h6 {
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px 30px;
    width: 100%;
    color: white;
    &:hover {
      cursor: pointer;
    }
  }
`;
