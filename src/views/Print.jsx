import React from "react";
import html2pdf from "html2pdf.js";
import { connect } from "react-redux";
import styled from "styled-components";
import PrintRisks from "./printComponents/PrintRisks";
import { useEffect } from "react";
import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";
import { replaceRisks } from "../state/actionCreators/riskActionCreators";
import { setUser } from "../state/actionCreators/userActionCreators"

function Print(props) {
  const managerial = props.risks.entries.filter(
    (risk) => risk.type === "managerial"
  );
  const commercial = props.risks.entries.filter(
    (risk) => risk.type === "commercial"
  );
  const legal = props.risks.entries.filter((risk) => risk.type === "legal");
  const environmental = props.risks.entries.filter(
    (risk) => risk.type === "environmental"
  );
  const technical = props.risks.entries.filter(
    (risk) => risk.type === "technical"
  );

  function generatePDF() {
    const element = document.getElementById("pdf");
    const {project, application, appendixRef} = props.user
    const filename = `${project} - ${application} - Appendix ${appendixRef}, Risk Management`;

    const options = {
      margin: 0,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
    setTimeout(() => {
      props.history.push("/");
    }, 5000);
  }

  useEffect(() => {
    setTimeout(() => {
      generatePDF();
    }, 1000);
    return () => {};
  }, []);

  return (
    <Container id="pdf" fontSize={props.user.fontSize}>
      <div className="contents">
        <header>
          <h6>
            {props.user.project} - {props.user.company}
          </h6>
          <h6>Appendix {props.user.appendixRef} Risk Management Table</h6>
        </header>
        <div className="tableHeader">
          <div className="type"></div>
          <div className="titles">
            <div className="description">
              <p>Description</p>
            </div>
            <div className="liklihood">
              <p>Liklihood</p>
            </div>
            <div className="severity">
              <p>Severity</p>
            </div>
            <div className="owner">
              <p>Owner</p>
            </div>
            <div className="mitigation">
              <p>Mitigation</p>
            </div>
          </div>
        </div>

        {props.user.manDisplay && managerial.length ? (
          <PrintRisks
            docRisks={managerial}
            type="Managerial"
            color={props.user.manColor}
          />
        ) : null}

        {props.user.tecDisplay && technical.length ? (
          <PrintRisks
            docRisks={technical}
            type="Technical"
            color={props.user.tecColor}
          />
        ) : null}

        {props.user.comDisplay && commercial.length ? (
          <PrintRisks
            docRisks={commercial}
            type="Commercial"
            color={props.user.comColor}
          />
        ) : null}

        {props.user.legDisplay && legal.length ? (
          <PrintRisks
            docRisks={legal}
            type="Legal"
            color={props.user.legColor}
          />
        ) : null}

        {props.user.envDisplay && environmental.length ? (
          <PrintRisks
            docRisks={environmental}
            type="Environmental"
            color={props.user.envColor}
          />
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;

  h6 {
    font-size: 9pt;
  }

  .tableHeader {
    padding-bottom: 5px;
    p {
      font-size: 8pt;
      text-align: center;
      font-weight: bold;
    }
    .type {
      width: 27px;
    }
    display: flex;
    .titles {
      display: flex;
      width: 100%;
      .description {
        width: 35%;
      }
      .liklihood {
        padding-right: 2px;
        display: flex;
        justify-content: flex-end;
        width: 6%;
      }
      .severity {
        padding-left: 2px;
        display: flex;
        justify-content: flex-start;
        text-align: left;
        width: 6%;
      }
      .owner {
        min-width: 6%;
      }
      .mitigation {
        width: 47%;
      }
    }
  }

  .contents {
    padding: 5px 10px;
    width: 100%;
    max-width: 800px;
    background-color: white;
  }

  a {
    display: inline-block;
    color: lightgray;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0.6rem 1.6rem;
    margin-bottom: 20px;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

export default connect((state) => state, {
  setUser,
  replaceTemplateRisks,
  replaceRisks,
})(Print);
