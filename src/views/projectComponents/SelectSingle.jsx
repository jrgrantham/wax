import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
// import { addToProject } from "../../state/actionCreators/riskActionCreators";
import addIcon from "../../images/addIcon.png";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";
import {
  replaceRisks,
} from "../../state/actionCreators/riskActionCreators";

const riskApi = `${url()}api/users/risks/`;
const token = localStorage.getItem("token");

function SelectTemplate(props) {
  const type = props.user.selected.toLowerCase();
  const template = props.template;
  const maxRisks = props.user[type.slice(0, 3) + "MaxRisks"];
  const riskCount = props.risks.entries.filter((risk) => risk.type === type)
    .length;
  const riskLimit = riskCount < maxRisks;

  function addRisk() {
    if (riskLimit) {
      const riskClone = {
        id: uuidv4(),
        type,
        description: template.description,
        probability: template.probability,
        consequence: template.consequence,
        owner: props.user[type.slice(0, 3) + "DefaultOwner"],
        mitigation: template.mitigation,
      };
      // props.addToProject(riskClone);
      axiosWithAuth(token)
        .post((riskApi + props.user.id), riskClone)
        .then((res) => {
          console.log(res.data);
          props.replaceRisks(res.data);
        })
        .catch((error) => {
          console.log(error.message);
          // props.history.push("/login");
        });
    }
  }

  const storedDescription = template.description
  const description = storedDescription.replace("[company name]", props.user.company)

  return (
    <Container>
      <div className="templateRisk">
        <p>{description}</p>
        <p>{template.mitigation}</p>
        <div className="icon" onClick={() => addRisk()}>
          <img src={addIcon} alt="delete" />
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  replaceRisks,
  // addToProject,
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
