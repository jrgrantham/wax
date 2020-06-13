import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import url from "../helpers/url";
import { connect } from "react-redux";
import { setUser } from "../state/actionCreators/userActionCreators";
import logo from "../images/damien.png";
import eye from "../images/eye.png";

function Login(props) {
  const loginApi = url() + "api/auth/login";
  const blankForm = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(blankForm);
  const [opacity, setOpacity] = useState(0);

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
        redirect(response.data.admin);
      })
      .catch((error) => {
        alert(error);

        setLoginForm(blankForm);
      })
      .finally(() => {}); // add code in the block if required
  }

  // document.addEventListener("keydown", (event) => {
  //   if (event.keyCode === 13) {
  //     submit();
  //   }
  // });

  function redirect(admin) {
    // setTimeout(() => {
    if (admin) {
      props.history.push("/admin");
    } else {
      props.history.push("/");
    }
    // }, 1500);
  }

  let button = "show";

  function showPassword(e) {
    e.preventDefault();
    const display = document.getElementById("type");
    if (display.type === "password") {
      display.type = "text";
      button = "hide";
    } else {
      display.type = "password";
      button = "show";
    }
  }

  setTimeout(() => {
    setOpacity(1);
  }, 300);

  return (
    <Container style={{ opacity: opacity }}>
      <div className="contents">
        <div className="image">
          <img src={logo} alt="risk" />
        </div>
        {/* <h4>Risk Assessment</h4> */}
        <input
          type="text"
          name="email"
          placeholder="email address"
          value={loginForm.email}
          onChange={onChange}
        />
        <div className='password'>
          <input
            id='type'
            type="password"
            name="password"
            placeholder="password"
            value={loginForm.password}
            onChange={onChange}
          />
          <div className='show'>
            <img src={eye} alt="show password" onClick={showPassword} />
          </div>
        </div>
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
  transition: opacity 1s;
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
    width: 220px;
    font-size: 0.8rem;
    padding: 10px;
    border-color: lightgray;
  }
  .password {
    display: flex;
    align-items: center;
    .show {
    display: flex;
    align-items: center;
      img {
        margin-left: -30px;
        width: 25px
      }
    }
  }
  button {
    font-size: 0.8rem;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
    border-color: lightgray;
    &:hover {
      cursor: pointer;
    }
  }
  .contents {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 350px;
    /* border: 1px solid red */
  }

  .image {
    img {
      width: 200px;
    }
  }
`;
