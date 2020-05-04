import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
  sortByRisk,
  addToProject,
  updateRisk,
} from "../../state/actionCreators/projectActionCreators";
import addIcon from "../../images/addIcon.png";

function TemplateRisk(props) {
  const type = props.projectRisks.selected.toLowerCase();
  const risk = props.risk;

  function addToProject() {
    const riskClone = {
      id: uuidv4(),
      description: risk.description,
      probability: risk.probability,
      consequence: risk.consequence,
      owner: props.projectRisks.options[type].defaultOwner,
      mitigation: risk.mitigation,
    };
    props.addToProject(type, riskClone)
  }

  const [height, setHeight] = useState(50);
  function getMaxHeight() {
    try {
      const descHeight = document.getElementById(`${type}description${risk.id}`)
        .scrollHeight;
      const mitiHeight = document.getElementById(`${type}mitigation${risk.id}`)
        .scrollHeight;
      setHeight(Math.max(descHeight, mitiHeight));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMaxHeight();
  }, [props.projectRisks]);

  return (
    <Container>
      <div className="templateRisk">
        <textarea
          id={`${type}description${risk.id}`}
          type="text"
          name="description"
          value={risk.description}
        />
        <textarea
          id={`${type}mitigation${risk.id}`}
          type="text"
          name="mitigation"
          value={risk.mitigation}
          style={{ minHeight: height }}
        />
        <div className="icon" onClick={() => addToProject()}>
          <img src={addIcon} alt="delete" />
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  updateProbability,
  updateConsequence,
  deleteRisk,
  sortByRisk,
  updateRisk,
  addToProject
})(TemplateRisk);

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */

  .templateRisk {
    display: grid;
    grid-template-columns: 1fr 1fr 40px;
    column-gap: 5px;
    padding: 5px 5px 5px 15px;
    /* transition: background-color 0.3s; */
    &:hover {
      background-color: #c5c5c5;
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

    .icon {
      display: flex;
      align-items: center;
      opacity: 1;
      margin: auto;
      padding-right: 5px;
      width: 40px;
      height: 40px;
      transition: transform 0.3s;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;
