import React, { useState } from "react";
import { connect } from "react-redux";
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
    } else {
      alert(
        "You cant add more risks as risk limit has been reached. \nDelete a risk to add new risks"
      );
    }
  }

  // console.log(riskApi + props.user.id);

  function addToProject() {
    if (riskLimit) {
      axiosWithAuth(token)
        .post(riskApi + props.user.id, emtpyRow)
        .then((res) => {
          console.log(res.data);
          props.replaceRisks(res.data);
        })
        .catch((error) => {
          console.log(error.message);
          // props.history.push("/login");
        })
        .finally(() => {
          setAddRow(false);
        });
    }
  }

  const [addRow, setAddRow] = useState(false);

  const emtpyRow = {
    // id: randomId,
    type,
    description: "",
    probability: 0,
    consequence: 0,
    risk: 0,
    owner: defaultOwner,
    mitigation: "",
    templateId: 0,
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
              <button
                className="button cancel"
                onClick={() => setAddRow(false)}
              >
                <p>Cancel</p>
              </button>
              <button
                className="button middle add"
                onClick={() => addToProject()}
              >
                <p>blank row</p>
              </button>
              {props.user.useTemplates ? (
                <button
                  className="button add"
                  onClick={() => {
                    setAddRow(false);
                    props.setShowTemplate(true);
                  }}
                >
                  <p>from template</p>
                </button>
              ) : null}
            </>
          ) : (
            <>
              {!riskLimit ? (
                <p className="maxRisks">Risk Limit Reached</p>
              ) : null}
              <button className="button" onClick={() => sortRisks()}>
                <p>Sort</p>
              </button>
              {/* {riskLimit ? ( */}
                <div className="image" onClick={() => checkMax()}>
                  <img src={addIcon} alt="add" />
                </div>
              {/* // ) : null} */}
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
    /* margin-top: -10px; */
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
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
  .middle {
    margin: 0 10px;
  }
  .cancel {
    background-color: IndianRed;
  }
  .add {
    background-color: darkseagreen;
  }
  .maxRisks {
    margin-right: 10px;
  }
`;
