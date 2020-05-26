import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

  console.log(managerial, commercial, legal, technical, environmental);

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
            props.history.push("/login");
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
        props.history.push("/login");
      })
      .finally();
  }

  function print() {
    setTimeout(function () {
      window.print();
      props.history.push("/");
    }, 500);
  }

  useEffect(() => {
    getData();
    // print();
    return () => {};
  }, []);

  // window.onload = function() { window.print(); }

  return (
    <Container>
      <div className="contents">
        {/* <Link to="/">Risk Table</Link> */}
        <header>
          <h6>
            {props.user.project} - {props.user.company}
          </h6>
          <h6>Risk Management Document</h6>
        </header>

        {props.user.manDisplay ? (
          <PrintRisks docRisks={managerial} type="Managerial" />
        ) : null}

        {props.user.tecDisplay ? (
          <PrintRisks docRisks={technical} type="Technical" />
        ) : null}

        {props.user.comDisplay ? (
          <PrintRisks docRisks={commercial} type="Commercial" />
        ) : null}

        {props.user.legDisplay ? (
          <PrintRisks docRisks={legal} type="Legal" />
        ) : null}

        {props.user.envDisplay ? (
          <PrintRisks docRisks={environmental} type="Environmental" />
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;

  @media print {
    a[href]:after {
      content: none !important;
    }
  }

  .contents {
    padding: 30px;
    width: 100%;
    max-width: 900px;
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
    margin-bottom: 20px;
  }
`;

export default connect((state) => state, {
  setUser,
  replaceTemplateRisks,
  replaceRisks,
})(Print);
