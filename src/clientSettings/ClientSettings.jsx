import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setProjectInfo } from "../state/actionCreators/riskActionCreators";
import ProjectSettings from "./ProjectSettings";
import RiskSettingsSingle from "./RiskSettingsSingle";

function ClientSettings() {
  return (
    <Container>
      <header>
        <h4>Client Settings</h4>
      </header>
      <Link to="risk-table">View Risk Table</Link>
      <Link to="risk-document">View Risk Document</Link>
      <ProjectSettings />
      <RiskSettingsSingle type={'Commercial'} />
      <RiskSettingsSingle type={'Technical'} />
      <RiskSettingsSingle type={'Managerial'} />
      <RiskSettingsSingle type={'Legal'} />
      <RiskSettingsSingle type={'Environmental'} />
    </Container>
  );
}

export default connect((state) => state, { setProjectInfo })(ClientSettings);

const Container = styled.div`

  a {
    display: inline-block;
    border: 1px solid #e0e0e0;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
  }
`;
