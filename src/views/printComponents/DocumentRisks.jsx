import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { projectOptions } from "../../data/projectOptions";

function TextType(props) {
  const { type, docRisks } = props;
  const riskRange = projectOptions.riskRange;

  function riskValue(value) {
    return riskRange[value];
  }

  return (
    <Container>
      <h4>{type} Risks:</h4>
      {docRisks.map((risk, index) => (
        <div key={index} className="risk">
          <h6 className="bold">
            {index + 1}) {risk.description}:
          </h6>
          <ul>
            <li><span className="bold">Likelihood -</span>{" "}{riskValue(risk.probability)}</li>
            <li><span className="bold">Severity -</span>{" "}{riskValue(risk.consequence)}</li>
            <li><span className="bold">Mitigation -</span> {risk.mitigation}</li>
          </ul>
          {/* <h6 className="bold">Mitigation</h6>
          <p>
            <span className="bold">Likelihood -</span>{" "}
            {riskValue(risk.probability)}
          </p>
          <p>
            <span className="bold">Severity -</span>{" "}
            {riskValue(risk.consequence)}
          </p>
          <p>
            <span className="bold">Mitigation -</span> {risk.mitigation}
          </p> */}
        </div>
      ))}
    </Container>
  );
}

export default connect((state) => state, {})(TextType);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: left;

  h4 {
    margin-bottom: 20px;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
  }

  .risk {
    margin-bottom: 15px;
  }
  .bold {
    font-weight: bold;
  }
`;
