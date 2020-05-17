import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./projectComponents/ProjectHeader";
import ProjectRisk from "./projectComponents/ProjectRisk";
import styled from "styled-components";
import Options from "./projectComponents/ProjectOptions";
import SelectTemplate from "./projectComponents/SelectTemplate";
import Menu from "./Menu";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";
import { replaceRisks } from "../state/actionCreators/riskActionCreators";

const riskApi = `${url()}api/users/risks`;
const token = localStorage.getItem("token");

function RiskTable(props) {
  function getRisks() {
    axiosWithAuth(token)
      .get(riskApi)
      .then((res) => {
        props.replaceRisks(res.data)
      })
      .catch((error) => {
        console.log(error.message);
        props.history.push("/login");
      });
  }

  useEffect(() => {
    getRisks();
  }, []);

  const type = props.user.selected.toLowerCase();

  const risks = props.risks.entries.filter((risk) => risk.type === type);

  const [showTemplate, setShowTemplate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function location(event) {
    if (event.target.id === "menu" || event.target.id === "subMenu") {
      return;
    }
    setShowMenu(false);
  }

  // function closeWindow() {
  //   if (usedRisks === maxRisks) {
  //     setShowTemplate(false);
  //   }
  // }
  // closeWindow()

  return (
    <Container onClick={(event) => location(event)}>
      <Menu showMenu={showMenu} />
      {showTemplate ? (
        <SelectTemplate setShowTemplate={setShowTemplate} />
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

export default connect((state) => state, { replaceRisks })(RiskTable);

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
