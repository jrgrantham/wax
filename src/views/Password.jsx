import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import url from "../helpers/url";
import { connect } from "react-redux";
import { setUser } from "../state/actionCreators/userActionCreators";
import eye from "../images/eye.png";
import axiosWithAuth from "../authentication/axiosWithAuth";

function Password(props) {
  if (props.user.email === "") {
    // uncomment line below once complete
    redirect()
  }

  const token = localStorage.getItem('token')

  const editUserApi = url() + "api/users/user";
  const blankForm = {
    email: "",
    old: "",
    new: "",
    match: false,
  };

  const [loginForm, setLoginForm] = useState(blankForm);
  const [opacity, setOpacity] = useState(0);

  function onChange(e) {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  }

  function sendChanges() {
    console.log('key: password, value: ', loginForm.new);
    const key = 'password';
    const value = loginForm.new;
    let id = props.user.id;

    axiosWithAuth(token)
      .put(editUserApi, { key, value, id })
      .then(() => {
        alert('Password changed')
        redirect()
      }) // no action when changes are sent, only when requested
      .catch((error) => {
        console.log(error);
        // alert(error.message);
      });
  }

  // function submit() {
  //   axios
  //     .post(editUserApi, loginForm)
  //     .then(() => {
  //       setLoginForm(blankForm);
  //       // localStorage.setItem("token", response.data.token);
  //       // props.setUser(response.data.settings);
  //       redirect();
  //     })
  //     .catch((error) => {
  //       alert(error);

  //       setLoginForm(blankForm);
  //     })
  //     .finally(() => {}); // add code in the block if required
  // }

  function redirect(admin) {
    if (admin) {
      props.history.push("/admin");
    } else {
      props.history.push("/");
    }
  }

  let button = "show";

  function showPassword(e) {
    e.preventDefault();
    const display = document.getElementById("new");
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
        Change Password
        <div className="password">
          <input
            id="old"
            type="password"
            name="old"
            placeholder="current password"
            value={loginForm.old}
            onChange={onChange}
          />
        </div>
        <div className="password">
          <input
            id="new"
            type="password"
            name="new"
            placeholder="new password"
            value={loginForm.new}
            onChange={onChange}
          />
          <div className="show">
            <img src={eye} alt="show password" onClick={showPassword} />
          </div>
        </div>
        <button
          onClick={sendChanges}
        >
          Submit
        </button>
        {/* <p>send me my password</p> */}
      </div>
    </Container>
  );
}

export default connect((state) => state, { setUser })(Password);

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
        width: 25px;
      }
    }
  }
  button {
    font-size: 0.8rem;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
    border-color: 2px solid lightgrey;
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

  .image {
    img {
      width: 200px;
    }
  }
`;
