import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MaxRisks from "./MaxRisks";

function ProjectSettings(props) {
  const flavours = props.adminSettings.flavour;
  const {
    flavour,
    appendixRef,
    useTemplate,
    exportSpreadsheet,
    maxCharacters,
  } = props.projectRisks;
  const numbers = [100, 500, 1000, 2000];

  function toggle(event) {
    console.log(event.target.id);
  }

  // on chage make the changes in redux
  function onChange(event) {
    // [event.target.name]: event.target.value,
  }
  function submit() {
    // send admin settings;
  }

  return (
    <Container>
      <form className="projectForm">
        <h5>Admin</h5>

        {/* type */}
        <div className="info">
          <label>Project Type</label>
          <div className="buttons">
            <p id="ai" onClick={(e) => toggle(e)}>
              AI
            </p>
            <p id="dlt" onClick={(e) => toggle(e)}>
              DLT
            </p>
            <p id="man" onClick={(e) => toggle(e)}>
              MAN
            </p>
          </div>
        </div>

        {/* flavour */}
        <div className="info">
          <label>Client Flavour</label>
          <select
            type="text"
            onChange={onChange}
            onBlur={() => submit()}
            name="flavour"
            defaultValue={flavour}
          >
            {flavours.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>

        {/* appendixRef */}
        <div className="info">
          <label>Appendix Reference</label>
          <input
            type="text"
            onChange={onChange}
            onBlur={() => submit()}
            name="appendixRef"
            placeholder={appendixRef}
          />
        </div>

        {/* useTemplate */}
        <div className="info">
          <label>Use Template Risks</label>
          <div className="buttons">
            <p id="useTemplate" onClick={(e) => toggle(e)}>
              {useTemplate ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* export */}
        <div className="info">
          <label>Export to spreadsheet</label>
          <div className="buttons">
            <p id="export" onClick={(e) => toggle(e)}>
              {exportSpreadsheet ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* export */}
        <div className="info">
          <label>Maximum Characters</label>
          <div className="width">
            <select
              type="number"
              onChange={onChange}
              name="maxCharacters"
              defaultValue={maxCharacters}
            >
              {numbers.map((number, index) => {
                return (
                  <option key={index} value={number}>
                    {number}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* project */}
        <div className="maxRisks">
          <h6>Maximum number of Risks</h6>
          <div className="values">
            <MaxRisks type="Managerial" />
            <MaxRisks type="Technical" />
            <MaxRisks type="Commercial" />
            <MaxRisks type="Legal" />
            <MaxRisks type="Environmental" />
          </div>
        </div>
      </form>
    </Container>
  );
}

export default connect((state) => state, {})(ProjectSettings);

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  padding: 20px;

  h5 {
    margin-bottom: 30px;
  }

  p {
  }
  label {
    margin: 5px;
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
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 5px;
    input,
    select {
      width: 100%;
      max-width: 300px;
      font-size: 14px;
      border: 1px solid lightgrey;
    }
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;

    p {
      text-align: center;
      width: 30%;
      /* border: 1px solid red; */
      background-color: #d5d5d5;
      border-radius: 5px;
      padding: 2px;
    }
  }
  .maxRisks {
    /* border: 1px solid red; */
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;
    .values {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
      margin-top: 10px;
    }

    h6 {
      margin: 5px;
    }
  }
`;
