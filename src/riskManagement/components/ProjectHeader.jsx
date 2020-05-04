import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import menu from "../../images/menu.png";
import { setSelected } from "../../state/actionCreators/projectActionCreators";

function RiskTable(props) {
  function setSelected(type) {
    props.setSelected(type);
  }

  function showMenu(e) {
    e.stopPropagation();
    props.setShowMenu(true)
    console.log('clicked');
    
  }

  return (
    <Container>
      <header>
        <div className="left">
          <h4>Risk Management Table</h4>
          <p>
            Project {props.projectRisks.project} - {props.projectRisks.company}
          </p>
        </div>
        <div className="image" onClick={(e) => showMenu(e)}>
          <img src={menu} alt="menu" />
        </div>
      </header>
      <div className="types">
        <Type
          background={props.projectRisks.options.managerial.color}
          onClick={() => setSelected("managerial")}
        >
          <h6>Managerial</h6>
        </Type>
        <Type
          background={props.projectRisks.options.commercial.color}
          onClick={() => setSelected("commercial")}
        >
          <h6>Commercial</h6>
        </Type>
        <Type
          background={props.projectRisks.options.technical.color}
          onClick={() => setSelected("technical")}
        >
          <h6>Technical</h6>
        </Type>
        {props.projectRisks.options.environmental.display ? (
          <Type
            background={props.projectRisks.options.environmental.color}
            onClick={() => setSelected("environmental")}
          >
            <h6>Environmental</h6>
          </Type>
        ) : null}
        {props.projectRisks.options.legal.display ? (
          <Type
            background={props.projectRisks.options.legal.color}
            onClick={() => setSelected("legal")}
          >
            <h6>Legal</h6>
          </Type>
        ) : null}
      </div>
      <div className="titles">
        <h6>Description</h6>
        <h6>Likelihood</h6>
        <h6>Severity</h6>
        <h6>Mitigation</h6>
        <h6>Owner</h6>
      </div>
    </Container>
  );
}

export default connect((state) => state, { setSelected })(RiskTable);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
  position: fixed;
  background-color: white;
  width: calc(100% - 40px);
  max-width: 1500px;
  z-index: 1;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
    width: 100%;
    padding-top: 15px;
    .image {
      width: 30px;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
  .types {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid red; */
  }
  .titles {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 90px 90px 1fr 75px 20px;
    column-gap: 5px;
    padding: 5px 0 0px 25px;
    background-color: #e5e5e5;

    h6 {
      padding: 10px 0;
    }
  }
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  border-radius: 20px 20px 0px 0px;
  background-color: ${(props) => props.background};
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;
