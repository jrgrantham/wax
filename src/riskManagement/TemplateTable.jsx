import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import TemplateRisk from "./components/TemplateRisk";

function RiskTable(props) {
  const selected = props.projectRisks.selected;
  const templateRisks =
    props.adminSettings.riskTemplate[selected.toLowerCase()];
  const type = props.projectRisks.selected.toLowerCase();
  const usedRisks = props.projectRisks[selected.toLowerCase()];

  const aiRisks = templateRisks.filter((risk) => risk.ai === true);
  const dltRisks = templateRisks.filter((risk) => risk.dlt === true);
  const manRisks = templateRisks.filter((risk) => risk.man === true);
  const combinedRisks = [aiRisks, dltRisks, manRisks];

  // merge arrays and remove duplicates
  function mergedRisks(arrays) {
    // create single array
    let combined = [];
    arrays.forEach((array) => {
      combined = [...combined, ...array];
    });
    const unique = combined.reduce((newArray, item) => {
      if (newArray.includes(item)) {
        return newArray;
      } else {
        return [...newArray, item];
      }
    }, []);
    return unique;
  }

  const filterDescriptions = usedRisks.map((risk) => {
    return risk.description;
  });
  const remainingRisks = mergedRisks(combinedRisks).filter(
    (risk) => !filterDescriptions.includes(risk.description)
  );

  function check(targetId) {
    if (targetId === "templateContainer") {
      props.setShowTemplate(false);
    }
    return;
  }

  return (
    <Container
      id="templateContainer"
      onClick={(event) => check(event.target.id)}
    >
      <div className="templateContents">
        <h5>{props.projectRisks.selected} Risks</h5>
        <div className="title">
          <h6>Description</h6>
          <h6>Mitigation</h6>
        </div>
        <div className="templateRisks">
          {remainingRisks.map((risk, index) => (
            <TemplateRisk risk={risk} type={type} key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {})(RiskTable);

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
