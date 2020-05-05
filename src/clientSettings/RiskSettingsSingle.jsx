import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setRiskOptions,
  toggleRiskDisplay,
  setRiskColor,
} from "../state/actionCreators/projectActionCreators";
import Slider from "../images/Slider";

function RiskSettings(props) {
  const type = props.type.toLowerCase();
  const colors = props.adminSettings.riskColors;
  const currentColor = props.projectRisks.options[type].color;

  const newRiskDetails = {
    display: props.projectRisks.options[type].display,
    defaultOwner: props.projectRisks.options[type].defaultOwner,
    color: props.projectRisks.options[type].color,
  };
  const [riskForm, setRiskForm] = useState(newRiskDetails);

  function onChange(event) {
    setRiskForm({ ...riskForm, [event.target.name]: event.target.value });
  }

  function submit() {
    props.setRiskOptions(type, riskForm);
  }

  function setColor(color) {
    props.setRiskColor(type, color);
  }

  console.log(currentColor);

  return (
    <Container>
      <form>
        <Slider type={type} />
        <label className="type">{props.type}</label>
        <div
          className="hide"
          style={
            props.projectRisks.options[type].display
              ? { opacity: 1 }
              : { opacity: 0 }
          }
        >
          <input
            className="owner"
            type="text"
            onChange={onChange}
            name="defaultOwner"
            placeholder={props.projectRisks.options[type].defaultOwner}
            onBlur={() => submit()}
          />
          <div className="colors">
            {colors.map((color, index) => {
              return (
                <div className="color" key={index}>
                  <div
                    className="circle"
                    onClick={() => setColor(color)}
                    style={
                      color == currentColor
                        ? {
                            backgroundColor: color,
                            width: "25px",
                            height: "25px",
                            border: '1px solid black',
                          }
                        : { backgroundColor: color }
                    }
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </Container>
  );
}

export default connect((state) => state, {
  setRiskOptions,
  toggleRiskDisplay,
  setRiskColor,
})(RiskSettings);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  /* border: 1px solid red; */

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* max-width: 300px; */
    .hide {
      display: flex;
      align-items: center;
      transition: opacity 0.4s;
    }
    .type {
      /* margin-left: 10px; */
      text-align: left;
      /* border: 1px solid red; */
      min-width: 120px;
      margin: 5px;
    }
    .owner {
      margin-right: 20px;
    }
    input {
      font-size: 14px;
      text-align: center;
      border: 1px solid lightgrey;
      width: 50px;

      /* border: 1px solid red; */
    }
    .colors {
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .color {
        margin: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        .circle {
          padding: 5px;
          background-color: red;
          /* border: 3px solid black; */
          border-radius: 50%;
          height: 20px;
          width: 20px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
