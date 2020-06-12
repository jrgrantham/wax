import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./projectComponents/ProjectHeader";
import ProjectRisk from "./projectComponents/ProjectRisk";
import styled from "styled-components";
import Options from "./projectComponents/ProjectOptions";
import SelectTemplate from "./projectComponents/SelectTemplate";
import Menu from "./Menu";
import { replaceRisks } from "../state/actionCreators/riskActionCreators";
import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";
import { setUser } from "../state/actionCreators/userActionCreators";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";
import add from "../images/addIcon.png";

const userApi = `${url()}api/users/user`;
const templateApi = `${url()}api/users/templates`;
const clientApi = `${url()}api/users/client/`;
const riskApi = `${url()}api/users/risks/`;
const token = localStorage.getItem("token");

function RiskTable(props) {
  function sortRisks(array) {
    const sortedRisks = array.sort(function (a, b) {
      return b.risk - a.risk;
    });
    return sortedRisks;
  }

  function getData() {
    console.log('fetching user data');
    const selectedUser = localStorage.getItem("selectedClientId");
    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // check response, if user not admin, set user
        // console.log("initial id:", res.data.id);
        if (!res.data.admin) {
          console.log('client detected - setting user');
          props.setUser(res.data);
          // if user is admin, fetch the user by selected id
        } else {
          // props.setUser(res.data);
          console.log(`admin detected - fetching data, ID: ${selectedUser}`);
          // if no user in storage, skip.
          if (selectedUser) {
            axiosWithAuth(token)
              .get(clientApi + selectedUser)
              .then((res) => {
                console.log(`data for user ID: ${selectedUser} received`);
                props.setUser(res.data);
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        }
        let user = "";
        // if admin, get by user from local storage
        if (res.data.admin) {
          user = selectedUser;
          // otherwise, get by user info
        } else {
          user = res.data.id;
        }
        setTimeout(() => {
          console.log('** 500ms delay **');
          console.log('fetching risks');
          axiosWithAuth(token)
            .get(riskApi + user)
            .then((res) => {
              console.log('risks received');
              props.replaceRisks(sortRisks(res.data));
            })
            .catch((error) => {
              console.log(error.message);
              // props.history.push("/login");
            });
          if (res.data.useTemplates) {
          console.log('fetching templates');
          axiosWithAuth(token)
              .get(templateApi)
              .then((res) => {
              console.log('templates received');
              props.replaceTemplateRisks(res.data);
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        }, 500);
      })
      .catch((error) => {
        console.log(error.message);
        // window.location.replace(`${url()}login`)
        // props.history.push("/login");
      });
  }

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

  useEffect(() => {
    // if (riskLimit) {
    //   setShowTemplate(false);
    // }
    getData();
    return () => {
      console.log("leaving risk table"); // send state here
    };
  }, []);

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
    padding: 30px 10px 20px 10px;
    .image {
    }
    img {
      width: 40px;
      height: auto;
      padding: 0 10px;
    }
  }
`;
