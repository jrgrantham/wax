import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setProjectValue } from "../../state/actionCreators/userActionCreators";
import { projectOptions } from "../../data/projectOptions";
import { setUser } from "../../state/actionCreators/userActionCreators";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const userApi = `${url()}api/users/user`;
const token = localStorage.getItem("token");
const clientApi = `${url()}api/users/client/`;

function ProjectSettings(props) {
  const {
    company,
    project,
    application,
    nature,
    email,
    password,
    ipMethod,
  } = props.user;
  const { natureOptions, ipMethodOptions } = projectOptions;

  function onChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    props.setProjectValue(key, value);
  }

  function getSettings() {
    console.log("fetching user");
    const selectedUser = localStorage.getItem("selectedClientId");
    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // check response, if user not admin, set user
        if (!res.data.admin) {
          console.log("user is a client");
          props.setUser(res.data);
          // if user is admin, fetch the user by selected id
        } else {
          console.log("user is admin");
          // props.setUser(res.data);
          // if no user in storage, skip.
          if (selectedUser) {
            // const api = clientApi + selectedUser;
            // console.log(api);
            console.log("fetching client, ID:", selectedUser);
            axiosWithAuth(token)
              .get(clientApi + selectedUser)
              .then((res) => {
                console.log("client", selectedUser, "received");
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
        // props.history.push("/login");
      });
  }

  function sendChanges(event) {
    const key = event.target.name;
    const value = event.target.value;
    let id = "";
    if (props.user.admin) {
      id = localStorage.getItem("selectedClientId");
    } else {
      id = props.user.id;
    }
    axiosWithAuth(token)
      .put(userApi, { key, value, id })
      .then(() => {}) // no action when changes are sent, only when requested
      .catch((error) => {
        console.log(error);
        // alert(error.message);
      });
  }

  useEffect(() => {
    if (!props.user.company || localStorage.getItem("newClient")) {
      getSettings();
    }
    return () => {};
  }, []);

  return (
    <Container>
      <form className="projectForm">
        <h5>Project</h5>

        {/* Account / Email */}
        {props.user.admin ? (
          <div className="info">
            <label>Account / Email:</label>
            <input
              spellCheck="true"
              type="text"
              onChange={onChange}
              onBlur={sendChanges}
              name="email"
              value={email}
            />
          </div>
        ) : null}

        {/* Password */}
        <div className="info">
          <label>Password:</label>
          {/* <button className='password' onClick={(e) => showPassword(e)}>{button}</button> */}
          <input
            id="type"
            spellCheck="true"
            type="password"
            onChange={onChange}
            onBlur={sendChanges}
            name="password"
            value={password}
          />
        </div>

        {/* company name */}
        <div className="info">
          <label>Company Name:</label>
          <input
            spellCheck="true"
            type="text"
            onChange={onChange}
            onBlur={sendChanges}
            name="company"
            value={company}
          />
        </div>

        {/* nature */}
        <div className="info">
          <label>Project Nature:</label>
          <select
            type="text"
            onChange={onChange}
            onBlur={sendChanges}
            name="nature"
            value={nature}
          >
            {natureOptions.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* ipMethod */}
        <div className="info">
          <label>IP Protection:</label>
          <select
            type="text"
            onChange={onChange}
            onBlur={sendChanges}
            name="ipMethod"
            value={ipMethod}
          >
            {ipMethodOptions.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* project */}
        <div className="info">
          <label>Project Name: </label>
          <input
            spellCheck="true"
            type="text"
            onChange={onChange}
            onBlur={sendChanges}
            name="project"
            value={project}
          />
        </div>

        <div className="info">
          <label>IUK Application Number: </label>
          <input
            type="text"
            onChange={onChange}
            onBlur={sendChanges}
            name="application"
            value={application}
          />
        </div>
      </form>
    </Container>
  );
}

export default connect((state) => state, { setProjectValue, setUser })(
  ProjectSettings
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  padding: 20px;

  h5 {
    margin-bottom: 30px;
  }

  label {
    margin: 5px;
    width: 250px;
    /* border: 1px solid red; */
    text-align: left;
  }

  .projectForm {
    /* border: 1px solid red; */
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: #f0f0f0;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 5px;
    }
    .password {
      font-size: 0.7rem;
      margin-right: 1rem;
      border-color: lightgray;
    }

    input,
    select {
      width: 100%;
      max-width: 300px;
      font-size: 14px;
      border: 1px solid lightgrey;
    }
  }
`;
