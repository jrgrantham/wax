import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import url from "../helpers/url";
import { connect } from "react-redux";
import { setUser } from "../state/actionCreators/userActionCreators";

function Login(props) {
  const loginApi = url() + "api/auth/login";
  const blankForm = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(blankForm);

  function onChange(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }
  function submit() {
    axios
      .post(loginApi, loginForm)
      .then((response) => {
        setLoginForm(blankForm);
        localStorage.setItem("token", response.data.token);
        props.setUser(response.data.settings);
        // console.log(response.data.admin);
        if (response.data.admin) {
          props.history.push("/admin");
        } else {
          props.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginForm(blankForm);
      })
      .finally(() => {}); // add code in the block if required
  }

  return (
    <Container>
      <div className="contents">
        <h4>Risk Assessments R Us</h4>
        <input
          type="text"
          name="email"
          placeholder="email address"
          value={loginForm.email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginForm.password}
          onChange={onChange}
        />
        <button onClick={submit}>Login</button>
        {/* <p>send me my password</p> */}
      </div>
    </Container>
  );
}

export default connect((state) => state, { setUser })(Login);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  height: 100vh;
  h4 {
    margin-bottom: 20px;
  }
  p {
    font-size: 0.8rem;
    color: grey;
    margin-top: 20px;
  }
  ::placeholder {
    color: grey;
  }
  input {
    font-size: 0.8rem;
    padding: 10px;
  }
  button {
    font-size: 0.8rem;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  .contents {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 250px;
    /* border: 1px solid red */
  }
`;
