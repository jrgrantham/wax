import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import removeIcon from "../../images/removeIcon.png";
import TemplateRisk from "./SelectSingle";
import {
  replaceTemplateRisks,
  getTemplates,
} from "../../state/actionCreators/templateActionCreators";

function Templates(props) {
  const type = props.user.selected;
  const title = type.charAt(0).toUpperCase() + type.slice(1) + " Risks";

  // -------------------- SELECT THE CORRECT TEMPLATES IN THIS SECTION --------------------

  const originalTemplates = props.templates.entries;
  // filter all templates by risk type eg. managerial
  const templateSelected = originalTemplates.filter(
    (template) => template.type === type
  );

  let aiTemplates = [];
  let dltTemplates = [];
  let manTemplates = [];
  let allTemplates = [];

  if (process.env.NODE_ENV === "production") {
    aiTemplates = templateSelected.filter((template) => template.ai === true);
    dltTemplates = templateSelected.filter((template) => template.dlt === true);
    manTemplates = templateSelected.filter((template) => template.man === true);
    allTemplates = templateSelected.filter((template) => template.all === true);
  } else {
    aiTemplates = templateSelected.filter((template) => template.ai === 1);
    dltTemplates = templateSelected.filter((template) => template.dlt === 1);
    manTemplates = templateSelected.filter((template) => template.man === 1);
    allTemplates = templateSelected.filter((template) => template.all === 1);
  }

  // function to merge relevant arrays and remove duplicates
  function mergedRisks() {
    // create single array of required types
    let relevantTemplates = []; // --------- ensure this is not the problem in production 'boolean'
    if (props.user.ai) {
      relevantTemplates = relevantTemplates.concat(aiTemplates);
    }
    if (props.user.dlt) {
      relevantTemplates = relevantTemplates.concat(dltTemplates);
    }
    if (props.user.man) {
      relevantTemplates = relevantTemplates.concat(manTemplates);
    }
    relevantTemplates = relevantTemplates.concat(allTemplates);

    // remove duplicates
    const unique = relevantTemplates.reduce((newArray, item) => {
      if (newArray.includes(item)) {
        return newArray;
      } else {
        return [...newArray, item];
      }
    }, []);
    return unique;
  }

  // create an array of current descriptions to filter by
  const currentRisks = props.risks.entries;
  const filterDescriptions = currentRisks.map((risk) => {
    return risk.templateId;
  });
  console.log(filterDescriptions);

  // remove the entries that are already used
  const templates = mergedRisks().filter(
    (risk) => !filterDescriptions.includes(risk.id)
  );

  // -------------------- SELECT THE CORRECT TEMPLATES IN THIS SECTION --------------------

  // check where clicked to close the template window
  function checkId(targetId) {
    if (targetId === "templateContainer") {
      props.setShowTemplate(false);
    }
    return;
  }

  const maxRisks = props.user[type.slice(0, 3) + "MaxRisks"];
  const usedRisks = props.risks.entries.filter((risk) => risk.type === type)
    .length;
  const riskLimit = usedRisks < maxRisks;
  if (!riskLimit) {
    props.setShowTemplate(false);
  }

  useEffect(() => {
    // getTemplates();
    props.getTemplates();
  }, []);

  return (
    <Container
      id="templateContainer"
      onClick={(event) => checkId(event.target.id)}
    >
      <div className="templateContents">
        <h5>{title}</h5>
        {/* <h6>Maximum Risks Reached</h6> */}
        <div className="close" onClick={() => props.setShowTemplate(false)}>
          <img src={removeIcon} alt="" />
        </div>
        <div className="title">
          <h6>Description</h6>
          <h6>Mitigation</h6>
        </div>
        <div className="templateRisks">
          {templates.map((template, index) => (
            <TemplateRisk template={template} key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  replaceTemplateRisks,
  getTemplates,
})(Templates);

const Container = styled.div`
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  h5 {
    margin: 20px;
  }
  .templateContents {
    background-color: white;
    margin: 10vh auto;
    border: 10px solid black;
    border-radius: 15px;
    width: 80vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    .close {
      position: absolute;
      right: calc(10vw + 15px);
      top: calc(10vh + 15px);
      width: 30px;
      border-radius: 50%;
      &:hover {
        cursor: pointer;
      }
      img {
        width: 100%;
      }
    }
  }
  .title {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 40px;
    column-gap: 5px;
    padding: 5px 5px 5px 15px;
    text-align: left;
  }
  .templateRisks {
    background-color: #e5e5e5;
    padding: 5px 0px;
    width: 100%;
    max-width: 1500px;
    overflow: auto;
    /* Hide scrollbar for IE and Edge */
    -ms-overflow-style: none;
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
