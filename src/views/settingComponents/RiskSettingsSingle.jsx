import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { sendUserChanges } from "../../state/actionCreators/userActionCreators";
import { replaceRisks } from "../../state/actionCreators/riskActionCreators";
import Slider from "../../images/Slider";
import { projectOptions } from "../../data/projectOptions";

function RiskSettings(props) {
  const admin = props.user.admin;
  const type = props.type.toLowerCase();
  const colors = projectOptions.riskColorOptions;
  const currentColor = props.user[type.slice(0, 3) + "Color"];
  const currentMax = props.user[type.slice(0, 3) + "MaxRisks"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function onChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    props.sendUserChanges(key, value, props.user.id);
  }

  function setColor(value) {
    const key = type.slice(0, 3) + "Color";
    props.sendUserChanges(key, value, props.user.id);
  }

  function changeMax(event) {
    const key = event.target.name;
    const value = parseInt(event.target.value);
    props.sendUserChanges(key, value, props.user.id);
  }

  return (
    <Container>
      <form>
        <Slider type={type} />
        <label className="type">{props.type}</label>
        <div
          className="hide"
          style={
            props.user[type.slice(0, 3) + "Display"]
              ? { opacity: 1 }
              : { opacity: 0 }
          }
        >
          <input
            className="owner"
            type="text"
            onChange={onChange}
            name={type.slice(0, 3) + "DefaultOwner"}
            value={props.user[type.slice(0, 3) + "DefaultOwner"]}
          />
          <div className="colors">
            {colors.map((color, index) => {
              return (
                <div className="color" key={index}>
                  <div
                    className="circle"
                    name={`${type.slice(0, 3)}Color`}
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
                name={type.slice(0, 3) + "MaxRisks"}
                value={currentMax}
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
  replaceRisks,
  sendUserChanges,
})(RiskSettings);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  /* border: 1px solid red; */

  form {
    display: flex;
    justify-content: flex-start;
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
      min-width: 103px;
      margin: 5px;
      margin-left: 20px;
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
      margin-left: 20px;

      /* border: 1px solid red; */
    }
    .colors {
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-left: 10px;
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
