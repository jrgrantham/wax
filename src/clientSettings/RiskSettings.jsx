import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setRiskOptions } from "../state/actionCreators/riskActionCreators";

function RiskSettingsSingle(props) {
  const riskDetails = {
    managerial: {
      display: props.projectRisks.options.managerial.display,
      defaultOwner: props.projectRisks.options.managerial.defaultOwner,
      color: props.projectRisks.options.managerial.color,
    },
    technical: {
      display: props.projectRisks.options.technical.display,
      defaultOwner: props.projectRisks.options.technical.defaultOwner,
      color: props.projectRisks.options.technical.color,
    },
    commercial: {
      display: props.projectRisks.options.commercial.display,
      defaultOwner: props.projectRisks.options.commercial.defaultOwner,
      color: props.projectRisks.options.commercial.color,
    },
    legal: {
      display: props.projectRisks.options.legal.display,
      defaultOwner: props.projectRisks.options.legal.defaultOwner,
      color: props.projectRisks.options.legal.color,
    },
    environmental: {
      display: props.projectRisks.options.environmental.display,
      defaultOwner: props.projectRisks.options.environmental.defaultOwner,
      color: props.projectRisks.options.environmental.color,
    },
  };

  const [riskForm, setRiskForm] = useState(riskDetails);

  function onChange(event) {
    setRiskForm({ ...riskForm, [event.target.name]: event.target.value });
  }

  function onFormSubmit(event) {
    event.preventDefault();
    props.setRiskOptions(riskForm);
  }

  return (
    <Container>
      <form className="riskForm" onSubmit={onFormSubmit}>
        <div className='type'>
          <label>Commercial</label>
          <div>{props.projectRisks.options.commercial.display ? 'On' : 'Off'}</div>
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
        </div>

        <div className='type'>
          <label>Technical</label>
          <div>true</div>
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
        </div>

        <div className='type'>
          <label>Managerial</label>
          <div>true</div>
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
        </div>

        <div className='type'>
          <label>Legal</label>
          <div>true</div>
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
        </div>

        <div className='type'>
          <label>Environmental</label>
          <div>true</div>
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
          <input
            type="text"
            onChange={onChange}
            name="company"
            placeholder="change company name..."
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default connect((state) => state, { setRiskOptions })(RiskSettingsSingle);

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

  a {
    display: inline-block;
    border: 1px solid #e0e0e0;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
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
