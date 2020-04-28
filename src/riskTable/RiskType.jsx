import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
} from "../state/actionCreators";
import deleteIcon from '../images/deleteIcon.png';

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
              <p className="small">Probability</p>
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
              <p className="small">Consequence</p>
            </div>
            <div className="owner">
              <h6>{risk.owner}</h6>
              <p className="small">Responsible</p>
            </div>
            <div className="mitigation">
              <p>{risk.mitigation}</p>
            </div>
            <div className='delete' onClick={() => props.deleteRisk(type.toLowerCase(), risk.id)}>
              <img src={deleteIcon} alt="delete"/>
            </div>
          </div>
        ))}
        <div
          className={risks.length % 2 === 0 ? "addRisk even" : "addRisk odd"}
        >
          <button>add</button>
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
  flex-direction: column;
  margin-bottom: 20px;
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
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }

  .risks {
    display: grid;
    .risk {
      width: 100%;
      padding: 10px;
      align-items: center;
      display: grid;
      grid-template-columns: 1fr 120px 120px 120px 1fr 60px;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      height: 60px;
      &:hover {
        cursor: pointer;
      }
    }
    .small {
      font-size: 0.8rem;
    }
    .probability {
      margin-right: 5px;
    }
    .consequence {
      margin-left: 5px;
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
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .addRisk {
      justify-content: flex-end;
      padding: 20px;
    }
    .even {
      background-color: #f0f0f0;
    }
    .odd {
      background-color: #e0e0e0;
    }
    .delete {
      margin: auto;
      border-radius: 50%;
      width: 40px;
      background-color: white;
      padding: 10px;
      /* width: 50px;
      height: 50px; */

      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;
