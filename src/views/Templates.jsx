import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "./templateComponents/TemplateHeader";
import TemplateRisk from "./templateComponents/TemplateRisk";
import styled from "styled-components";
import Options from "./templateComponents/TemplateOptions";
import Menu from "./Menu";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";
import { setUser } from "../state/actionCreators/userActionCreators";
import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";

const templateApi = `${url()}api/users/templates`;
const userApi = `${url()}api/users/user`;
const clientApi = `${url()}api/users/client/`;
const token = localStorage.getItem("token");

function Templates(props) {
  function getTemplates() {
    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // check response, if user not admin, set user
        if (!res.data.admin) {
          props.setUser(res.data);
          // if user is admin, fetch the user by selected id
        } else {
          props.setUser(res.data);
          const selectedUser = localStorage.getItem("selectedClientId");
          // if no user in storage, skip.
          if (selectedUser) {
            const api = clientApi + selectedUser;
            console.log(api);
            axiosWithAuth(token)
              .get(clientApi + selectedUser)
              .then((res) => {
                console.log(res.data);
                props.setUser(res.data);
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        // window.location.replace(`${url()}login`)
        props.history.push("/login");
      });
    if (props.user.admin) {
      axiosWithAuth(token)
        .get(templateApi)
        .then((res) => {
          props.replaceTemplateRisks(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  useEffect(() => {
    getTemplates();
    return () => {
      // send data back
    };
  }, []);

  const templates = props.templates.entries.filter(
    (risk) => risk.type === props.user.selected
  );

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

export default connect((state) => state, { replaceTemplateRisks, setUser })(
  Templates
); //remove withRouter and the parens
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
