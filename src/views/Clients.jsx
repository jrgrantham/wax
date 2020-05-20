import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import Header from "./clientComponents/CleintHeader";
import Client from "./clientComponents/Client";
import styled from "styled-components";
// import Options from "./clientComponents/TemplateOptions";
import addIcon from "../images/addIcon.png";
// import Menu from "./Menu";
import axiosWithAuth from "../authentication/axiosWithAuth";
import url from "../helpers/url";

const clientsApi = `${url()}api/users/clients`;
const token = localStorage.getItem("token");

function Clients(props) {
  // const selected = props.projectRisks.selected;
  // const templates = props.templates[selected.toLowerCase()];

  function getData() {
    axiosWithAuth(token)
      .get(clientsApi)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const [showMenu, setShowMenu] = useState(false);
  function location(event) {
    if (event.target.id === "menu" || event.target.id === "subMenu") {
      return;
    }
    setShowMenu(false);
  }

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <Container onClick={(event) => location(event)}>
      <div className="banner">
        <div className="createClient">
          <h6>Create new client</h6>
          <div className="image">
            <img src={addIcon} alt="add" />
          </div>
        </div>
      </div>
      <div className="clients">
        {props.clients.map((client, index) => (
          <Client client={client} key={index} />
        ))}
      </div>
      {/* <Options /> */}
    </Container>
  );
}

export default connect((state) => state, {})(Clients);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  align-items: center;
  /* min-height: 100vh; */
  background-color: #e5e5e5;
  padding: 0px 0 20px 0;
  border-radius: 10px;

  .banner {
    width: calc(100% - 40px);
    max-width: 1460px;
    display: flex;
    justify-content: center;
    position: fixed;
    margin: 125px 0px 0 0px;
    background-color: #e5e5e5;
    /* border: 1px solid red; */
    padding: 15px;
    border-radius: 10px;
  }

  .createClient {
    display: flex;
    align-items: center;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 5px 0px 5px 15px;
    &:hover {
      cursor: pointer;
    }
    .image {
      width: 40px;
      margin: 0px 10px 0px 10px;
      img {
        margin-top: 4px;
        max-width: 100%;
        height: auto;
      }
    }
  }

  /* border: 1px solid black; */
  .clients {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #e5e5e5;
    width: 100%;
    max-width: 1500px;
    margin-top: 215px;
    padding: 0px 15px 15px 15px;
    /* border-radius: 20px; */
    /* border: 1px solid red; */
  }
`;