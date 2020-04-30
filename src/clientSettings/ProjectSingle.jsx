import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setProjectInfo } from "../state/actionCreators/riskActionCreators";

function ProjectSettings(props) {
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
    setProjectForm({ ...projectForm, [event.target.name]: event.target.value });
  }

  function submit() {
    props.setProjectInfo(projectForm)
  }

  return (
    <Container>
      <form className="projectForm">
        {/* company name */}
        <input
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
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
        <label>{props.projectRisks.nature}</label>
        <br />

        {/* type */}
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
        <label>{props.projectRisks.type}</label>
        <br />

        {/* project */}
        <input
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
          name="project"
          placeholder='change project name...'
        />
        <label>{props.projectRisks.project}</label>
        <br />

        <input
          type="text"
          onChange={onChange}
          onBlur={() => submit()}
          name="application"
          placeholder="optional"
        />
        <label>IUK Application Number</label>
        <br />
      </form>
    </Container>
  );
}

export default connect((state) => state, { setProjectInfo })(ProjectSettings);

const Container = styled.div`

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
