import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setRiskOptions,
  toggleRiskDisplay,
} from "../state/actionCreators/projectActionCreators";

function RiskSettings(props) {
  const type = props.type.toLowerCase();

  const riskDetails = {
    display: props.projectRisks.options[type].display,
    defaultOwner: props.projectRisks.options[type].defaultOwner,
    color: props.projectRisks.options[type].color,
  };

  const [riskForm, setRiskForm] = useState(riskDetails);

  function onChange(event) {
    setRiskForm({ ...riskForm, [event.target.name]: event.target.value });
  }

  function submit() {
    props.setRiskOptions(type, riskForm);
  }

  return (
    <Container>
      <form>
        <label>{props.type}</label>
        <div className="button" onClick={() => props.toggleRiskDisplay(type)}>
          <p>{props.projectRisks.options[type].display ? "Yes" : "No"}</p>
        </div>
        {props.projectRisks.options[type].display ? (
          <>
            <input
              type="text"
              onChange={onChange}
              name="defaultOwner"
              placeholder={props.projectRisks.options[type].defaultOwner}
              onBlur={() => submit()}
            />
            <div className="colors">
              <div className="color">
                <div className="circle"></div>
              </div>
              <div className="color">
                <div className="circle"></div>
              </div>
              <div className="color">
                <div className="circle"></div>
              </div>
              <div className="color">
                <div className="circle"></div>
              </div>
              <div className="color">
                <div className="circle"></div>
              </div>
              <div className="color">
                <div className="circle"></div>
              </div>
            </div>
          </>
        ) : null}
      </form>
    </Container>
  );
}

export default connect((state) => state, { setRiskOptions, toggleRiskDisplay })(
  RiskSettings
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: grid;
    grid-template-columns: 150px 1fr 1fr 3fr;
    grid-template-rows: 42px;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* max-width: 300px; */
    label {
      text-align: left;
      width: 120px;
    }
    input {
      font-size: 14px;
      text-align: center;
      border: 1px solid lightgrey;
      width: 100%;
      /* border: 1px solid red; */
    }
    .colors {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .color {
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid red; */
        height: 100%;
        width: 100%;
        .circle {
          padding: 5px;
          background-color: red;
        border: 3px solid black;
          border-radius: 50%;
          height: 20px;
          width: 20px;
        }
      }
    }

    .button {
      display: inline-block;
      border: 1px solid lightgrey;
      border-radius: 5px;
      width: 50px;
      background-color: white;
      /* padding: 5px; */
      /* margin: 0 10px; */
      p {
        text-align: center;
        font-size: 14px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
