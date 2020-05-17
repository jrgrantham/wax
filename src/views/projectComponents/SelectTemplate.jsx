import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import removeIcon from "../../images/removeIcon.png";
import TemplateRisk from "./SelectSingle";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const templateApi = `${url()}api/users/templates`;
const token = localStorage.getItem("token");

function Templates(props) {
  function getTemplates() {
    axiosWithAuth(token)
      .get(templateApi)
      .then(res => {
        console.log(res.data.length);
        
      })
      .catch(error => {
        console.log(error.message);
        props.setShowTemplate(false)
      })
  }

  useEffect(() => {
    if (props.user.useTemplates) {
      getTemplates()
    }
  })

  const type = props.user.selected.toLowerCase();
  const templateRisks = props.templates.entries;
  const usedRisks = props.risks.entries;

  const aiRisks = templateRisks.filter((risk) => risk.ai === true);
  const dltRisks = templateRisks.filter((risk) => risk.dlt === true);
  const manRisks = templateRisks.filter((risk) => risk.man === true);

  // funtion to merge relevant arrays and remove duplicates
  function mergedRisks() {
    // create single array of required types
    let relevantRisks = [];
    if (props.user.ai) {
      relevantRisks = relevantRisks.concat(aiRisks);
    }
    if (props.user.dlt) {
      relevantRisks = relevantRisks.concat(dltRisks);
    }
    if (props.user.man) {
      relevantRisks = relevantRisks.concat(manRisks);
    }

    const unique = relevantRisks.reduce((newArray, item) => {
      if (newArray.includes(item)) {
        return newArray;
      } else {
        return [...newArray, item];
      }
    }, []);
    return unique;
  }

  // create an array of current descriptions to filter by
  const filterDescriptions = usedRisks.map((risk) => {
    return risk.description;
  });
  // remove the entries that are already used
  const remainingRisks = mergedRisks().filter(
    (risk) => !filterDescriptions.includes(risk.description)
  );

  function checkId(targetId) {
    if (targetId === "templateContainer") {
      props.setShowTemplate(false);
    }
    return;
  }

  // function closeTemplate() {
  //   if (props.user.options[type].maxRisks === props.user[type].length() ) {
  //     props.setShowTemplate(false);
  //   } 
  // }
  // closeTemplate()

  return (
    <Container
      id="templateContainer"
      onClick={(event) => checkId(event.target.id)}
    >
      <div className="templateContents">
        <h5>{props.user.selected} Risks</h5>
        <div className="close" onClick={() => props.setShowTemplate(false)} >
          <img src={removeIcon} alt="" />
        </div>
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

export default connect((state) => state, {})(Templates);

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
