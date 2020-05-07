import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setRiskOptions,
  replaceRisks,
  setRiskColor,
} from "../../state/actionCreators/projectActionCreators";
import Slider from "../../images/Slider";
import { projectOptions} from '../../data/globalSettings'

function RiskSettings(props) {
  const admin = props.projectRisks.admin;
  const type = props.type.toLowerCase();
  const colors = projectOptions.riskColors;
  
  const currentColor = props.projectRisks.options[type].color;
  const currentMax = props.projectRisks.options[type].maxRisks;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function onChange(event) {
    props.setRiskOptions(type, event.target.name, event.target.value);
  }

  function setColor(color) {
    props.setRiskColor(type, color);
  }

  function changeMax(event) {
    const value = parseInt(event.target.value);
    props.setRiskOptions(type, event.target.name, value);
    const allrisks = props.projectRisks[type];
    const newRisks = allrisks.slice(0, value);
    console.log(newRisks);
    props.replaceRisks(type, newRisks);
    console.log(props.projectRisks[type]);
  }

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
            value={props.projectRisks.options[type].defaultOwner}
          />
          <div className="colors">
            {colors.map((color, index) => {
              return (
                <div className="color" key={index}>
                  <div
                    className="circle"
                    onClick={() => setColor(color)}
                    style={
                      color === currentColor
                        ? {
                            backgroundColor: color,
                            width: "25px",
                            height: "25px",
                            border: "1px solid black",
                          }
                        : { backgroundColor: color }
                    }
                  ></div>
                </div>
              );
            })}
          </div>
          {admin ? (
            <div className="width">
              <select
                type="number"
                onChange={changeMax}
                name="maxRisks"
                defaultValue={currentMax}
              >
                {numbers.map((number, index) => {
                  return (
                    <option key={index} value={number}>
                      {number}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
        </div>
      </form>
    </Container>
  );
}

export default connect((state) => state, {
  setRiskOptions,
  replaceRisks,
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
      min-width: 100px;
      margin: 5px;
    }
    .owner {
      margin-right: 20px;
    }
    input,
    select {
      font-size: 14px;
      text-align: center;
      border: 1px solid lightgrey;
      width: 50px;
      margin-left: 10px;

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
