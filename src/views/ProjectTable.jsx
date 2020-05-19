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
import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";
import { setUser } from "../state/actionCreators/userActionCreators";

const userApi = `${url()}api/users/user`;
const templateApi = `${url()}api/users/templates`;
const riskApi = `${url()}api/users/risks`;
const token = localStorage.getItem("token");

function RiskTable(props) {
  function sortRisks(array) {
    const sortedRisks = array.sort(function (a, b) {
      return b.risk - a.risk;
    });
    return sortedRisks;
  }

  function getData() {
    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // console.log(res.data);
        props.setUser(res.data);
      })
      .catch((error) => {
        console.log(error.message);
        props.history.push("/login");
      });
    axiosWithAuth(token)
      .get(riskApi)
      .then((res) => {
        // console.log(res.data);
        props.replaceRisks(sortRisks(res.data));
      })
      .catch((error) => {
        console.log(error.message);
        props.history.push("/login");
      });
        if (props.user.useTemplates) {
          axiosWithAuth(token)
            .get(templateApi)
            .then((res) => {
              props.replaceTemplateRisks(res.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
  }

  // useEffect(() => {
  //   getData();
  //   return function cleanup() {
  //     (console.log("unmounted")) // send state here
  //   }
  // }, []);

  const type = props.user.selected.toLowerCase();
  const risks = props.risks.entries.filter((risk) => risk.type === type);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // console.log(risks);
  
  // const maxRisks = props.user[type.slice(0, 3) + "MaxRisks"];
  // const usedRisks = props.risks.entries.filter((risk) => risk.type === type)
  //   .length;
  // const riskLimit = usedRisks < maxRisks;

  function checkTarget(event) {
    if (event.target.id === "menu" || event.target.id === "subMenu") {
      return;
    }
    setShowMenu(false);
  }

  useEffect(() => {
    // if (riskLimit) {
    //   setShowTemplate(false);
    // }
    getData();
    return () => {
      console.log("unmounted risks"); // send state here
    };
  }, []);

  return (
    <Container onClick={(event) => checkTarget(event)}>
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

export default connect((state) => state, {
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
    margin-top: 186px;
    padding-bottom: 15px;
    border-radius: 0 0 0 20px;
  }
`;
