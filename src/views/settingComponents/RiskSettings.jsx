import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import RiskSettingsSingle from "./RiskSettingsSingle";

function RiskSettings(props) {
  const admin = props.user.admin;

  return (
    <Container>
      <div className="content">
        <h5>Risks</h5>
        <div className="titles">
          <h6 className="type">Risk Type</h6>
          <h6 className="owner">Owner</h6>
          <h6 className="colours">Colours</h6>
          {admin ? <h6 className="max">Max Risks</h6> : null}
        </div>
        <RiskSettingsSingle type={"Managerial"} />
        <RiskSettingsSingle type={"Commercial"} />
        <RiskSettingsSingle type={"Technical"} />
        <RiskSettingsSingle type={"Environmental"} />
        <RiskSettingsSingle type={"Legal"} />
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(RiskSettings);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  /* border: 1px solid black; */

  H5 {
    margin-bottom: 30px;
  }

  .titles {
    margin-left: 55px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    .type {
      /* margin-left: 46px; */
    }
    .owner {
      margin-left: 53px;
    }
    .colours {
      margin-left: 30px;
    }
    .max {
      margin-left: 148px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    /* border: 1px solid black; */
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    padding: 20px;
    background-color: #f0f0f0;
  }
`;
