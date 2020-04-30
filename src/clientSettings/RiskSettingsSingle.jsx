import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setRiskOptions } from "../state/actionCreators/riskActionCreators";

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

  function toggleDisplay() {
    const toggledDisplay = !riskForm.display;
    setRiskForm({ ...riskForm, display: toggledDisplay });
    submit();
  }

  function submit() {
    props.setRiskOptions(type, riskForm);
  }

  return (
    <Container>
      <form className="riskForm" >
        <label>{props.type}</label>
        <div className="include" onClick={() => toggleDisplay()}>
          {riskForm.display ? "Yes" : "No"}
        </div>
        <input
          type="text"
          onChange={onChange}
          name="defaultOwner"
          placeholder="default owner"
          onBlur={() => submit()}
        />
        <input
          type="text"
          onChange={onChange}
          name="color"
          placeholder="colour"
          onBlur={() => submit()}
        />
      </form>
    </Container>
  );
}

export default connect((state) => state, { setRiskOptions })(RiskSettings);

const Container = styled.div`
  display: flex;
  flex-direction: row;

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

  .include {
    display: inline-block;
    border: 1px solid black;
    padding: 5px;
    margin: 0 10px;
  }

  .type {
    display: flex;
  }
`;
