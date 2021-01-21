import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  setUser,
  sendAdminChanges,
  getUser,
} from "../state/actionCreators/userActionCreators";
import { getClients } from "../state/actionCreators/clientActionCreators";
import eye from "../images/eye.png";
import Client from "./clientComponents/Client";

function Password(props) {
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

  useEffect(() => {
    props.getUser();
    props.getClients();
    return () => {};
  }, []);

  // function Account(client, index) {
  //   return (
  //     <div key={index} className="account">
  //       <div>
  //         <h6>{client.company}</h6>
  //         <p>{client.email}</p>
  //       </div>
  //       {index < 3 ? null : <button>delete</button>}
  //     </div>
  //   );
  // }

  return (
    <Container style={{ opacity: opacity }}>
      <div className="contents">
        <div>
          <h5>{props.user.company}</h5>
          <h6>{props.user.email}</h6>
        </div>
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
        <p>this will change the password immediately</p>
        {/* <p>send me my password</p> */}
      </div>
      <div className="allAccounts">
        {props.clients.map((client, index) => <Client client={client} key={index} />)}
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  setUser,
  sendAdminChanges,
  getClients,
  getUser,
})(Password);

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
    margin: 20px 0;
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
    border-color: 2px solid red;
    &:hover {
      cursor: pointer;
    }
  }
  .contents {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0px 20px 0px;
    width: 500px;
    border: 1px solid darkgray;
    background-color: #f6f6f6;
    border-radius: 15px;
    padding: 20px;

    h5, h6 {
      text-align: center;
      margin-top: 10px;
    }
  }

  .allAccounts {
    margin-bottom: 50px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .allAccounts::-webkit-scrollbar {
    display: none;
  }

  .account {
    display: flex;
    justify-content: space-between;
    width: 500px;
    padding: 20px;
    margin: 10px;
    border: 2px solid darkgray;
    border-radius: 15px;
  }

  .image {
    img {
      width: 200px;
    }
  }
`;
