import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addToProject,
  sortByRisk,
} from "../../state/actionCreators/projectActionCreators";
import styled from "styled-components";
import addIcon from "../../images/addIcon.png";

function Options(props) {
  const type = props.projectRisks.selected.toLowerCase();
  const defaultOwner =
    props.projectRisks.options[type.toLowerCase()].defaultOwner;

  const [addRow, setAddRow] = useState(false);

  const randomId = uuidv4();
  const emtpyRow = {
    id: randomId,
    description: "enter risk description.",
    probability: 0,
    consequence: 0,
    owner: defaultOwner,
    mitigation: "enter risk mitigation.",
  };
  function addToProject() {
    setAddRow(false);
    props.addToProject(type.toLowerCase(), emtpyRow);
  }

  function calculateRisk() {
    const calculatedRisks = props.projectRisks[type.toLowerCase()].map(
      (entry) => {
        const value = entry.probability * entry.consequence;
        return { ...entry, risk: value };
      }
    );
    return calculatedRisks;
  }

  function sortRisks() {
    const sortedRisks = calculateRisk().sort(function (a, b) {
      return b.risk - a.risk;
    });
    props.sortByRisk(type.toLowerCase(), sortedRisks);
  }

  return (
    <Container>
      <div className="left"></div>
      <div className="white">
        <div className="right">
          {addRow ? (
            <>
              <div className="button" onClick={() => setAddRow(false)}>
                <p>Cancel</p>
              </div>
              <div className="button middle" onClick={() => addToProject()}>
                <p>Add new row</p>
              </div>
              <div
                className="button"
                onClick={() => props.setShowTemplate(true)}
              >
                <p>Add from template</p>
              </div>
            </>
          ) : (
            <>
              <div className="button" onClick={() => sortRisks()}>
                <p>Sort and update</p>
              </div>
              <div className="image" onClick={() => setAddRow(true)}>
                <img src={addIcon} alt="add" />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  addToProject,
  sortByRisk,
})(Options);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1500px;
  border-radius: 0px 0px 20px 0px;
  background-color: #e5e5e5;
  .left {
    background-color: white;
    border-radius: 0px 20px 0px 0px;
    flex-grow: 1;
  }
  .white {
    background-color: white;
  }
  .right {
    margin-top: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px 10px 25px;
    background-color: #e5e5e5;
    border-radius: 0px 0px 20px 20px;
  }
  .image {
    margin-left: 10px;
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .button {
    background-color: #c5c5c5;
    border-radius: 5px;
    padding: 0.3rem 0.8rem;
    &:hover {
      cursor: pointer;
    }
  }
  .middle {
    margin: 0 10px;
  }
`;
