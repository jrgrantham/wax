import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import addIcon from "../../images/addIcon.png";
import { replaceRisks, addRisk } from "../../state/actionCreators/riskActionCreators";

function SelectTemplate(props) {
  const type = props.user.selected.toLowerCase();
  const template = props.template;
  const maxRisks = props.user[type.slice(0, 3) + "MaxRisks"];
  const riskCount = props.risks.entries.filter((risk) => risk.type === type)
    .length;
  const notRiskLimit = riskCount < maxRisks;

  const description = template.description
    .replace("[company name]", props.user.company)
    .replace("[output nature]", props.user.nature)
    .replace("[IPMethod]", props.user.ipMethod);

  const mitigation = template.mitigation
    .replace("[company name]", props.user.company)
    .replace("[output nature]", props.user.nature)
    .replace("[ip method]", props.user.ipMethod);

  const riskClone = {
    templateId: template.id,
    type,
    description: description,
    probability: template.probability,
    consequence: template.consequence,
    owner: props.user[type.slice(0, 3) + "DefaultOwner"],
    mitigation: mitigation,
  };

  function addRisk() {
    if (notRiskLimit) {
      props.addRisk(riskClone);
    }
  }

  return (
    <Container>
      <div className="templateRisk">
        <p>{description}</p>
        <p>{mitigation}</p>
        <div className="icon" onClick={() => addRisk()}>
          <img src={addIcon} alt="delete" />
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  replaceRisks,
  addRisk,
})(SelectTemplate);

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
