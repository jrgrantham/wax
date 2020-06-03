import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addToTemplate,
  replaceTemplateRisks,
} from "../../state/actionCreators/templateActionCreators";
import styled from "styled-components";
import addIcon from "../../images/addIcon.png";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const templateApi = `${url()}api/users/templates`;
const token = localStorage.getItem("token");

function Options(props) {
  const type = props.user.selected.toLowerCase();

  const randomId = uuidv4();
  const emtpyRow = {
    id: randomId,
    type,
    description: "enter risk description.",
    probability: 0,
    consequence: 0,
    risk: 0,
    mitigation: "enter risk mitigation.",
  };

  function sendTemplate() {
    axiosWithAuth(token)
      .post(templateApi, emtpyRow)
      .then((res) => {
        console.log(res.data);
        props.replaceTemplateRisks(res.data);
      })
      .catch((error) => {
        console.log(error.message);
        // props.history.push("/login");
      });
  }

  // function addToTemplate() {
  //   props.addToTemplate(emtpyRow);
  // }

  function calculateRisk() {
    const calculatedRisks = props.templates.entries.map((entry) => {
      const value = entry.probability * entry.consequence;
      return { ...entry, risk: value };
    });
    return calculatedRisks;
  }

  function sortRisks() {
    const sortedRisks = calculateRisk().sort(function (a, b) {
      return b.risk - a.risk;
    });
    props.replaceTemplateRisks(sortedRisks);
  }



  return (
    <Container>
      <div className="left"></div>
      <div className="white">
        <div className="right">
          <>
            <div className="button" onClick={() => sortRisks()}>
              <p>Sort</p>
            </div>
            <div className="image" onClick={() => sendTemplate()}>
              <img src={addIcon} alt="add" />
            </div>
          </>
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, {
  addToTemplate,
  replaceTemplateRisks,
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
