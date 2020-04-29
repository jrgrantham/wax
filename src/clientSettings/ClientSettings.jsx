import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setProjectInfo } from "../state/actionCreators/riskActionCreators";

function ClientSettings(props) {
  const projectDetails = {
    company: props.projectRisks.company,
    nature: props.projectRisks.nature,
    type: props.projectRisks.type,
    project: props.projectRisks.project,
    application: props.projectRisks.application,
  };

  const [projectForm, setProjectForm] = useState(projectDetails);

  // console.log(props.projectRisks.company);

  const nature = [
    "select nature...",
    "nature 1",
    "nature 2",
    "nature 3",
    "nature 4",
    "nature 5",
    "nature 6",
  ];

  const projectType = [
    "select project type...",
    "projectType 1",
    "projectType 2",
    "projectType 3",
    "projectType 4",
    "projectType 5",
  ];

  function onChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setProjectForm({ ...projectForm, [event.target.name]: event.target.value });
  }

  function onFormSubmit(event) {
    event.preventDefault()
    props.setProjectInfo(projectForm)
  }

  console.log(projectForm);

  return (
    <Container>
      <header>
        <h4>Client Settings</h4>
      </header>
      <Link to="risk-table">View Risk Table</Link>
      <Link to="risk-document">View Risk Document</Link>
      <form className="projectForm" onSubmit={onFormSubmit}>

        {/* company name */}
        <input
          type="text"
          onChange={onChange}
          name="company"
          placeholder='change company name...'
        />
        <label>{props.projectRisks.company}</label>
        <br />

        {/* nature */}
        <select
          // value={projectDetails.nature}
          type="text"
          onChange={onChange}
          name="nature"
          // placeholder={props.projectRisks.nature}
        >
          {nature.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <label>{props.projectRisks.nature}</label>
        <br />

        {/* type */}
        <select
          type="text"
          onChange={onChange}
          name="type"
        >
          {projectType.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <label>{props.projectRisks.type}</label>
        <br />

        {/* project */}
        <input
          type="text"
          onChange={onChange}
          name="project"
          placeholder='change project name...'
        />
        <label>{props.projectRisks.project}</label>
        <br />

        <input
          type="text"
          onChange={onChange}
          name="application"
          placeholder="optional"
        />
        <label>IUK Application Number</label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default connect((state) => state, { setProjectInfo })(ClientSettings);

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

  .projectForm {
    /* display: flex; */
    /* flex-direction: column; */
    padding: 10px;
  }
`;
