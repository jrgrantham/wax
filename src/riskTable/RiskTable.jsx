import React from "react";
import styled from "styled-components";
import { data } from "./dummyData";

export default function RiskTable() {
  return (
    <Container>
      <header>
        <h4>Project [title] - [company]</h4>
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
        {data.map((type, index) => (
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
                  <div className={entry.liklihood + ' liklihood'}>
                    <p>{entry.liklihood}</p>
                  </div>
                  <div className={entry.severity + " severity"}>
                    <p>{entry.severity}</p>
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
      grid-template-columns: 200px 1fr;
      column-gap: 2px;
      /* margin-top: 5px; */
      width: 100%;
      .category {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .risks {
        padding: 20px;
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
