import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import RiskType from "./RiskType";
import { Link } from "react-router-dom";

function RiskTable(props) {
  // console.log(riskData);
  // console.log(riskData.riskRange.length);
  console.log(props.projectRisks.options.managerial.display);

  return (
    <Container>
      <header>
        <h4>
          Project {props.projectRisks.project} - {props.projectRisks.company}
        </h4>
        <Link to="risk-document">View as Document</Link>
        <h4>Risk Management Table</h4>
      </header>
      <div className="titles">
        <h6>Risk</h6>
        <h6>Likelihood</h6>
        <h6>Severity</h6>
        <h6>Mitigation</h6>
        <h6>Owner</h6>
      </div>

      {props.projectRisks.options.managerial.display ? (
        <RiskType
          risks={props.projectRisks.managerial}
          type="Managerial"
          riskRange={props.projectRisks.riskRange}
        />
      ) : null}

      {props.projectRisks.options.technical.display ? (
        <RiskType
          risks={props.projectRisks.technical}
          type="Technical"
          riskRange={props.projectRisks.riskRange}
        />
      ) : null}

      {props.projectRisks.options.commercial.display ? (
        <RiskType
          risks={props.projectRisks.commercial}
          type="Commercial"
          riskRange={props.projectRisks.riskRange}
        />
      ) : null}

      {props.projectRisks.options.legal.display ? (
        <RiskType
          risks={props.projectRisks.legal}
          type="Legal"
          riskRange={props.projectRisks.riskRange}
        />
      ) : null}

      {props.projectRisks.options.environmental.display ? (
        <RiskType
          risks={props.projectRisks.environmental}
          type="Environmental"
          riskRange={props.projectRisks.riskRange}
        />
      ) : null}
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
    grid-template-columns: 1fr 90px 90px 1fr 75px 30px;
  column-gap: 5px;
    margin: 20px 0 10px 66px;
    /* padding: 20px 0; */
    h6 {
      background-color: #e0e0e0;
      padding: 10px 0;
    }
    h6:first-child {
      border-radius: 10px 0 0 10px;
    }
    h6:last-child {
      border-radius: 0 10px 10px 0;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 10px;

    .description {
      text-align: left;
    }
  }

  a {
    display: inline-block;
    border: 1px solid #e0e0e0;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
  }
`;

export default connect((state) => state, {})(RiskTable);
