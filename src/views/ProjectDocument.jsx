import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextType from "./projectComponents/DocumentRisks";

function RiskText(props) {
  return (
    <Container>
      <div className="contents">
        <Link to="/">back to Risk Table</Link>
        <header>
          <h3>
            Project {props.projectRisks.project} - {props.projectRisks.company}
          </h3>
          <h6>Risk Management Document</h6>
        </header>

        {props.projectRisks.options.managerial.display ? (
          <TextType
            risks={props.projectRisks.managerial}
            type="Managerial"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.technical.display ? (
          <TextType
            risks={props.projectRisks.technical}
            type="Technical"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.commercial.display ? (
          <TextType
            risks={props.projectRisks.commercial}
            type="Commercial"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.legal.display ? (
          <TextType
            risks={props.projectRisks.legal}
            type="Legal"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.environmental.display ? (
          <TextType
            risks={props.projectRisks.environmental}
            type="Environmental"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  .contents {
    padding: 30px;
    max-width: 900px;
    background-color: white;
  }

  a {
    display: inline-block;
    color: lightgray;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0.6rem 1.6rem;
    margin-bottom: 20px;
  }

  header {
    margin-bottom: 20px;
  }
`;

export default connect((state) => state, {})(RiskText);
