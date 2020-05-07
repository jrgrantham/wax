import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setProjectInfo } from "../../state/actionCreators/projectActionCreators";
import { projectOptions } from "../../data/globalSettings";

function ProjectSettings(props) {
  const { company, nature, type, project, application } = props.projectRisks;

  const natureOptions = projectOptions.nature;
  const projectTypes = projectOptions.type;

  function onChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    props.setProjectInfo({ key, value });
  }

  return (
    <Container>
      <form className="projectForm">
        <h5>Project</h5>

        {/* company name */}
        <div className="info">
          <label>Company Name:</label>
          <input
            type="text"
            onChange={onChange}
            // onBlur={() => submit()}
            name="company"
            value={company}
          />
        </div>

        {/* nature */}
        <div className="info">
          <label>Project Nature:</label>
          <select
            type="text"
            onChange={onChange}
            // onBlur={() => submit()}
            name="nature"
            defaultValue={nature}
          >
            {natureOptions.map((option, index) => {
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
            // onBlur={() => submit()}
            name="type"
            defaultValue={type}
          >
            {projectTypes.map((option, index) => {
              return (
                <option key={index} value={option}>
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
            // onBlur={() => submit()}
            name="project"
            value={project}
          />
        </div>

        <div className="info">
          <label>IUK Application Number: </label>
          <input
            type="text"
            onChange={onChange}
            // onBlur={() => submit()}
            name="application"
            value={application}
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
