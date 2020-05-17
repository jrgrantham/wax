import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TextType from "./projectComponents/DocumentRisks";

function RiskText(props) {
  const managerial = props.risks.entries.filter(
    (risk) => risk.type === "managerial"
  );
  const commercial = props.risks.entries.filter(
    (risk) => risk.type === "commercial"
  );
  const legal = props.risks.entries.filter((risk) => risk.type === "legal");
  const environmental = props.risks.entries.filter(
    (risk) => risk.type === "environmental"
  );
  const technical = props.risks.entries.filter(
    (risk) => risk.type === "technical"
  );

  console.log(managerial, commercial, legal, technical, environmental);

  return (
    <Container>
      <div className="contents">
        <Link to="/">back to Risk Table</Link>
        <header>
          <h3>
            Project {props.user.project} - {props.user.company}
          </h3>
          <h6>Risk Management Document</h6>
        </header>

        {props.user.manDisplay ? (
          <TextType
            docRisks={managerial}
            type="Managerial"
          />
        ) : null}

        {props.user.tecDisplay ? (
          <TextType
            docRisks={technical}
            type="Technical"
          />
        ) : null}

        {props.user.comDisplay ? (
          <TextType
            docRisks={commercial}
            type="Commercial"
          />
        ) : null}

        {props.user.legDisplay ? (
          <TextType
            docRisks={legal}
            type="Legal"
          />
        ) : null}

        {props.user.envDisplay ? (
          <TextType
            docRisks={environmental}
            type="Environmental"
          />
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  .contents {
    padding: 30px;
    width: 100%;
    max-width: 900px;
    background-color: white;
  }

  a {
    display: inline-block;
    color: lightgray;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0.6rem 1.6rem;
    margin-bottom: 20px;
  }

  header {
    margin-bottom: 20px;
  }
`;

export default connect((state) => state, {})(RiskText);
