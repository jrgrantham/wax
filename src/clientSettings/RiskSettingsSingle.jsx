import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setRiskInfo } from "../state/actionCreators/riskActionCreators";

function RiskSettings(props) {
  const type = props.type.toLowerCase();

  const riskDetails = {
    display: props.projectRisks.options.managerial.display,
    defaultOwner: props.projectRisks.options.managerial.defaultOwner,
    color: props.projectRisks.options.managerial.color,
  };

  console.log(riskDetails);

  const [riskForm, setRiskForm] = useState(riskDetails);

  function onChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);

    setRiskForm({ ...riskForm, [event.target.name]: event.target.value });
  }

  function onFormSubmit(event) {
    event.preventDefault();
    props.setRiskInfo(riskForm);
  }

  return (
    <Container>
      <form className="riskForm" onSubmit={onFormSubmit}>
        <div className="type">
          <label>{props.type}</label>
          <div className="include">
            {props.projectRisks.options[type].display ? "On" : "Off"}
          </div>
          <input
            type="text"
            onChange={onChange}
            name="defaultOwner"
            placeholder="default owner"
          />
          <input
            type="text"
            onChange={onChange}
            name="color"
            placeholder="colour"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default connect((state) => state, { setRiskInfo })(RiskSettings);

const Container = styled.div`
  input,
  select {
    color: black;
    border: 1px solid black;
    border-radius: 5px;
    min-width: 200px;
    padding: 5px;
    box-shadow: none;
    -webkit-box-shadow: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-touch-callout: none;
    /* -webkit-user-select: none; */
    /* -khtml-user-select: none; */
    /* -moz-user-select: none; */
    /* -ms-user-select: none; */
    /* user-select: none; */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: inherit;
      opacity: 1; /* Firefox */
    }
  }

  .riskForm {
    /* display: flex; */
    /* flex-direction: column; */
    padding: 10px;
  }

  .type {
    display: flex;
  }
`;
