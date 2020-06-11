import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  toggleProjectBoolean,
  setProjectValue,
} from "../../state/actionCreators/userActionCreators";
import { projectOptions } from "../../data/projectOptions";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const riskApi = `${url()}api/users/user`;
const token = localStorage.getItem("token");

function ProjectSettings(props) {
  const flavours = projectOptions.flavourOptions;
  const maxCharacterChoices = projectOptions.maxCharacterChoices;
  const fontSizeChoices = projectOptions.fontSizeChoices;
  const flavour = props.user.flavour;
  const appendixRef = props.user.appendixRef;
  const maxCharacters = props.user.maxCharacters;
  const fontSize = props.user.fontSize;

  function sendChanges(key, value) {
    let id = "";
    if (props.user.admin) {
      id = localStorage.getItem("selectedClientId");
    } else {
      id = props.user.id;
    }
    axiosWithAuth(token)
      .put(riskApi, { key, value, id })
      .then(() => {}) // no action when changes are sent, only when requested
      .catch((error) => {
        console.log(error.message);
      });
  }

  function toggle(event) {
    const key = event.target.id;
    const value = props.user[key];
    props.toggleProjectBoolean(key);
    sendChanges(key, !value);
  }

  function onChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    props.setProjectValue(key, value);
    sendChanges(key, value);
  }

  function selectAll() {
    // ai, dlt, man
    props.setProjectValue('ai', !props.user.ai);
    sendChanges('ai', !props.user.ai);
    props.setProjectValue('dlt', !props.user.ai);
    sendChanges('dlt', !props.user.ai);
    props.setProjectValue('man', !props.user.ai);
    sendChanges('man', !props.user.ai);
  }

  return (
    <Container>
      <form className="projectForm">
        <h5>Admin</h5>

        {/* useTemplate */}
        <div className="info">
          <label>Use Templates</label>
          <div className="buttons">
          <p
              id="useTemplates"
              style={
                props.user.useTemplates
                  ? { backgroundColor: "darkseagreen" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              {props.user.useTemplates ? "Yes" : "No"}
            </p>
            {props.user.useTemplates ? <p
              id="selectAll"
              // style={
              //   props.user.useTemplates
              //     ? { backgroundColor: "green" }
              //     : { backgroundColor: null }
              // }
              onClick={(e) => selectAll(e)}
            >
              Toggle all
            </p> : null}
          </div>
        </div>

        {/* type */}
        {props.user.useTemplates ?         <div className="info">
          <label>Templates Available</label>
          <div className="buttons">
            <p
              id="ai"
              style={
                props.user.ai
                  ? { backgroundColor: "darkseagreen" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              AI
            </p>
            <p
              id="dlt"
              style={
                props.user.dlt
                  ? { backgroundColor: "darkseagreen" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              DLT
            </p>
            <p
              id="man"
              style={
                props.user.man
                  ? { backgroundColor: "darkseagreen" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              MAN
            </p>
          </div>
        </div> : null}

        {/* flavour */}
        <div className="info">
          <label>Client Flavour</label>
          <select
            type="text"
            onChange={onChange}
            name="flavour"
            value={flavour}
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
              value={maxCharacters}
            >
              {maxCharacterChoices.map((number, index) => {
                return (
                  <option key={index} value={number}>
                    {number}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* fontsize */}
        <div className="info">
          <label>PDF font size</label>
          <div className="width">
            <select
              type="number"
              onChange={onChange}
              // onBlur={{}}
              name="fontSize"
              value={fontSize}
            >
              {fontSizeChoices.map((number, index) => {
                return (
                  <option key={index} value={number}>
                    {number}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* exportSpreadsheet */}
        <div className="info">
          <label>Export to spreadsheet</label>
          <div className="buttons">
            <p
              id="exportSpreadsheet"
              style={
                props.user.exportSpreadsheet
                  ? { backgroundColor: "darkseagreen" }
                  : { backgroundColor: null }
              }
              onClick={(e) => toggle(e)}
            >
              {props.user.exportSpreadsheet ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default connect((state) => state, {
  toggleProjectBoolean,
  setProjectValue,
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
    #selectAll {
      width: 65%;
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
