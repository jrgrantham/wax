import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { riskData } from "./dummyData";
import RiskType from "./RiskType";

function RiskTable(props) {
  console.log(riskData);

  return (
    <Container>
      <header>
        <h4>
          Project {props.projectRisks.project} - {props.projectRisks.company}
        </h4>
        <h4>Risk Management Table</h4>
      </header>
      <RiskType
        risks={props.projectRisks.managerial}
        type="Managerial"
        riskRange={props.projectRisks.riskRange}
      />
      <RiskType
        risks={props.projectRisks.technical}
        type="Technical"
        riskRange={props.projectRisks.riskRange}
      />
      <RiskType
        risks={props.projectRisks.commercial}
        type="Commercial"
        riskRange={props.projectRisks.riskRange}
      />
      <RiskType
        risks={props.projectRisks.legal}
        type="Legal"
        riskRange={props.projectRisks.riskRange}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  /* border: 1px solid red; */

  div {
    display: flex;
    justify-content: center;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    
    .description {
      text-align: left;
    }
  }
`;

export default connect((state) => state)(RiskTable);
