import React from "react";
import { connect } from "react-redux";
import RiskType from "./RiskTypeProject";
import { Container } from "./riskTableStyling";

function RiskTable(props) {
  return (
    <Container>
      <div className="fixed">
        <header>
          <h4>
            Project {props.projectRisks.project} - {props.projectRisks.company}
          </h4>
          {/* <Link to="risk-document">View as Document</Link> */}
          <div className="right">
            <h4>Risk Management Table</h4>
            {/* <img src={menu} alt="menu"/> */}
          </div>
        </header>
        <div className="titles">
          <h6>Risk</h6>
          <h6>Likelihood</h6>
          <h6>Severity</h6>
          <h6>Mitigation</h6>
          <h6>Owner</h6>
        </div>
      </div>

      <div className="contents">
        {props.projectRisks.options.managerial.display ? (
          <RiskType
            risks={props.projectRisks.managerial}
            type="Managerial"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.technical.display ? (
          <RiskType
            risks={props.projectRisks.technical}
            type="Technical"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.commercial.display ? (
          <RiskType
            risks={props.projectRisks.commercial}
            type="Commercial"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.legal.display ? (
          <RiskType
            risks={props.projectRisks.legal}
            type="Legal"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}

        {props.projectRisks.options.environmental.display ? (
          <RiskType
            risks={props.projectRisks.environmental}
            type="Environmental"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(RiskTable);
