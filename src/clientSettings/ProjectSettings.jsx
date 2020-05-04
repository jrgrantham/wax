import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setProjectInfo } from "../state/actionCreators/projectActionCreators";
import { globalSettings } from "../data/globalSettings";

function ProjectSettings(props) {
  const projectDetails = {
    company: props.projectRisks.company,
    nature: props.projectRisks.nature,
    type: props.projectRisks.type,
    project: props.projectRisks.project,
    application: props.projectRisks.application,
  };

  const [projectForm, setProjectForm] = useState(projectDetails);
  const nature = globalSettings.project.nature;
  const projectType = globalSettings.project.type;

  function onChange(event) {
    setProjectForm({ ...projectForm, [event.target.name]: event.target.value });
  }

  function submit() {
    props.setProjectInfo(projectForm);
  }

  return (
    <Container>
      <form className="projectForm">
        <h5>Project Settings</h5>
        {/* company name */}
        <label>Company Name: {props.projectRisks.company}</label>
        <input
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
          name="company"
          placeholder="change company name..."
        />

        {/* nature */}
        <label>Project Nature: {props.projectRisks.nature}</label>
        <select
          // value={projectDetails.nature}
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
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

        {/* type */}
        <label>Project Type: {props.projectRisks.type}</label>
        <select
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
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

        {/* project */}
        <label>Project Name: {props.projectRisks.project}</label>
        <input
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
          name="project"
          placeholder="change project name..."
        />

        <label>IUK Application Number: {props.projectRisks.application}</label>
        <input
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
          name="application"
          placeholder="optional"
        />
        <br />
      </form>
    </Container>
  );
}

export default connect((state) => state, { setProjectInfo })(ProjectSettings);

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  padding: 20px;

  h5 {
    margin: 10px;
  }

  label {
    margin: 5px;
  }

  .projectForm {
    /* border: 1px solid red; */
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;

    input,
    select {
      width: 100%;
      max-width: 150px;
      font-size: 10px;
      border: 1px solid lightgrey;
      margin-bottom: 10px;
    }
  }
`;
