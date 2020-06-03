import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ProjectSettings from "./settingComponents/ProjectSettings";
import RiskSettings from "./settingComponents/RiskSettings";
import Header from "./settingComponents/SettingsHeader";
import AdminSettings from "./settingComponents/AdminSettings";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";
import { setUser } from "../state/actionCreators/userActionCreators";

const userApi = `${url()}api/users/user`;
// const riskApi = `${url()}api/users/risks`;
const clientApi = `${url()}api/users/client/`;
const token = localStorage.getItem("token");

function ClientSettings(props) {
  // console.log(props.history);
  // console.log(document.referrer);
  
  
  function getSettings() {
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
            // const api = clientApi + selectedUser;
            // console.log(api);
            axiosWithAuth(token)
              .get(clientApi + selectedUser)
              .then((res) => {
                // console.log(res.data);
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
  }

  useEffect(() => {
    getSettings();
    return () => {
      console.log("unmounted settings"); // send state here
    };
  }, []);

  return (
    <Container>
      <div className="contents">
        <Header />
        <ProjectSettings />
        <RiskSettings />
        {props.user.admin ? <AdminSettings /> : null}
      </div>
    </Container>
  );
}

export default connect((state) => state, {setUser})(ClientSettings);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px 50px 20px;
  background-color: #f0f0f0;
  /* border: 1px solid black; */

  .contents {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    max-width: 800px;
    padding: 30px;
    background-color: white;
  }
`;
