import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextType from "./TextTypes";

function RiskText(props) {
  // console.log(riskData);
  // console.log(riskData.riskRange.length);

  return (
    <Container>
        <h3>
          Project {props.projectRisks.project} - {props.projectRisks.company}
        </h3>
        <h4>Risk Management Table</h4>
      <TextType
        risks={props.projectRisks.managerial}
        type="Managerial"
        riskRange={props.projectRisks.riskRange}
      />
      <TextType
        risks={props.projectRisks.technical}
        type="Technical"
        riskRange={props.projectRisks.riskRange}
      />
      <TextType
        risks={props.projectRisks.commercial}
        type="Commercial"
        riskRange={props.projectRisks.riskRange}
      />
      <TextType
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

  h4 {
    margin-bottom: 20px;
  }
`;

export default connect((state) => state, {})(RiskText);
