import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import RiskType from "./RiskType";
import { Link } from "react-router-dom";
import menu from '../images/menu.png'

function RiskTable(props) {

  return (
    <Container>
      <div className="fixed">
        <header>
          <h4>
            Project {props.projectRisks.project} - {props.projectRisks.company}
          </h4>
          {/* <Link to="risk-document">View as Document</Link> */}
          <div className='right'>
            <h4>Risk Management Table</h4>
            {/* <img src={menu} alt="menu"/> */}
          </div>
        </header>
        <div className="titles">
          <h6>Risk</h6>
          <h6>Likelihood</h6>
          <h6>Severity</h6>
          <h6>Mitigation</h6>
          <h6>Owner</h6>
        </div>
      </div>

      <div className='contents'>
        {props.projectRisks.options.managerial.display ? (
          <RiskType
            risks={props.projectRisks.managerial}
            type="Managerial"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}
  
        {props.projectRisks.options.technical.display ? (
          <RiskType
            risks={props.projectRisks.technical}
            type="Technical"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}
  
        {props.projectRisks.options.commercial.display ? (
          <RiskType
            risks={props.projectRisks.commercial}
            type="Commercial"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}
  
        {props.projectRisks.options.legal.display ? (
          <RiskType
            risks={props.projectRisks.legal}
            type="Legal"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}
  
        {props.projectRisks.options.environmental.display ? (
          <RiskType
            risks={props.projectRisks.environmental}
            type="Environmental"
            riskRange={props.projectRisks.riskRange}
          />
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  /* border: 1px solid red; */

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 0 10px;
    padding-top: 15px;

    .description {
      text-align: left;
    }
  }

  .right {
    display: flex;
    img {
      width: 30px;
      margin-left: 10px;
    }
  }


  .fixed {
    position: fixed;
    background-color: white;
    width: calc(100% - 40px);
    z-index: 1;
  }

  .titles {
    display: grid;
    grid-template-columns: 1fr 90px 90px 1fr 75px 30px;
    column-gap: 5px;
    margin: 20px 0 10px 66px;
    /* padding: 20px 0; */
    h6 {
      background-color: #f5f5f5;
      padding: 10px 0;
      border-radius: 5px;
    }
    /* h6:first-child {
      border-radius: 10px 0 0 10px;
    }
    h6:last-child {
      border-radius: 0 10px 10px 0;
    } */
  }

  .contents {
    margin-top: 125px;
  }

  a {
    display: inline-block;
    border: 1px solid #e0e0e0;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
  }
`;

export default connect((state) => state, {})(RiskTable);
