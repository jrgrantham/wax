import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import RiskSingle from "./RiskSingle";
import { v4 as uuidv4 } from "uuid";
import { addEmptyRow } from "../state/actionCreators/riskActionCreators";

function RiskType(props) {
  const { type, risks } = props;

  const defaultOwner =
    props.projectRisks.options[type.toLowerCase()].defaultOwner;

  const randomId = uuidv4();

  const emtpyRow = {
    id: randomId,
    description: "enter risk description.",
    probability: 0,
    consequence: 0,
    owner: defaultOwner,
    mitigation: "enter risk mitigation.",
  };

  function addEmptyRow() {
    console.log("add empty row");
    props.addEmptyRow(type.toLowerCase(), emtpyRow)
  }

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
          <div className="button" onClick={() => addEmptyRow()}>
            <p>Add new row</p>
          </div>
          <div className="button">
            <p>Add from template</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, { addEmptyRow })(RiskType);

const Container = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  /* background-color: #f0f0f0; */
  background-color: #f0f0f0;
  /* :nth-child(2n) {
    background-color: #e0e0e0;
  } */

  .addRisk {
    display: flex;
    justify-content: flex-end;
    margin-right: 35px;
    p {
      background-color: rgba(0, 125, 0, 0.2);
      /* border: 1px solid black; */
      border-radius: 5px;
      margin-left: 5px;
      padding: 0.3rem 0.8rem;
    }
    .button {
      &:hover {
        cursor: pointer;
      }
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
    padding: 10px;
    /* white-space: nowrap; */
    /* width: 200px; */
    /* border: 1px solid red; */
    /* border: 1px solid red; */
    border-radius: 5px;
    margin: 0 10px;
    background-color: white;
  }
  .risks {
    width: 100%;
  }
`;
