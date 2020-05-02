import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  updateProbability,
  updateConsequence,
  deleteRisk,
  sortByRisk,
  updateRisk,
} from "../state/actionCreators/riskActionCreators";
import removeIcon from "../images/removeIcon.png";
import { Container } from "./riskSingleStyle";

function RiskSingle(props) {
  const type = props.type.toLowerCase();
  const risk = props.risk;
  const riskRange = props.projectRisks.riskRange;

  function riskValue(value) {
    return riskRange[value];
  }

  const [checkDelete, setCheckDelete] = useState(false);

  function toggleDelete() {
    setCheckDelete(!checkDelete);
  }

  function confirmProbability() {
    props.updateProbability(
      type,
      risk.id,
      (risk.probability + 1) % riskRange.length
    );
  }

  function confirmConsequence() {
    props.updateConsequence(
      type,
      risk.id,
      (risk.consequence + 1) % riskRange.length
    );
  }

  function confirmDelete() {
    props.deleteRisk(type, risk.id);
    setCheckDelete(false);
  }

  function updateText(event) {
    props.updateRisk(type, risk.id, event.target.name, event.target.value);
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
  }, [sortByRisk(), deleteRisk()]);

  return (
    <Container>
      {checkDelete ? (
        <div className="checkDelete" style={{ height: height }}>
          <div className="delete button" onClick={() => confirmDelete()}>
            <h6>Delete</h6>
          </div>
          <div className="cancel button" onClick={() => toggleDelete()}>
            <h6>Cancel</h6>
          </div>
        </div>
      ) : (
        <div className="risk" style={{ height: height }}>
          <textarea
            id={`${type}description${risk.id}`}
            type="text"
            onChange={updateText}
            name="description"
            value={risk.description}
          />
          <div
            onClick={() => confirmProbability()}
            className={
              riskValue(risk.probability).toLowerCase() + " probability flag"
            }
          >
            <h6>{riskValue(risk.probability)}</h6>
          </div>
          <div
            onClick={() => confirmConsequence()}
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
            name="mitigation"
            value={risk.mitigation}
          />
          <input
            className={`${risk.owner.toLowerCase()} owner`}
            type="text"
            onChange={updateText}
            name="owner"
            value={risk.owner}
          />

          <div className="icon" onClick={() => toggleDelete()}>
            <img src={removeIcon} alt="delete" />
          </div>
        </div>
      )}
    </Container>
  );
}

export default connect((state) => state, {
  updateProbability,
  updateConsequence,
  deleteRisk,
  sortByRisk,
  updateRisk,
})(RiskSingle);
