import React from "react";
import html2pdf from "html2pdf.js";
import { connect } from "react-redux";
import styled from "styled-components";
import PrintRisks from "./printComponents/PrintRisks";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";
import { useEffect } from "react";
import { replaceTemplateRisks } from "../state/actionCreators/templateActionCreators";
import { replaceRisks } from "../state/actionCreators/riskActionCreators";
import { setUser } from "../state/actionCreators/userActionCreators";

const userApi = `${url()}api/users/user`;
const templateApi = `${url()}api/users/templates`;
const clientApi = `${url()}api/users/client/`;
const riskApi = `${url()}api/users/risks/`;
const token = localStorage.getItem("token");

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

  // console.log(managerial, commercial, legal, technical, environmental);

  function getData() {
    function sortRisks(array) {
      const sortedRisks = array.sort(function (a, b) {
        return b.risk - a.risk;
      });
      return sortedRisks;
    }

    axiosWithAuth(token)
      .get(userApi)
      .then((res) => {
        // check response, if user not admin, set user
        console.log("initial id:", res.data.id);
        if (!res.data.admin) {
          props.setUser(res.data);
          // if user is admin, fetch the user by selected id
        } else {
          props.setUser(res.data);
          const selectedUser = localStorage.getItem("selectedClientId");
          // if no user in storage, skip.
          if (selectedUser) {
            const api = clientApi + selectedUser;
            console.log(api);
            axiosWithAuth(token)
              .get(clientApi + selectedUser)
              .then((res) => {
                console.log(res.data);
                props.setUser(res.data);
              })
              .catch((error) => {
                console.log(error.message);
              });
          }
        }
        let user = "";
        // if admin, get by user from local storage
        if (res.data.admin) {
          user = localStorage.getItem("selectedClientId");
          // otherwise, get by user info
        } else {
          user = res.data.id;
        }
        console.log(riskApi + user);
        axiosWithAuth(token)
          .get(riskApi + user)
          .then((res) => {
            console.log(res.data);
            props.replaceRisks(sortRisks(res.data));
          })
          .catch((error) => {
            console.log(error.message);
            // props.history.push("/login");
          });
        if (res.data.useTemplates) {
          axiosWithAuth(token)
            .get(templateApi)
            .then((res) => {
              props.replaceTemplateRisks(res.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        // window.location.replace(`${url()}login`)
        // props.history.push("/login");
      })
      .finally();
  }

  function generatePDF() {
    // setTimeout(function () {
    // window.print();
    const element = document.getElementById("pdf");
    const options = {
      margin: 0,
      filename: "Risk Table",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
    props.history.push("/");
    // }, 500);
  }

  useEffect(() => {
    // getData();
    generatePDF();
    // return () => {};
  }, []);

  // window.onload = function() { window.print(); }

  return (
    <Container id="pdf" fontSize={props.user.fontSize}>
      <div className="contents">
        {/* <Link to="/">Risk Table</Link> */}
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
