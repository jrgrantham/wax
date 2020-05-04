import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import TemplateRisk from "./components/TemplateRisk";

function RiskTable(props) {
  const selected = props.projectRisks.selected;
  const risks = props.adminSettings.riskTemplate[selected.toLowerCase()];
  const type = props.projectRisks.selected.toLowerCase();

  function check(targetId) {
    if (targetId === "templateContainer") {
      props.setShowTemplate(false);
      console.log('triggered');
    }
    return
  }

  return (
    <Container
      id="templateContainer"
      onClick={(event) => check(event.target.id)}
    >
      <div className="templateContents">
        <h5>{props.projectRisks.selected} Risks</h5>
        <div className="title">
          <h6>Description</h6>
          <h6>Mitigation</h6>
        </div>
        <div className="templateRisks">
          {risks.map((risk, index) => (
            <TemplateRisk risk={risk} type={type} key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(RiskTable);

const Container = styled.div`
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  h5 {
    margin: 20px;
  }

  .templateContents {
    background-color: white;
    margin: 10vh auto;
    border: 5px solid black;
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }
  .title {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 40px;
    column-gap: 5px;
    padding: 5px 5px 5px 15px;
    text-align: left
  }
  .templateRisks {
    background-color: #e5e5e5;
    padding: 5px 0px;
    width: 100%;
    max-width: 1500px;
  }
`;
