import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "./templateComponents/TemplateHeader";
import TemplateRisk from "./templateComponents/TemplateRisk";
import styled from "styled-components";
import Options from "./templateComponents/TemplateOptions";
import Menu from "./Menu";

function Templates(props) {
  const selected = props.user.selected;
  const templates = props.templates;

  console.log(templates);
  

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
      <Header setShowMenu={setShowMenu} />
      <div className="risks">
        {templates.map((template, index) => (
          <TemplateRisk template={template} key={index} />
        ))}
      </div>
      <Options />
    </Container>
  );
}

export default connect((state) => state, {})(Templates);

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
    margin-top: 229px;
    padding-bottom: 15px;
    border-radius: 0 0 0 20px;
  }
`;
