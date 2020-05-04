import React, {useState} from "react";
import { connect } from "react-redux";
import Header from "./components/ProjectHeader";
import ProjectRisk from "./components/ProjectRisk";
import styled from "styled-components";
import Options from "./components/ProjectOptions";
import TemplateTable from "./TemplateTable";

function RiskTable(props) {
  const selected = props.projectRisks.selected;
  const risks = props.projectRisks[selected.toLowerCase()];

  const [showTemplate, setShowTemplate] = useState(false)

  return (
    <Container>
      {!showTemplate ? <TemplateTable setShowTemplate={setShowTemplate} /> : null}
      <Header />
      <div className="risks">
        {risks.map((risk, index) => (
          <ProjectRisk risk={risk} key={index} />
        ))}
      </div>
      <Options setShowTemplate={setShowTemplate} />
    </Container>
  );
}

export default connect((state) => state, {})(RiskTable);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  min-height: 100vh;
  background-color: white;
  /* border: 1px solid black; */
  .risks {
    background-color: #e5e5e5;
    width: 100%;
    max-width: 1500px;
    margin-top: 176px;
    padding-bottom: 15px;
    border-radius: 0 0 0 20px;
  }
`;
