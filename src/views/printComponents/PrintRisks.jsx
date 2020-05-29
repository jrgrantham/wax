import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { projectOptions } from "../../data/projectOptions";

function PrintRisks(props) {
  const { type, docRisks } = props;

  const riskRange = projectOptions.riskRange;
  const { high, medium, low } = projectOptions;

  function riskValue(value) {
    return riskRange[value];
  }

  // console.log(riskRange);

  // const typeSize = document.getElementById(type.toLocaleLowerCase())

  console.log(props.user.fontSize);

  return (
    <Container
      color={props.color}
      fontSize={props.user.fontSize}
      high={high}
      medium={medium}
      low={low}
    >
      <div className="type" id={type.toLocaleLowerCase()}>
        <p className="vertical">{type}</p>
      </div>
      <div className="risks">
        {docRisks.map((risk, index) => (
          <div key={index} className="risk">
            <p className="description text">{risk.description}</p>
            <p
              className={`flag ${riskValue(
                risk.probability
              ).toLocaleLowerCase()}`}
            >
              {riskValue(risk.probability)}
            </p>
            <p
              className={`flag ${riskValue(
                risk.consequence
              ).toLocaleLowerCase()}`}
            >
              {riskValue(risk.consequence)}
            </p>
            <p className="flag owner">{risk.owner}</p>
            <p className="mitigation text">{risk.mitigation}</p>
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
  margin-bottom: -1px;

  p {
    font-size: ${(props) => props.fontSize}pt;
  }

  .type {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    border-right: 1px solid black;
    background-color: ${(props) => props.color};
  }

  .vertical {
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
    white-space: nowrap;
    width: 25px;
    height: 25px;
    /* border: 1px solid black; */
  }

  .risks {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
  }
  .risk {
    /* border: 1px solid black; */
    display: flex;
    height: 100%;
    width: 100%;
    border-bottom: 1px solid lightgray;
    /* background-color: lightgray; */
    :last-child {
      border-bottom: none;
    }
    .text {
      display: flex;
      align-items: center;
      padding: 2px 5px;
      /* border: 1px solid black; */
    }
    .description {
      width: 35%;
      border-right: 1px solid lightgray;
    }
    .mitigation {
      max-width: 47%;
    }
    .flag {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-right: 1px solid lightgray;
      width: 6%;
    }
    .high {
      background-color: ${props => props.high};
    }
    .medium {
      background-color: ${props => props.medium};
    }
    .low {
      background-color: ${props => props.low};
    }
    .owner {
      text-align: center;
    }
  }
  /* } */
`;
