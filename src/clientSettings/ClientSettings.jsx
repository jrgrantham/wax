import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setProjectInfo } from "../state/actionCreators/projectActionCreators";
import ProjectSettings from "./ProjectSettings";
import RiskSettings from "./RiskSettings";
import Header from "./Header";

function ClientSettings() {
  return (
    <Container>
      <div className="contents">
        <Header />
        <ProjectSettings />
        <RiskSettings />
      </div>
    </Container>
  );
}

export default connect((state) => state, { setProjectInfo })(ClientSettings);

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
