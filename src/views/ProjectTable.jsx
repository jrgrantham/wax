import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "./projectComponents/ProjectHeader";
import ProjectRisk from "./projectComponents/ProjectRisk";
import styled from "styled-components";
import Options from "./projectComponents/ProjectOptions";
import TemplateTable from "./templateComponents/TemplateTable";
import Menu from "./projectComponents/Menu";

function RiskTable(props) {
  const selected = props.projectRisks.selected;
  
  const risks = props.projectRisks[selected.toLowerCase()];

  const [showTemplate, setShowTemplate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function location(event) {
    if (event.target.id === "menu" || event.target.id === "subMenu") {
      return;
    }
    setShowMenu(false);
  }

  return (
    <Container onClick={(event) => location(event)}>
      <Menu showMenu={showMenu} />
      {showTemplate ? (
        <TemplateTable setShowTemplate={setShowTemplate} />
      ) : null}
      <Header setShowMenu={setShowMenu} />
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
  padding: 0px 0 50px 0;
  /* border: 1px solid black; */
  .risks {
    background-color: #e5e5e5;
    width: 100%;
    max-width: 1500px;
    margin-top: 186px;
    padding-bottom: 15px;
    border-radius: 0 0 0 20px;
  }
`;
