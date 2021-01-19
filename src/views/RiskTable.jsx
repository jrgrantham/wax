import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./projectComponents/ProjectHeader";
import ProjectRisk from "./projectComponents/ProjectRisk";
import styled from "styled-components";
import Options from "./projectComponents/ProjectOptions";
import SelectTemplate from "./projectComponents/SelectTemplate";
import Menu from "./Menu";
import { replaceRisks, getRisks } from "../state/actionCreators/riskActionCreators";
import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";
import { setUser, getUser } from "../state/actionCreators/userActionCreators";
import add from "../images/addIcon.png";

const token = localStorage.getItem("token");

function RiskTable(props) {
  // function sortRisks(array) {
  //   const sortedRisks = array.sort(function (a, b) {
  //     return b.risk - a.risk;
  //   });
  //   return sortedRisks;
  // }

  // console.log(token);

  const type = props.user.selected.toLowerCase();
  const risks = props.risks.entries.filter((risk) => risk.type === type);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function checkTarget(event) {
    if (event.target.id === "menu" || event.target.id === "subMenu") {
      return;
    }
    setShowMenu(false);
  }

  const selected = props.user.selected.toLowerCase().slice(0, 3) + "Color";
  const color = props.user[selected];

  const emtpy = (
    <div className="empty">
      <span>Use the</span>{" "}
      <div className="image">
        <img src={add} alt="add" />
      </div>{" "}
      <span>button to add risks</span>
    </div>
  );

  useEffect(() => {
    // if (riskLimit) {
    //   setShowTemplate(false);
    // }
    props.getUser();
    props.getRisks();
    return () => {
      console.log("leaving risk table");
    };
  }, []);

  return (
    <Container onClick={(event) => checkTarget(event)} color={color}>
      <Menu showMenu={showMenu} />
      {showTemplate ? (
        <SelectTemplate setShowTemplate={setShowTemplate} />
      ) : null}
      <Header setShowMenu={setShowMenu} />
      <div className="risks">
        {risks.length ? null : emtpy}
        {risks.map((risk, index) => (
          <ProjectRisk risk={risk} key={index} />
        ))}
      </div>
      <Options setShowTemplate={setShowTemplate} />
    </Container>
  );
}

export default connect((state) => state, {
  getUser,
  getRisks,
  replaceRisks,
  setUser,
  replaceTemplateRisks,
})(RiskTable);

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
    margin-top: 168px;
    padding-bottom: 15px;
    // border: 7px solid;
    border-color: ${(props) => props.color};
    border-top: none;
    border-radius: 0 0 0 20px;
  }
  .empty {
    display: flex;
    justify-content: center;
    background-color: white;
    margin: 10px 200px;
    padding: 10px 10px;
    border-radius: 5px;
    .image {
    }
    img {
      width: 40px;
      height: auto;
      padding: 0 10px;
    }
  }
`;
