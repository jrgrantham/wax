import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ProjectSettings from "./settingComponents/ProjectSettings";
import RiskSettings from "./settingComponents/RiskSettings";
import Header from "./settingComponents/SettingsHeader";
import AdminSettings from "./settingComponents/AdminSettings";
import { setUser } from "../state/actionCreators/userActionCreators";

function ClientSettings(props) {

  return (
    <Container>
      <div className="contents">
        <Header />
        <ProjectSettings />
        <RiskSettings />
        {props.user.admin ? <AdminSettings /> : null}
      </div>
    </Container>
  );
}

export default connect((state) => state, { setUser })(ClientSettings);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px 50px 20px;
  background-color: #f0f0f0;
  /* border: 1px solid black; */

  .contents {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    max-width: 800px;
    padding: 30px;
    background-color: white;
  }
`;
