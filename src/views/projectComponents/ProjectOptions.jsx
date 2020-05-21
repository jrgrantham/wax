import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addToProject,
  replaceRisks,
} from "../../state/actionCreators/riskActionCreators";
import styled from "styled-components";
import addIcon from "../../images/addIcon.png";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const riskApi = `${url()}api/users/risks/`;
const token = localStorage.getItem("token");

function Options(props) {
  const type = props.user.selected.toLowerCase();
  const defaultOwner = props.user[type.slice(0, 3) + "DefaultOwner"];
  const maxRisks = props.user[type.slice(0, 3) + "MaxRisks"];
  const usedRisks = props.risks.entries.filter((risk) => risk.type === type)
    .length;
  const riskLimit = usedRisks < maxRisks;

  function checkMax() {
    if (riskLimit) {
      setAddRow(true);
    }
  }

  console.log(riskApi + props.user.id);

  function addToProject() {
    if (riskLimit) {
      axiosWithAuth(token)
        .post((riskApi + props.user.id), emtpyRow)
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

  const [addRow, setAddRow] = useState(false);

  const randomId = uuidv4();
  const emtpyRow = {
    // id: randomId,
    type,
    description: "enter risk description.",
    probability: 0,
    consequence: 0,
    risk: 0,
    owner: defaultOwner,
    mitigation: "enter risk mitigation.",
  };

  function calculateRisk() {
    const calculatedRisks = props.risks.entries.map((entry) => {
      const value = entry.probability * entry.consequence;
      return { ...entry, risk: value };
    });
    return calculatedRisks;
  }

  function sortRisks() {
    console.log("ran");
    const sortedRisks = calculateRisk().sort(function (a, b) {
      return b.risk - a.risk;
    });
    props.replaceRisks(sortedRisks);
  }

  // useEffect(() => {
  //   sortRisks();
  //   return () => {};
  // }, []);

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
                onClick={() => {
                  setAddRow(false);
                  props.setShowTemplate(true);
                }}
              >
                <p>Add from template</p>
              </div>
            </>
          ) : (
            <>
              <p className="maxRisks">Maximum Risks: {maxRisks} </p>
              <div className="button" onClick={() => sortRisks()}>
                <p>Sort and update</p>
              </div>
              <div className="image" onClick={() => checkMax()}>
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
  replaceRisks,
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
    border-radius: 50%;
    overflow: hidden;
    &:hover {
      cursor: pointer;
    }
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
  .maxRisks {
    margin-right: 10px;
  }
`;
