import React from "react";
import styled from "styled-components";

export default function RiskType(props) {
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
          <div
            className={index % 2 === 0 ? "risk even" : "risk odd"}
            key={index}
          >
            <div className="description">
              <p>{risk.description}</p>
            </div>
            <div
              className={
                riskValue(risk.liklihood).toLowerCase() + " liklihood flag"
              }
            >
              <p>{riskValue(risk.liklihood)}</p>
            </div>
            <div
              className={
                riskValue(risk.severity).toLowerCase() + " severity flag"
              }
            >
              <p>{riskValue(risk.severity)}</p>
            </div>
            <div className="owner">
              <p>{risk.owner}</p>
            </div>
            <div className="mitigation">
              <p>{risk.mitigation}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */

  .type {
    display: flex;
    justify-content: flex-start;
    margin: 20px 0;
  }

  .risks {
    display: grid;
    /* grid-template-columns: 1fr; */
    /* border-radius: 3px; */
    overflow: hidden;
    /* row-gap: 10px; */

    .odd {
      background-color: #f0f0f0;
    }
    .even {
      background-color: #e0e0e0;
    }
    .risk {
      padding: 10px;
      /* background-color: #909090; */
      align-items: center;
      display: grid;
      grid-template-columns: 2fr 100px 100px 120px 1fr;
      /* border-radius: 10px; */
    }
    .description {
      justify-content: flex-start;
      align-items: center;
    }
    .flag {
      align-items: center;
      border-radius: 10px;
      height: 50px;
    }
    .liklihood {
      margin-right: 5px;
    }
    .severity {
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
      align-items: center;
    }
  }
`;
