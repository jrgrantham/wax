import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
} from "../state/actionCreators";
import removeIcon from "../images/removeIcon.png";
import addIcon from "../images/addIcon.png";

function RiskType(props) {
  const { type, risks, riskRange } = props;

  function riskValue(value) {
    return riskRange[value];
  }

  return (
    <Container>
      <div className="type">
        <h5>{type}</h5>
      </div>
      <div className="risks">
        {risks.map((risk, index) => (
          <div className="risk" key={index}>
            <div className="description">
              <p>{risk.description}</p>
            </div>
            <div
              onClick={() =>
                props.updateProbability(
                  type.toLowerCase(),
                  risk.id,
                  (risk.probability + 1) % riskRange.length
                )
              } // here
              className={
                riskValue(risk.probability).toLowerCase() + " probability flag"
              }
            >
              <h6>{riskValue(risk.probability)}</h6>
              {/* <p className="small">Probability</p> */}
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
              {/* <p className="small">Consequence</p> */}
            </div>
            <div className="owner flag">
              <h6>{risk.owner}</h6>
              {/* <p className="small">Responsible</p> */}
            </div>
            <div className="mitigation">
              <p>{risk.mitigation}</p>
            </div>
            <div
              className="delete"
              onClick={() => props.deleteRisk(type.toLowerCase(), risk.id)}
            >
              <img src={removeIcon} alt="delete" />
            </div>
          </div>
        ))}
        <div
          className={risks.length % 2 === 0 ? "addRisk even" : "addRisk odd"}
        >
            <img src={addIcon} alt="delete" />
        </div>
      </div>
      {/* <div className='type' /> */}
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
  /* flex-direction: row; */
  margin-bottom: 20px;
  /* display: grid;
  grid-template-columns: 120px 1fr; */
  /* border: 1px solid red; */

  h6 {
    margin-bottom: 2px;
  }

  button {
    font-size: 1rem;
    padding: 0.3rem 0.8rem;
    border-radius: 5px;
  }

  .type {
    /* display: flex; */
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
    display: grid;
    .risk {
      width: 100%;
      padding: 10px;
      align-items: center;
      display: grid;
      grid-template-columns: 1fr 120px 120px 120px 1fr 30px;
      background-color: #f0f0f0;
      :nth-child(2n) {
        background-color: #e0e0e0;
      }
    }
    .description {
      justify-content: flex-start;
      align-items: center;
      margin-right: 20px;
    }
    .flag {
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      height: 60px;
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
      background-color: rgba(180, 180, 180, 0.5);
    }
    .addRisk {
      width: 100%;
      justify-content: flex-end;
      padding: 10px;
      img {
        border-radius: 50%;
        width: 30px;
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
    .delete {
      margin: auto;
      border-radius: 50%;
      width: 25px;
      &:hover {
        cursor: pointer;
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;
