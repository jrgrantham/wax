import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  setRiskOptions,
  toggleRiskDisplay,
} from "../state/actionCreators/riskActionCreators";

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
        <div className="header">
          <label>{props.type} Risk</label>
          <div className="button" onClick={() => props.toggleRiskDisplay(type)}>
            <p>{props.projectRisks.options[type].display ? "Yes" : "No"}</p>
          </div>
        </div>
        {props.projectRisks.options[type].display ? (
          <div className="options">
            <input
              type="text"
              onChange={onChange}
              name="defaultOwner"
              placeholder={`Default owner: ${props.projectRisks.options[type].defaultOwner}`}
              onBlur={() => submit()}
            />
            <input
              type="text"
              onChange={onChange}
              name="color"
              placeholder="colour"
              onBlur={() => submit()}
            />
          </div>
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
  padding: 10px;
  /* border: 1px solid red; */

  form {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    .header {
      display: flex;
      /* border: 1px solid red; */
      justify-content: space-between;
      width: 200px;
      .button {
        display: inline-block;
        border: 1px solid black;
        border-radius: 5px;
        width: 50px;
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
  }

  input,
  select {
    width: 100%;
    max-width: 150px;
    font-size: 10px;
    /* border: 1px solid red; */
    margin: 5px;
  }
`;
