import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import RiskType from "./RiskType";
import { Link } from "react-router-dom";

function RiskTable(props) {
  // console.log(riskData);
  // console.log(riskData.riskRange.length);

  return (
    <Container>
      <header>
        <h4>
          Project {props.projectRisks.project} - {props.projectRisks.company}
        </h4>
        <Link to='risk-document' >View as Document</Link>
        <h4>Risk Management Table</h4>
      </header>
      <div className='titles'>
        <h5>Risk</h5>
        <h5>Likelihood</h5>
        <h5>Severity</h5>
        <h5>Owner</h5>
        <h5>Mitigation</h5>
      </div>
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

  .titles {
    display: grid;
    grid-template-columns: 1fr 120px 120px 120px 1fr 30px;
    margin: 20px 0 20px 66px;
    padding: 20px 0;
    background-color: #e0e0e0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 20px 0;

    .description {
      text-align: left;
    }
  }

  a {
    border: 1px solid #e0e0e0;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
  }
`;

export default connect((state) => state, {})(RiskTable);
