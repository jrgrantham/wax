import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Swipeable } from "react-swipeable";
import styled from "styled-components";
import {
  updateTemplateProbability,
  updateTemplateConsequence,
  deleteTemplateRisk,
  replaceTemplateRisks,
  updateTemplateRisk,
  toggleTemplateTypes,
} from "../../state/actionCreators/templateActionCreators";
import removeIcon from "../../images/removeIcon.png";
import { projectOptions } from "../../data/projectOptions";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const templateApi = `${url()}api/users/templates`;
const token = localStorage.getItem("token");

function removeTemplate(id) {
  const riskId = { id };
  axiosWithAuth(token)
    .delete(templateApi, { data: riskId })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function TemplateSingle(props) {
  const type = props.user.selected.toLowerCase();
  const template = props.template;
  const riskRange = projectOptions.riskRange;
  const {high, medium, low} = projectOptions;

  function sendChanges() {
    console.log("sent");

    axiosWithAuth(token)
      .put(templateApi, template)
      .then(() => {}) // no action when changes are sent, only when requested
      .catch((error) => {
        console.log(error.message);
      });
  }

  function riskValue(value) {
    return riskRange[value];
  }

  const [checkDelete, setCheckDelete] = useState(false);
  function toggleDelete() {
    setCheckDelete(!checkDelete);
  }

  function confirmProbability() {
    const probability = (template.probability + 1) % riskRange.length;
    const calculatedRisk = probability * template.consequence;
    props.updateTemplateProbability(template.id, probability);
    props.updateTemplateRisk(template.id, "risk", calculatedRisk);
  }

  // above here is checked

  function confirmConsequence() {
    const consequence = (template.consequence + 1) % riskRange.length;
    const calculatedRisk = consequence * template.probability;
    props.updateTemplateConsequence(template.id, consequence);
    props.updateTemplateRisk(template.id, "risk", calculatedRisk);
  }

  function confirmDelete() {
    props.deleteTemplateRisk(template.id);
    setCheckDelete(false);
    removeTemplate(template.id);
  }

  function updateText(event) {
    props.updateTemplateRisk(
      template.id,
      event.target.name,
      event.target.value
    );
  }

  function toggleType(projectType, id) {
    props.toggleTemplateTypes(projectType, id);
  }

  const [height, setHeight] = useState(50);
  function getMaxHeight() {
    try {
      const descHeight = document.getElementById(
        `${type}description${template.id}`
      ).scrollHeight;
      const mitiHeight = document.getElementById(
        `${type}mitigation${template.id}`
      ).scrollHeight;
      setHeight(Math.max(descHeight, mitiHeight));
    } catch (err) {
      console.log(err);
    }
  }

  function swipe(event) {
    if (event.dir === "Left") {
      toggleDelete();
    }
  }

  useEffect(() => {
    getMaxHeight();
    sendChanges();
  }, [
    props.replaceTemplateRisks,
    confirmConsequence,
    confirmProbability,
    toggleType,
  ]);

  return (
    <Container high={high} medium={medium} low={low} >
      {checkDelete ? (
        <div className="checkDelete" style={{ minHeight: height }}>
          <div className="cancel button" onClick={() => toggleDelete()}>
            <h6>Cancel</h6>
          </div>
          <div className="delete button" onClick={() => confirmDelete()}>
            <h6>Delete</h6>
          </div>
        </div>
      ) : (
        <Swipeable
          className="risk"
          onSwiped={(event) => {
            swipe(event);
          }}
        >
          <textarea
            id={`${type}description${template.id}`}
            type="text"
            onChange={updateText}
            onBlur={sendChanges}
            name="description"
            value={template.description}
          />
          <button
            onClick={() => confirmProbability()}
            className={
              riskValue(template.probability).toLowerCase() +
              " probability flag"
            }
          >
            <h6>{riskValue(template.probability)}</h6>
          </button>
          <button
            onClick={() => confirmConsequence()}
            className={
              riskValue(template.consequence).toLowerCase() +
              " consequence flag"
            }
          >
            <h6>{riskValue(template.consequence)}</h6>
          </button>
          <textarea
            id={`${type}mitigation${template.id}`}
            type="text"
            onChange={updateText}
            onBlur={sendChanges}
            name="mitigation"
            value={template.mitigation}
            style={{ minHeight: height }}
          />

          <button
            onClick={() => toggleType("ai", template.id)}
            className="flag tbc"
            style={template.ai ? { backgroundColor: "darkseagreen" } : null}
          >
            <h6>{template.ai ? "Yes" : "No"}</h6>
          </button>
          <button
            onClick={() => toggleType("dlt", template.id)}
            className="flag tbc"
            style={template.dlt ? { backgroundColor: "darkseagreen" } : null}
          >
            <h6>{template.dlt ? "Yes" : "No"}</h6>
          </button>
          <button
            onClick={() => toggleType("man", template.id)}
            className="flag tbc"
            style={template.man ? { backgroundColor: "darkseagreen" } : null}
          >
            <h6>{template.man ? "Yes" : "No"}</h6>
          </button>
          <button
            onClick={() => toggleType("all", template.id)}
            className="flag tbc"
            style={template.all ? { backgroundColor: "darkseagreen" } : null}
          >
            <h6>{template.all ? "Yes" : "No"}</h6>
          </button>

          <div className="icon" onClick={() => toggleDelete()}>
            <img src={removeIcon} alt="delete" />
          </div>
        </Swipeable>
      )}
    </Container>
  );
}

export default connect((state) => state, {
  updateTemplateProbability,
  updateTemplateConsequence,
  deleteTemplateRisk,
  replaceTemplateRisks,
  updateTemplateRisk,
  toggleTemplateTypes,
})(TemplateSingle);

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  .checkDelete {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 10px;
    .button {
      /* border: 1px solid red; */
      height: 40px;
      border-radius: 5px;
      padding: 0.6rem 2rem;
      margin: auto 25px auto 0px;
      &:hover {
        cursor: pointer;
      }
    }
    .cancel {
      background-color: darkseagreen;
      color: white;
    }
    .delete {
      background-color: IndianRed;
      color: white;
    }
  }

  .risk {
    display: grid;
    grid-template-columns: 1fr 90px 90px 1fr 50px 50px 50px 50px 20px;
    column-gap: 5px;
    padding: 10px 0px 10px 25px;
    /* transition: background-color 0.3s; */
    &:hover {
      background-color: lightblue;
    }
    &:hover > .icon {
      opacity: 1;
    }
    textarea,
    input {
      border: none;
      resize: none;
      padding: 10px 5px;
      overflow: auto;
      /* Hide scrollbar for IE and Edge */
      -ms-overflow-style: none;
      /* Hide scrollbar for Chrome, Safari and Opera */
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .description {
      justify-content: flex-start;
      align-items: center;
      margin-right: 20px;
    }
    .flag {
      /* margin: 5px; */
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      min-height: 50px;
      height: 100%;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
    .probability {
      /* margin-right: 5px; */
    }
    .consequence {
      /* margin-left: 5px; */
    }
    .high {
      background-color: ${props => props.high};
    }
    .medium {
      background-color: ${props => props.medium};
    }
    .low {
      background-color: ${props => props.low};
    }
    /* .owner {
      text-align: center;
      background-color: rgba(180, 180, 180, 1);
    } */
    .tbc {
      border: 1px solid black;
      background-color: #e0e0e0;
    }
    .addRisk {
      width: 100%;
      justify-content: flex-end;
      padding: 10px;
      img {
        border-radius: 50%;
        width: 25px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    /* .even {
      background-color: #f0f0f0;
    }
    .odd {
      background-color: #e0e0e0;
    } */
    .mitigation {
      padding-left: 10px;
    }
    .icon {
      display: flex;
      opacity: 0;
      margin: auto;
      padding-right: 5px;
      border-radius: 50%;
      width: 28px;
      height: auto;
      transition: transform 0.3s;
      margin-left: -5px;
      &:hover {
        cursor: pointer;
        transform: scale(1.5);
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;
