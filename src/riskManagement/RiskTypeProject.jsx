import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import RiskSingle from "./RiskSingleProject";
import { v4 as uuidv4 } from "uuid";
import {
  addToProject,
  sortByRisk,
} from "../state/actionCreators/projectActionCreators";
import { Container } from "./riskTypeStyling";

function RiskTypeProject(props) {
  const { type, risks } = props;

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
      <div className="type">
        <h5>{type}</h5>
      </div>
      <div className="risks">
        {risks.map((risk, index) => (
          <RiskSingle risk={risk} type={type} key={index} />
        ))}
        <div className="buttons">
          <div className="button" onClick={() => sortRisks()}>
            <p>Sort and update</p>
          </div>
          <div className="addRisk">
            <div className="button middle" onClick={() => addToProject()}>
              <p>Add new row</p>
            </div>
            <Link to='/risk-templates'>
              <div className="button">
                <p>Add from template</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  addToProject,
  sortByRisk
})(RiskTypeProject);


