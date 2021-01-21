import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  setUser,
  sendAdminChanges,
} from "../state/actionCreators/userActionCreators";
import eye from "../images/eye.png";

function Password(props) {
  if (!props.user.admin) {
    props.history.push("/admin");
  }

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
    console.log("key: password, value: ");
    const key = "password";
    const value = loginForm.new;
    props.sendAdminChanges(key, value);
    setLoginForm(blankForm);
    props.history.push("/admin");
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
        {/* <div className="password">
          <input
            id="old"
            type="password"
            name="old"
            placeholder="current password"
            value={loginForm.old}
            onChange={onChange}
          />
        </div> */}
        <div className="password">
          <input
            id="new"
            type="password"
            name="new"
            placeholder="Enter new password"
            value={loginForm.new}
            onChange={onChange}
          />
          <div className="show">
            <img src={eye} alt="show password" onClick={showPassword} />
          </div>
        </div>
        <button onClick={sendChanges}>Submit</button>
        {/* <p>send me my password</p> */}
      </div>
    </Container>
  );
}

export default connect((state) => state, { setUser, sendAdminChanges })(
  Password
);

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
