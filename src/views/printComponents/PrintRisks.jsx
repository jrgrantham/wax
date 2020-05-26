import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { projectOptions } from "../../data/projectOptions";

function PrintRisks(props) {
  const { type, docRisks } = props;

  // const typeArray = type.split("");

  // console.log(typeArray);
  // const vertical = typeArray.map((letter) => {
  //   return letter + "\n";
  // });

  const riskRange = projectOptions.riskRange;

  function riskValue(value) {
    return riskRange[value];
  }

  // console.log(riskRange);

  return (
    <Container>
      <div className="vertical">
        <p className="">{type}</p>
        {/* {typeArray.map((letter, index) => {
          return <p key={index} >{letter}</p>
        })} */}
      </div>
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
  text-align: left;
  border: 1px solid black;

  p {
    font-size: 0.8rem;
  }

  .vertical {
    /* display: flex; */
    /* min-height: 100px; */
    /* writing-mode: rl-bt; */
    /* -webkit-transform: rotate(270deg); */
    /* -moz-transform: rotate(270deg); */
    /* -o-transform: rotate(270deg); */
    /* -ms-transform: rotate(270deg); */
    /* transform: rotate(270deg); */
    /* white-space: nowrap; */
    /* display: block; */
    /* bottom: 0; */
    /* border: 1px solid black; */
    /* text-align: center; */
    padding: 10px 2px;
  }

  .risks {
    display: flex;
    flex-direction: column;
    /* align-content: stretch; */
    width: 100%;
    min-height: 100%;
  }
  .risk {
    /* border: 1px solid black; */
    display: flex;
    height: 100%;
    border: 1px solid red;
    .text {
      display: flex;
      align-items: center;
      width: 39%;
      padding: 2px 5px;
      border: 1px solid black;
    }
    .flag {
      display: flex;
      align-items: center;
      justify-content: center;
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
