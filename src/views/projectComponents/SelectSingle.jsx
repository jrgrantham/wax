import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
  replaceRisks,
  addToProject,
  updateRisk,
} from "../../state/actionCreators/riskActionCreators";
import addIcon from "../../images/addIcon.png";

function TemplateRisk(props) {
  const type = props.projectRisks.selected.toLowerCase();
  const risk = props.risk;
  const maxRisks = props.projectRisks.options[type].maxRisks;
  const usedRisks = props.projectRisks[type].length;
  const notRiskLimit = usedRisks < maxRisks;

  function addToProject() {
    if (notRiskLimit) {
      const riskClone = {
        id: uuidv4(),
        description: risk.description,
        probability: risk.probability,
        consequence: risk.consequence,
        owner: props.projectRisks.options[type].defaultOwner,
        mitigation: risk.mitigation,
      };
      props.addToProject(type, riskClone);
    }
  }

  return (
    <Container>
      <div className="templateRisk">
        <p>{risk.description}</p>
        <p>{risk.mitigation}</p>
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
  replaceRisks,
  updateRisk,
  addToProject,
})(TemplateRisk);

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */

  .templateRisk {
    display: grid;
    grid-template-columns: 1fr 1fr 40px;
    column-gap: 5px;
    padding: 5px 5px 5px 15px;
    &:hover {
      background-color: blueviolet;
    }
    p {
      background-color: white;
      border-radius: 5px;
      border: none;
      resize: none;
      padding: 10px 5px;
    }

    .icon {
      display: flex;
      align-items: center;
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
