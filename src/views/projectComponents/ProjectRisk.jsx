import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Swipeable } from "react-swipeable";
import styled from "styled-components";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
  updateRisk,
} from "../../state/actionCreators/riskActionCreators";
import removeIcon from "../../images/removeIcon.png";
import { projectOptions } from "../../data/projectOptions";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const riskApi = `${url()}api/users/risks`;
const token = localStorage.getItem("token");

function removeRisk(id) {
  const riskId = { id };
  console.log(riskId);
  
  axiosWithAuth(token)
    .delete(riskApi, { data: riskId })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function RiskSingle(props) {
  function sendChanges() {
    axiosWithAuth(token)
      .put(riskApi, risk)
      .then(() => {})  // no action when changes are sent, only when requested
      .catch((error) => {
        console.log(error.message);
      });
  }

  const type = props.user.selected.toLowerCase();
  const risk = props.risk;
  const riskRange = projectOptions.riskRange;
  const maxLength = props.user.maxCharacters;

  function riskValue(value) {
    return riskRange[value];
  }

  // show confirm delete option and delete functionality
  const [checkDelete, setCheckDelete] = useState(false);
  function toggleDelete() {
    setCheckDelete(!checkDelete);
  }
  function confirmDelete() {
    removeRisk(risk.id);
    props.deleteRisk(type, risk.id); // send back from server, remove this
    setCheckDelete(false);
  }
  function swipe(event) {
    if (event.dir === "Left") {
      toggleDelete();
    }
  }

  function confirmProbability() {
    const probability = (risk.probability + 1) % riskRange.length;
    const calculatedRisk = probability * risk.consequence;
    props.updateProbability(type, risk.id, probability);
    props.updateRisk(risk.id, "risk", calculatedRisk);
  }
  function confirmConsequence(risk) {
    const consequence = (risk.consequence + 1) % riskRange.length;
    const calculatedRisk = consequence * risk.probability;
    props.updateConsequence(type, risk.id, consequence); // remove type
    props.updateRisk(risk.id, "risk", calculatedRisk);
  }

  function updateText(event) {
    props.updateRisk(risk.id, event.target.name, event.target.value);
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
    sendChanges();
    return () => {
      // sendChanges(risk);
    };
  }, [props.risks, confirmConsequence, confirmProbability]);

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
            id={`${type}description${risk.id}`}
            type="text"
            onChange={updateText}
            onBlur={sendChanges}
            name="description"
            value={risk.description}
            maxLength={maxLength}
          />
          <div
            onClick={() => confirmProbability()}
            onBlur={sendChanges}
            className={
              riskValue(risk.probability).toLowerCase() + " probability flag"
            }
          >
            <h6>{riskValue(risk.probability)}</h6>
          </div>
          <div
            onClick={() => confirmConsequence(risk)}
            className={
              riskValue(risk.consequence).toLowerCase() + " consequence flag"
            }
          >
            <h6>{riskValue(risk.consequence)}</h6>
          </div>
          <textarea
            id={`${type}mitigation${risk.id}`}
            type="text"
            onChange={updateText}
            onBlur={sendChanges}
            name="mitigation"
            value={risk.mitigation}
            style={{ minHeight: height }}
            maxLength={maxLength}
          />
          <input
            className={`${risk.owner.toLowerCase()} owner`}
            type="text"
            onChange={updateText}
            onBlur={sendChanges}
            name="owner"
            value={risk.owner}
            style={{ minHeight: height }}
          />

          <div className="icon" onClick={() => toggleDelete()}>
            <img src={removeIcon} alt="delete" />
          </div>
        </Swipeable>
      )}
    </Container>
  );
}

export default connect((state) => state, {
  updateProbability,
  updateConsequence,
  deleteRisk,
  updateRisk,
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
    grid-template-columns: 1fr 90px 90px 1fr 75px 20px;
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
      /* font-family: "roboto"; */
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
