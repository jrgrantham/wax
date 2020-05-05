import React from "react";
import styled from "styled-components";
import RiskSettingsSingle from "./RiskSettingsSingle";

export default function RiskSettings() {
  return (
    <Container>
      <div className="content">
        <h5>Risk Settings</h5>
        <RiskSettingsSingle type={"Commercial"} />
        <RiskSettingsSingle type={"Technical"} />
        <RiskSettingsSingle type={"Managerial"} />
        <RiskSettingsSingle type={"Legal"} />
        <RiskSettingsSingle type={"Environmental"} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 0 20px;
  /* border: 1px solid black; */

  H5 {
    margin-bottom: 30px;
  }

  .content {
    display: flex;
    flex-direction: column;
    /* border: 1px solid black; */
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    padding: 40px;
    background-color: #f0f0f0;
  }
`;
