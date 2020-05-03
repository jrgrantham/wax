import React from "react";
import { connect } from "react-redux";
import RiskType from "./RiskTypeTemplate";
import { Container } from "./riskTableStyling";
import { Link } from "react-router-dom";

function TemplateTable(props) {

  return (
    <Container>
      <div className="fixed">
        <header>
          <h4>Template Risks</h4>
          <Link to="risk-table">
            <h4>Return to Project</h4>
          </Link>
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
            risks={props.adminSettings.riskTemplate.managerial}
            type="Managerial"
            riskRange={props.adminSettings.riskTemplate.riskRange}
          />
        ) : null}

        {props.projectRisks.options.technical.display ? (
          <RiskType
            risks={props.adminSettings.riskTemplate.technical}
            type="Technical"
            riskRange={props.adminSettings.riskTemplate.riskRange}
          />
        ) : null}

        {props.projectRisks.options.commercial.display ? (
          <RiskType
            risks={props.adminSettings.riskTemplate.commercial}
            type="Commercial"
            riskRange={props.adminSettings.riskTemplate.riskRange}
          />
        ) : null}

        {props.projectRisks.options.legal.display ? (
          <RiskType
            risks={props.adminSettings.riskTemplate.legal}
            type="Legal"
            riskRange={props.adminSettings.riskTemplate.riskRange}
          />
        ) : null}

        {props.projectRisks.options.environmental.display ? (
          <RiskType
            risks={props.adminSettings.riskTemplate.environmental}
            type="Environmental"
            riskRange={props.adminSettings.riskTemplate.riskRange}
          />
        ) : null}
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(TemplateTable);
