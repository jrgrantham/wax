import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
} from "../state/actionCreators/riskActionCreators";

function TextType(props) {
  const { type, risks, riskRange } = props;

  function riskValue(value) {
    return riskRange[value];
  }

  return (
    <Container>
      <h4>{type} Risks</h4>
      {risks.map((risk, index) => (
        <div key={index} className='risk'>
          <h5 className='bold' >{risk.description}</h5>
          <ul>
            <li>Likelihood: {riskValue(risk.probability)}</li>
            <li>Severity: {riskValue(risk.consequence)}</li>
            <li>Owner: {risk.owner}</li>
          </ul>
          <h5 className='bold' >Mitigation</h5>
          <p>{risk.mitigation}</p>
        </div>
      ))}
    </Container>
  );
}

export default connect((state) => state, {
  updateProbability,
  updateConsequence,
  deleteRisk,
})(TextType);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: left;

  h5 {
    margin: 5px 0;
    font-size: 1rem;
  }
  h6 {
    margin: 5px 0;
    font-size: 1rem;
  }
  p {

  }
  ul {
    list-style-type: square;
    list-style-position: inside;
  }

  .risk {
    margin-bottom: 20px;
  }
  .bold {
    
  }
`;
