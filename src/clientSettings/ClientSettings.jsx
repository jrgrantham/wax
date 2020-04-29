import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

function ClientSettings(props) {
  const emptyProject = {
    company: "",
    nature: "",
    type: "",
    project: "",
    application: "",
  };

  const [projectForm, setProjectForm] = useState(emptyProject);

  console.log(props.projectRisks.company);

  const nature = ["nature 1", "nature 2", "nature 3", "nature 4", "nature 5"];

  const projectType = [
    "projectType 1",
    "projectType 2",
    "projectType 3",
    "projectType 4",
    "projectType 5",
  ];

  return (
    <Container>
      <header>
        <h4>Client Settings</h4>
      </header>
      <form>
        <input
          type="text"
          name="company"
          value=""
          placeholder={props.projectRisks.company}
        />
        <label>Company Name</label>
        <br />
        <select
          type="text"
          name="nature"
          placeholder={props.projectRisks.nature}
        >
          {nature.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <label>Product / Service Nature</label>
        <br />
        <select
          type="text"
          name="nature"
          placeholder={props.projectRisks.nature}
        >
          {projectType.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <label>Type of Project</label>
        <br />
        <input
          type="text"
          name="project"
          placeholder={props.projectRisks.project}
        />
        <label>Project Name</label>
        <br />
        <input
          type="text"
          name="application"
          placeholder={props.projectRisks.application}
        />
        <label>IUK Application Number</label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default connect((state) => state, {})(ClientSettings);

const Container = styled.div``;
