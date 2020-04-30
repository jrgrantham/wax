import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
} from "../state/actionCreators/riskActionCreators";
import addIcon from "../images/addIcon.png";
import RiskSingle from "./RiskSingle";

function RiskType(props) {
  const { type, risks } = props;

  return (
    <Container>
      <div className="type">
        <h5>{type}</h5>
      </div>
      <div className="risks">
        {risks.map((risk, index) => (
          <RiskSingle risk={risk} type={type} key={index} />
        ))}
        <div
          className={risks.length % 2 === 0 ? "addRisk even" : "addRisk odd"}
        >
          {/* <img src={addIcon} alt="delete" /> */}
          <div >
            <p>Add new row</p>
          </div>
          <div>
            <p>Add from template</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  updateProbability,
  updateConsequence,
  deleteRisk,
})(RiskType);

const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 15px 0;
  border-radius: 10px;

  .addRisk {
    display: flex;
    justify-content: flex-end;
    margin-right: 55px;
    p {
      border: 1px solid black;
      border-radius: 5px;
      margin-left: 10px;
      padding: 0.3rem 0.8rem
    }
  }

  .type {
    justify-content: center;
    align-items: center;
    writing-mode: tb-rl;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    padding: 20px;
    /* white-space: nowrap; */
    /* width: 200px; */
    /* border: 1px solid red; */
  }
  background-color: #f0f0f0;
  :nth-child(2n) {
    background-color: #e0e0e0;
  }
  .risks {
    width: 100%;
  }
`;
