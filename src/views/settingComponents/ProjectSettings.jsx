import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setProjectInfo } from "../../state/actionCreators/projectActionCreators";
import { globalSettings } from "../../data/globalSettings";

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
        <div className="info">
          <label>Company Name:</label>
          <input
            type="text"
            onChange={onChange}
            onBlur={() => submit()}
            name="company"
            placeholder={props.projectRisks.company}
          />
        </div>

        {/* nature */}
        <div className="info">
          <label>Project Nature:</label>
          <select
            type="text"
            onChange={onChange}
            onBlur={() => submit()}
            name="nature"
            defaultValue={props.projectRisks.nature}
          >
            {nature.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* type */}
        <div className="info">
          <label>Project Type:</label>
          <select
            type="text"
            onChange={onChange}
            onBlur={() => submit()}
            name="type"
            defaultValue={props.projectRisks.type}
          >
            {projectType.map((option, index) => {
              return (
                <option key={index} value={option} >
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* project */}
        <div className="info">
          <label>Project Name: </label>
          <input
            type="text"
            onChange={onChange}
            onBlur={() => submit()}
            name="project"
            placeholder={props.projectRisks.project}
          />
        </div>

        <div className="info">
          <label>IUK Application Number: </label>
          <input
            type="text"
            onChange={onChange}
            onBlur={() => submit()}
            name="application"
            placeholder={props.projectRisks.application}
          />
        </div>
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
    margin-bottom: 30px;
  }

  label {
    margin: 5px;
    width: 250px;
    /* border: 1px solid red; */
    text-align: left;
  }

  .projectForm {
    /* border: 1px solid red; */
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: #f0f0f0;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 5px;
    }

    input,
    select {
      width: 100%;
      max-width: 300px;
      font-size: 14px;
      border: 1px solid lightgrey;
    }
  }
`;
