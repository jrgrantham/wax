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

function RiskSingle(props) {
  const type = props.projectRisks.selected.toLowerCase();
  const template = props.template;
  const riskRange = props.projectRisks.riskRange;

  function riskValue(value) {
    return riskRange[value];
  }

  const [checkDelete, setCheckDelete] = useState(false);
  function toggleDelete() {
    setCheckDelete(!checkDelete);
  }

  function confirmProbability() {
    console.log("hi");
    props.updateTemplateProbability(
      type,
      template.id,
      (template.probability + 1) % riskRange.length
    );
  }

  // above here is checked

  function confirmConsequence() {
    props.updateTemplateConsequence(
      type,
      template.id,
      (template.consequence + 1) % riskRange.length
    );
  }

  function confirmDelete() {
    props.deleteTemplateRisk(type, template.id);
    setCheckDelete(false);
  }

  function updateText(event) {
    props.updateTemplateRisk(
      type,
      template.id,
      event.target.name,
      event.target.value
    );
  }

  function toggleType(projectType, id) {
    props.toggleTemplateTypes(type, projectType, id);
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
  }, [props.projectRisks]);

  return (
    <Container>
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
            name="description"
            value={template.description}
          />
          <div
            onClick={() => confirmProbability()}
            className={
              riskValue(template.probability).toLowerCase() +
              " probability flag"
            }
          >
            <h6>{riskValue(template.probability)}</h6>
          </div>
          <div
            onClick={() => confirmConsequence()}
            className={
              riskValue(template.consequence).toLowerCase() +
              " consequence flag"
            }
          >
            <h6>{riskValue(template.consequence)}</h6>
          </div>
          <textarea
            id={`${type}mitigation${template.id}`}
            type="text"
            onChange={updateText}
            name="mitigation"
            value={template.mitigation}
            style={{ minHeight: height }}
          />

          <div
            onClick={() => toggleType("ai", template.id)}
            className="flag tbc"
          >
            <h6>{template.ai ? "Yes" : "No"}</h6>
          </div>
          <div
            onClick={() => toggleType("dlt", template.id)}
            className="flag tbc"
          >
            <h6>{template.dlt ? "Yes" : "No"}</h6>
          </div>
          <div
            onClick={() => toggleType("man", template.id)}
            className="flag tbc"
          >
            <h6>{template.man ? "Yes" : "No"}</h6>
          </div>

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
})(RiskSingle);

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
      background-color: green;
      color: white;
    }
    .delete {
      background-color: red;
      color: white;
    }
  }

  .risk {
    display: grid;
    grid-template-columns: 1fr 90px 90px 1fr 50px 50px 50px 20px;
    column-gap: 5px;
    padding: 5px 0px 5px 25px;
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
      background-color: rgba(250, 0, 0, 1);
    }
    .medium {
      background-color: rgba(250, 125, 0, 1);
    }
    .low {
      background-color: rgba(0, 125, 0, 1);
    }
    .owner {
      text-align: center;
      background-color: rgba(180, 180, 180, 1);
    }
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
    .even {
      background-color: #f0f0f0;
    }
    .odd {
      background-color: #e0e0e0;
    }
    .mitigation {
      padding-left: 10px;
    }
    .icon {
      opacity: 0;
      margin: auto;
      padding-right: 5px;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transition: transform 0.3s;
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
