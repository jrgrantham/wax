import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

function Menu(props) {
  const forCSV = [];

  props.risks.entries.forEach((risk) => {
    const type = risk.type;
    const description = risk.description;
    const probability = risk.probability;
    const consequences = risk.consequence;
    const mitigation = risk.mitigation;
    const owner = risk.owner;
    const output = {
      type,
      description,
      probability,
      consequences,
      mitigation,
      owner,
    };
    forCSV.push(output)
  });

  console.log(forCSV);
  const header = [
    // "user id", // not needed
    // "account / email", // not needed
    "risk type",
    "description",
    "likelihood",
    "severity",
    // "risk", // not needed
    "mitigation",
    "owner",
    // "risk id", // not needed
  ];
  let objectToArray = [];
  objectToArray.push(header);
  forCSV.forEach((risk) => {
    objectToArray.push(Object.values(risk));
  });
  // console.log(objectToArray);

  const csvFileName = `${props.user.company}, ${props.user.project} - Risks.csv`;

  let csvContent =
    "data:text/csv;charset=utf-8," +
    objectToArray.map((risk) => risk.join(",")).join("\n");
  // console.log(csvContent);

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", csvFileName);
  document.body.appendChild(link); // Required for FF

  // link.click(); // This will download the data file named "my_data.csv"
  function download() {
    link.click();
  }

  function logout() {
    localStorage.removeItem("token");
    props.history.push("/login");
  }

  return (
    <Container
      id="menu"
      style={props.showMenu ? { right: "0px" } : { right: "-350px" }}
    >
      <div className="menu" id="subMenu">
        <Link to="project-settings">
          <h6>Settings</h6>
        </Link>
        <Link to="risk-document">
          <h6>Risk Document</h6>
        </Link>
        {props.user.exportSpreadsheet ? (
          <h6 onClick={download}>Download CSV</h6>
        ) : null}
        {props.user.useTemplates ? (
          <Link to="print">
            <h6>Download PDF</h6>
          </Link>
        ) : null}
      </div>
      {props.user.admin ? (
        <div className="menu">
          <Link to="admin">
            <h6>Admin</h6>
          </Link>
        </div>
      ) : null}
      <div>
        {/* <h6>Change Password</h6> */}
        <h6 onClick={logout}>Log Out</h6>
      </div>
    </Container>
  );
}

export default withRouter(connect((state) => state, {})(Menu));

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
      background-color: #696969;
    }
  }
`;
