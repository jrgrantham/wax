import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addToProject,
  sortByRisk,
} from "../state/actionCreators/projectActionCreators";
import styled from "styled-components";

function Options(props) {
  const type = props.projectRisks.selected.toLowerCase();

  const defaultOwner =
    props.projectRisks.options[type.toLowerCase()].defaultOwner;

  const randomId = uuidv4();

  const emtpyRow = {
    id: randomId,
    description: "enter risk description.",
    probability: 0,
    consequence: 0,
    owner: defaultOwner,
    mitigation: "enter risk mitigation.",
  };

  function addToProject() {
    console.log("add empty row");
    props.addToProject(type.toLowerCase(), emtpyRow);
  }

  function calculateRisk() {
    const calculatedRisks = props.projectRisks[type.toLowerCase()].map(
      (entry) => {
        const value = entry.probability * entry.consequence;
        return { ...entry, risk: value };
      }
    );
    return calculatedRisks;
  }

  function sortRisks() {
    const sortedRisks = calculateRisk().sort(function (a, b) {
      return b.risk - a.risk;
    });
    props.sortByRisk(type.toLowerCase(), sortedRisks);
  }

  return (
    <Container>
      <div className="left"></div>
      <div className="white">
      <div className="right">
        <div className="button" onClick={() => sortRisks()}>
          <p>Sort and update</p>
        </div>
        <div className="button middle" onClick={() => addToProject()}>
          <p>Add new row</p>
        </div>
        <Link to="/risk-templates">
          <div className="button">
            <p>Add from template</p>
          </div>
        </Link>
      </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  addToProject,
  sortByRisk,
})(Options);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-top: -5px; */
  /* margin-bottom: 0px; */
  /* padding: 0px 0 10px 0; */
  width: 100%;
  border-radius: 0px 0px 20px 0px;
  background-color: #e5e5e5;
  /* border: 1px solid black; */
  .left {
    background-color: white;
    /* border: 1px solid black; */
    border-radius: 0px 20px 0px 0px;
    flex-grow: 1;
  }
  .white {
    background-color: white;
  }
  .right {
    /* border: 1px solid black; */
    display: flex;
    /* margin-right: 25px; */
    padding: 0 25px 15px 25px;
    background-color: #e5e5e5;
    border-radius: 0px 0px 20px 20px;
  }
  .button {
    background-color: rgba(0, 125, 0, 1);
    border-radius: 5px;
    padding: 0.3rem 0.8rem;
    display: flex;
    justify-content: flex-end;
    &:hover {
      cursor: pointer;
    }
  }
  .middle {
    margin: 0 10px;
  }
`;
