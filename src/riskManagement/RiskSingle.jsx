import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
  updateRisk,
} from "../state/actionCreators/riskActionCreators";
import removeIcon from "../images/removeIcon.png";
import tick from "../images/tick.png";

function RiskSingle(props) {
  const { type, risk } = props;

  const riskRange = props.projectRisks.riskRange;

  function riskValue(value) {
    return riskRange[value];
  }

  const initialRiskText = {
    description: risk.description,
    mitigation: risk.mitigation,
    owner: risk.owner,
    changes: false,
  };

  const [riskText, setRiskText] = useState(initialRiskText);

  function onChange(event) {
    console.log(event.target.name);
    setRiskText({
      ...riskText,
      [event.target.name]: event.target.value,
      changes: true,
    });
  }

  function confirmChanges() {
    props.updateRisk(type.toLowerCase(), risk.id, riskText);
    setRiskText({...riskText, changes: false})
  }

  return (
    <Container>
      <textarea
        type="text"
        onChange={onChange}
        name="description"
        value={riskText.description}
      />
      <div
        onClick={() =>
          props.updateProbability(
            type.toLowerCase(),
            risk.id,
            (risk.probability + 1) % riskRange.length
          )
        }
        className={
          riskValue(risk.probability).toLowerCase() + " probability flag"
        }
      >
        <h6>{riskValue(risk.probability)}</h6>
      </div>
      <div
        onClick={() =>
          props.updateConsequence(
            type.toLowerCase(),
            risk.id,
            (risk.consequence + 1) % riskRange.length
          )
        }
        className={
          riskValue(risk.consequence).toLowerCase() + " consequence flag"
        }
      >
        <h6>{riskValue(risk.consequence)}</h6>
      </div>
      <textarea
        type="text"
        onChange={onChange}
        name="mitigation"
        value={riskText.mitigation}
      />
      <input
        className={`${risk.owner.toLowerCase()} owner`}
        type="text"
        onChange={onChange}
        name="owner"
        value={riskText.owner}
      />
      {/* <div className={`${risk.owner.toLowerCase()} owner flag`}>
        <h6>{risk.owner}</h6>
      </div> */}
      {riskText.changes ? (
        <div className="icon" onClick={() => confirmChanges()}>
          <img src={tick} alt="delete" />
        </div>
      ) : (
        <div
          className="icon"
          onClick={() => props.deleteRisk(type.toLowerCase(), risk.id)}
        >
          <img src={removeIcon} alt="delete" />
        </div>
      )}
    </Container>
  );
}

export default connect((state) => state, {
  updateProbability,
  updateConsequence,
  deleteRisk,
  updateRisk,
})(RiskSingle);

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 90px 90px 1fr 75px 30px;
  column-gap: 5px;
  margin: 10px 0;

  textarea,
  input {
    border: none;
  }

  .risk {
    width: 100%;
    padding: 10px;
    align-items: center;

    :nth-child(2n) {
    }
  }
  .description {
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;
  }
  .flag {
    /* margin: 5px; */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    height: 50px;
    &:hover {
      cursor: pointer;
    }
  }
  .small {
    font-size: 0.8rem;
  }
  .probability {
    /* margin-right: 5px; */
  }
  .consequence {
    /* margin-left: 5px; */
  }
  .high {
    background-color: rgba(250, 0, 0, 0.5);
  }
  .medium {
    background-color: rgba(250, 125, 0, 0.5);
  }
  .low {
    background-color: rgba(0, 125, 0, 0.5);
  }
  .owner {
    text-align: center;
    background-color: rgba(180, 180, 180, 0.5);
  }
  .tbc {
    border: 1px solid black;
    background-color: transparent;
  }
  .addRisk {
    width: 100%;
    justify-content: flex-end;
    padding: 10px;
    img {
      border-radius: 50%;
      width: 25px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .even {
    background-color: #f0f0f0;
  }
  .odd {
    background-color: #e0e0e0;
  }
  .mitigation {
    padding-left: 10px;
  }
  .icon {
    margin: auto;
    padding-right: 5px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
`;
