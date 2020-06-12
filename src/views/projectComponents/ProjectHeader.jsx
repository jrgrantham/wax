import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import menu from "../../images/menu.png";
import { setProjectValue } from "../../state/actionCreators/userActionCreators";
import {
  addToProject,
  replaceRisks,
} from "../../state/actionCreators/riskActionCreators";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const userApi = `${url()}api/users/user`;
const token = localStorage.getItem("token");

function RiskTable(props) {
  const countMan = props.risks.entries.filter(
    (risk) => risk.type === "managerial"
  ).length;
  const countTec = props.risks.entries.filter(
    (risk) => risk.type === "technical"
  ).length;
  const countCom = props.risks.entries.filter(
    (risk) => risk.type === "commercial"
  ).length;
  const countLeg = props.risks.entries.filter((risk) => risk.type === "legal")
    .length;
  const countEnv = props.risks.entries.filter(
    (risk) => risk.type === "environmental"
  ).length;

  function sendChanges(key, value) {
    let id = "";
    if (props.user.admin) {
      id = localStorage.getItem("selectedClientId");
    } else {
      id = props.user.id;
    }
    console.log("setting risk type");
    axiosWithAuth(token)
      .put(userApi, { key, value, id })
      .then(() => {}) // no action when changes are sent, only when requested
      .catch((error) => {
        console.log(error.message);
      });
  }

  function setSelected(value) {
    sortRisks();
    props.setProjectValue("selected", value);
    sendChanges("selected", value);
  }

  function showMenu(e) {
    e.stopPropagation();
    props.setShowMenu(true);
  }

  function calculateRisk() {
    const calculatedRisks = props.risks.entries.map((entry) => {
      const value = entry.probability * entry.consequence;
      return { ...entry, risk: value };
    });
    return calculatedRisks;
  }

  function sortRisks() {
    const sortedRisks = calculateRisk().sort(function (a, b) {
      return b.risk - a.risk;
    });
    props.replaceRisks(sortedRisks);
  }

  const selected = props.user.selected.toLowerCase().slice(0, 3) + "Color";
  const color = props.user[selected];

  return (
    <Container color={color}>
      <header>
        <div className="left">
          <h4>Risk Management Table {props.user.admin ? "(Admin)" : null}</h4>
          <p>
            {props.user.project} - {props.user.company}
          </p>
        </div>
        <div className="image" onClick={(e) => showMenu(e)}>
          <img src={menu} alt="menu" />
        </div>
      </header>
      <div className="types">
        <Type
          background={props.user.manColor}
          onClick={() => setSelected("managerial")}
        >
          <h6>Managerial ({countMan})</h6>
        </Type>
        <Type
          background={props.user.comColor}
          onClick={() => setSelected("commercial")}
        >
          <h6>Commercial ({countCom})</h6>
        </Type>
        <Type
          background={props.user.tecColor}
          onClick={() => setSelected("technical")}
        >
          <h6>Technical ({countTec})</h6>
        </Type>
        {props.user.envDisplay ? (
          <Type
            background={props.user.envColor}
            onClick={() => setSelected("environmental")}
          >
            <h6>Environmental ({countEnv})</h6>
          </Type>
        ) : null}
        {props.user.legDisplay ? (
          <Type
            background={props.user.legColor}
            onClick={() => setSelected("legal")}
          >
            <h6>Legal ({countLeg})</h6>
          </Type>
        ) : null}
      </div>
      <div className="banner"></div>
      <div className="titles">
        <div className="comments">
          <h6>Description</h6>
          <span>{`(max ${props.user.maxCharacters} characters)`}</span>
        </div>
        <h6>Likelihood</h6>
        <h6>Severity</h6>
        <div className="comments">
          <h6>Mitigation</h6>
          <span>{`(max ${props.user.maxCharacters} characters)`}</span>
        </div>
        <h6>Owner</h6>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  setProjectValue,
  addToProject,
  replaceRisks,
})(RiskTable);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
  position: fixed;
  background-color: white;
  width: calc(100% - 40px);
  max-width: 1500px;
  z-index: 1;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    width: 100%;
    padding-top: 15px;
    .image {
      width: 30px;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
  .types {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid red; */
  }
  .banner {
    background-color: ${(props) => props.color};
    height: 10px;
    width: 100%;
  }
  .titles {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 90px 90px 1fr 75px 20px;
    column-gap: 5px;
    padding: 5px 0 0px 25px;
    background-color: #e5e5e5;
    // border-left: 7px solid black;
    // border-right: 7px solid black;
    border-color: ${(props) => props.color};
    .comments {
      display: flex;
      /* flex-direction: column; */
      justify-content: center;
      align-items: baseline;
      span {
        padding-left: 10px;
        font-size: 0.7rem;
      }
    }
    h6 {
      padding: 10px 0;
      text-align: center;
    }
  }
`;

const Type = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 41px;
  align-items: center;
  border-radius: 20px 20px 0px 0px;
  background-color: ${(props) => props.background};
  border: none;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;
