import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./templateComponents/TemplateHeader";
import TemplateRisk from "./templateComponents/TemplateRisk";
import styled from "styled-components";
import Options from "./templateComponents/TemplateOptions";
import Menu from "./Menu";
import { setUser } from "../state/actionCreators/userActionCreators";
import {
  replaceTemplateRisks,
  getTemplates,
} from "../state/actionCreators/templateActionCreators";

function Templates(props) {
  const [showMenu, setShowMenu] = useState(false);

  function location(event) {
    if (event.target.id === "menu" || event.target.id === "subMenu") {
      return;
    }
    setShowMenu(false);
  }
  const templates = props.templates.entries.filter(
    (risk) => risk.type === props.user.selected
  );

  useEffect(() => {
    props.getTemplates();
    return () => {};
  }, []);

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

export default connect((state) => state, {
  replaceTemplateRisks,
  getTemplates,
  setUser,
})(Templates); //remove withRouter and the parens
// export default withRouter (connect((state) => state, { replaceTemplateRisks, setUser })(Templates)); //remove withRouter and the parens

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
    margin-top: 178px;
    padding-bottom: 15px;
    border-radius: 0 0 0 20px;
  }
`;
