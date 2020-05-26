import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { projectOptions } from "../../data/projectOptions";

function PrintRisks(props) {
  const { type, docRisks } = props;

  const riskRange = projectOptions.riskRange;

  function riskValue(value) {
    return riskRange[value];
  }

  console.log(riskRange);

  return (
    <Container>
      <p className="vertical">{type}</p>
      <div className="risks">
        {docRisks.map((risk, index) => (
          <div key={index} className="risk">
            <p className="text">{risk.description}</p>
            <p
              className={`flag ${riskValue(
                risk.probability
              ).toLocaleLowerCase()}`}
            >
              {riskValue(risk.probability)}
            </p>
            <p
              className={`flag ${riskValue(
                risk.probability
              ).toLocaleLowerCase()}`}
            >
              {riskValue(risk.consequence)}
            </p>
            <p className="flag owner">{risk.owner}</p>
            <p className="text">{risk.mitigation}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(PrintRisks);

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* margin-bottom: 20px; */
  text-align: left;
  border: 1px solid black;

  @media print {
    a[href]::after {
      content: none !important;
    }
  }

  /* @media print { */
  p {
    font-size: 0.8rem;
  }

  .vertical {
    writing-mode: tb-rl;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    white-space: nowrap;
    display: block;
    bottom: 0;
    /* width:20px; */
    /* height:20px; */
    border: 1px solid black;
    text-align: center;
    padding: 10px 2px;
  }

  .risks {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .risk {
    /* border: 1px solid black; */
    display: flex;
    .text {
      width: 39%;
      padding: 2px 5px;
      border: 1px solid black;
    }
    .flag {
      text-align: center;
      border: 1px solid black;
      width: 8%;
      padding: 2px 5px;
    }
    .high {
      background-color: red;
    }
    .medium {
      background-color: orange;
    }
    .low {
      background-color: green;
    }
    .owner {
      text-align: center;
      width: 6%;
    }
  }
  /* } */
`;
