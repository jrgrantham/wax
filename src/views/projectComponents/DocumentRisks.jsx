import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { projectOptions } from '../../data/projectOptions';

function TextType(props) {
  const { type, docRisks } = props;

  const riskRange = projectOptions.riskRange

  function riskValue(value) {
    return riskRange[value];
  }

  return (
    <Container>
      <h4>{type} Risks</h4>
      {docRisks.map((risk, index) => (
        <div key={index} className='risk'>
          <h6 className='bold' >{risk.description}</h6>
          <ul>
            <li>Likelihood: {riskValue(risk.probability)}</li>
            <li>Severity: {riskValue(risk.consequence)}</li>
            <li>Owner: {risk.owner}</li>
          </ul>
          <h6 className='bold' >Mitigation</h6>
          <p>{risk.mitigation}</p>
        </div>
      ))}
    </Container>
  );
}

export default connect((state) => state, {
})(TextType);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: left;

  h4 {
    margin-bottom: 20px;
  }

  ul {
    list-style-type: square;
    list-style-position: inside;
  }

  .risk {
    margin-bottom: 15px;
  }
  .bold {
    
  }
`;
