import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextType from "./TextTypes";

function RiskText(props) {
  // console.log(riskData);
  // console.log(riskData.riskRange.length);

  return (
    <Container>
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

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

header {
  margin-bottom: 20px
}
`;

export default connect((state) => state, {})(RiskText);
