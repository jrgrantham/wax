import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import RiskType from "./Options";
import { v4 as uuidv4 } from "uuid";
import Header from "./ProjectHeader";
import RiskSingle from "./ProjectRisk";
import styled from "styled-components";
import {
  addToProject,
  sortByRisk,
} from "../state/actionCreators/projectActionCreators";
import Options from "./Options";

function RiskTable(props) {
  const risks = props.projectRisks.managerial;
  const type = "Managerial";
  const riskRange = props.projectRisks.riskRange;

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
      <Header />
      <div className="risks">
        {risks.map((risk, index) => (
          <RiskSingle risk={risk} type={type} key={index} />
        ))}
      </div>
      <Options />
    </Container>
  );
}

export default connect((state) => state, {})(RiskTable);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  /* border: 1px solid black; */
  .risks {
    background-color: #e5e5e5;
    width: 100%;
    margin-top: 177px;
    padding-bottom: 15px;
    border-radius: 0 0 0 20px;
  }
`;
