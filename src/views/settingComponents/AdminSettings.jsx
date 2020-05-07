import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  toggleProjectBoolean,
  setProjectAdmin,
} from "../../state/actionCreators/projectActionCreators";

function ProjectSettings(props) {
  const flavours = props.adminSettings.flavour;
  const { flavour, appendixRef, maxCharacters } = props.projectRisks;
  const numbers = [100, 500, 1000, 2000];

  function toggle(event) {
    props.toggleProjectBoolean(event.target.id);
  }

  function onChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    props.setProjectAdmin({key, value});
  }

  return (
    <Container>
      <form className="projectForm">
        <h5>Admin</h5>

        {/* type */}
        <div className="info">
          <label>Project Type</label>
          <div className="buttons">
            <p
              id="ai"
              style={
                props.projectRisks.ai
                  ? { backgroundColor: "green" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              AI
            </p>
            <p
              id="dlt"
              style={
                props.projectRisks.dlt
                  ? { backgroundColor: "green" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              DLT
            </p>
            <p
              id="man"
              style={
                props.projectRisks.man
                  ? { backgroundColor: "green" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
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
            name="flavour"
            defaultValue={flavour}
          >
            {flavours.map((flavour, index) => {
              return (
                <option key={index} value={flavour}>
                  {flavour}
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
            name="appendixRef"
            value={appendixRef}
          />
        </div>

        {/* maxCharacters */}
        <div className="info">
          <label>Maximum Characters</label>
          <div className="width">
            <select
              type="number"
              onChange={onChange}
              // onBlur={{}}
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

        {/* useTemplate */}
        <div className="info">
          <label>Use Template Risks</label>
          <div className="buttons">
            <p
              id="useTemplate"
              style={
                props.projectRisks.useTemplate
                  ? { backgroundColor: "green" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              {props.projectRisks.useTemplate ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* exportSpreadsheet */}
        <div className="info">
          <label>Export to spreadsheet</label>
          <div className="buttons">
            <p
              id="exportSpreadsheet"
              style={
                props.projectRisks.exportSpreadsheet
                  ? { backgroundColor: "green" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              {props.projectRisks.exportSpreadsheet ? "Yes" : "No"}
            </p>
          </div>
        </div>

      </form>
    </Container>
  );
}

export default connect((state) => state, {
  toggleProjectBoolean,
  setProjectAdmin,
})(ProjectSettings);

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  padding: 20px;

  h5 {
    margin-bottom: 30px;
  }

  p {
    &:hover {
      cursor: pointer;
    }
  }
  label {
    margin: 5px;
    text-align: left;
  }
  input,
  select {
    width: 90px;
    /* max-width: 100px; */
    font-size: 14px;
    border: 1px solid lightgrey;
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
  .width {
    display: flex;
    justify-content: space-between;
    max-width: 300px;
    width: 100%;
    /* border: 1px solid red; */
    select {
      width: 90px;
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
