import React from "react";
import { connect } from "react-redux";
import { toggleLiklihood } from '../state/actionCreators';
import styled from "styled-components";
import { riskData } from "./dummyData";

function RiskTable(props) {

  // console.log(props);
  console.log(riskData)
  console.log(props.projectRisks.risks[1].entries[1].liklihood);

  function riskValue(value) {
    return riskData.ranking[value]
  }

  return (
    <Container>
      <header>
        <h4>Project {props.projectRisks.project} - {props.projectRisks.company}</h4>
        <h4>Risk Management Table</h4>
      </header>
      <div className="tableContents">
        <div className="section">
          <div className="category">
            <h5>Type</h5>
          </div>
          <div className="risks">
            <div className="entry">
              <div className="description">
                <h5>Risk Description</h5>
              </div>
              <div className="liklihood">
                <h5>Liklihood
                </h5>
              </div>
              <div className="severity">
                <h5>Severity</h5>
              </div>
              <div className="owner">
                <h5>Owner</h5>
              </div>
              <div className="mitigation">
                <h5>Mitigation</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tableContents">
        {riskData.risks.map((type, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "section odd" : "section even"}
          >
            <div className={index % 2 === 0 ? "category odd" : "category even"}>
              <h5>{type.title}</h5>
            </div>
            <div className="risks">
              {type.entries.map((entry, index) => (
                <div
                  className={index % 2 === 0 ? "entry odd" : "entry even"}
                  key={index}
                >
                  <div className="description">
                    <p>{entry.description}</p>
                  </div>
                  <div className={riskValue(entry.liklihood).toLowerCase() + ' liklihood'}>

                    {console.log(riskValue(entry.liklihood))}

                    <p>{riskValue(entry.liklihood)}</p>
                  </div>
                  <div className={riskValue(entry.severity).toLowerCase() + " severity"}>
                    <p>{riskValue(entry.severity)}</p>
                  </div>
                  <div className="owner">
                    <p>{entry.owner}</p>
                  </div>
                  <div className="mitigation">
                    <p>{entry.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  p {
    padding: 0 10px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    height: 100%;
    text-align: center;
  }

  header {
    display: flex;
    justify-content: space-between;
    .description {
      text-align: left;
    }
  }

  .tableContents {
    flex-direction: column;
    .odd {
      background-color: #e8e8e8;
    }
    .even {
      background-color: #c8c8c8;
    }
    .section {
      display: grid;
      grid-template-columns: 170px 1fr;
      column-gap: 2px;
      /* margin-top: 5px; */
      width: 100%;
      .category {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .risks {
        padding: 20px 20px 20px 0px;
        display: grid;
        grid-template-columns: 1fr;
        /* row-gap: 10px; */
        .odd {
          background-color: #d3d3d3;
        }
        .even {
          background-color: #dcdcdc;
        }
        .entry {
          padding: 10px;
          /* background-color: #909090; */
          display: grid;
          grid-template-columns: 2fr 100px 100px 100px 1fr;
          /* border-radius: 10px; */
        }
        .description {
          justify-content: flex-start;
        }
        .liklihood {
          border-radius: 10px;
          margin-right: 5px;
        }
        .severity {
          border-radius: 10px;
          margin-left: 5px;
        }
        .high {
          background-color: rgba(250, 0, 0, 0.5);
        }
        .medium {
          background-color: rgba(250, 125, 0, 0.5);
        }
        .low {
          background-color: rgba(0, 125, 0, 0.5);
        }
        .owner {
        }
        .mitigation {
        }
      }
    }
  }
`;

export default connect(
  state => state
)(RiskTable);