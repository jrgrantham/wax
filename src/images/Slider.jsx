import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  toggleProjectBoolean,
  sendUserChanges,
} from "../state/actionCreators/userActionCreators";

function Slider(props) {
  const type = props.type;
  const isChecked = props.user[type.slice(0, 3) + "Display"];
  const changeable = props.user[type.slice(0, 3) + "DisplayChangeable"];

  function toggleDisplay() {
    if (changeable) {
      const key = props.type.slice(0, 3) + "Display";
      props.toggleProjectBoolean(key);
      props.sendUserChanges(key, !isChecked, props.user.id);
    }
  }

  return (
    <Container>
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleDisplay()}
        />
        <span className="slider round"></span>
      </label>
    </Container>
  );
}
export default connect((state) => state, {
  toggleProjectBoolean,
  sendUserChanges,
})(Slider);

const Container = styled.div`
  /* display: flex;
  border: 1px solid red;
  min-width: 50px; */

  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 20px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }
  /* 
  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  } */

  input:checked + .slider:before {
    -webkit-transform: translateX(10px);
    -ms-transform: translateX(10px);
    transform: translateX(10px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
