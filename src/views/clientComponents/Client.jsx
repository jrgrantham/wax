import React, { useState } from "react";
import { connect } from "react-redux";
import { Swipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import styled from "styled-components";
import removeIcon from "../../images/removeIcon.png";
import { deleteClient } from "../../state/actionCreators/clientActionCreators";
import axiosWithAuth from "../../authentication/axiosWithAuth";
import url from "../../helpers/url";

const clientApi = `${url()}api/users/client`;
const token = localStorage.getItem("token");

function Client(props) {
  const client = props.client;

  const [checkDelete, setCheckDelete] = useState(false);
  function toggleDelete() {
    setCheckDelete(!checkDelete);
  }

  function confirmDelete() {
    if (client.id === 0) return
    // console.log("deleted", client.id);
    const id = client.id;
    const clientId = { id: id };
    // console.log(clientId);

    axiosWithAuth(token)
      .delete(clientApi, { data: clientId })
      .then((res) => {
        console.log(res.data);
        props.deleteClient(clientId.id);
        localStorage.removeItem('selectedClientId')
      })
      .catch((error) => {
        console.log(error.message);
      });
    setCheckDelete(false);
  }

  function swipe(event) {
    if (event.dir === "Left") {
      toggleDelete();
    }
  }

  function setClient(id) {
    localStorage.setItem("selectedClientId", id);
  }

  return (
    <Container>
      {checkDelete ? (
        <div className="checkDelete">
          <div className="cancel button" onClick={() => toggleDelete()}>
            <h6>Cancel</h6>
          </div>
          <div className="delete button" onClick={() => confirmDelete()}>
            <h6>Delete</h6>
          </div>
        </div>
      ) : (
        <Swipeable
          className="client"
          onSwiped={(event) => {
            swipe(event);
          }}
        >
          <Link to="/" onClick={() => setClient(props.client.id)}>
            <div className="info">
              {/* <h4>{props.client.project}</h4> */}
              <h6>{props.client.company}</h6>
              <p>{props.client.email}</p>
              {/* <p>{props.client.id}</p> */}
            </div>
          </Link>
          {client.id >= 4 ? (
            <div className="delete" onClick={() => toggleDelete()}>
              <img src={removeIcon} alt="delete" />
            </div>
          ) : null}
        </Swipeable>
      )}
    </Container>
  );
}

export default connect((state) => state, {deleteClient})(Client);

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 400px;
  border: 1px solid lightgray;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  min-height: 80px;

  .client {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    h4,
    h6 {
      text-align: left;
      margin: 5px 0;
    }
    a {
      width: calc(100% - 50px);
    }
    .info {
      /* border: 1px solid red; */
      width: 100%;
      margin-right: 10px;
    }
    .delete {
      transition: opacity 0.3s;
      opacity: 0;
      max-width: 30px;
      margin-right: 5px;
      img {
        width: 100%;
        transition: transform 0.3s;
        &:hover {
          cursor: pointer;
          transform: scale(1.3);
        }
      }
    }
    &:hover > .delete {
      opacity: 1;
    }
  }

  /* border: 1px solid red; */
  .checkDelete {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    .button {
      /* border: 1px solid red; */
      height: 40px;
      border-radius: 5px;
      padding: 0.6rem 2rem;
      &:hover {
        cursor: pointer;
      }
    }
    .cancel {
      background-color: darkseagreen;
      color: white;
    }
    .delete {
      background-color: indianred;
      color: white;
    }
  }
`;
