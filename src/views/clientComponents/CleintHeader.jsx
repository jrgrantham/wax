import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import menu from "../../images/menu.png";
import { setSelected } from "../../state/actionCreators/userActionCreators";
import addIcon from '../../images/addIcon.png'

function ClientHeader(props) {

    // function showMenu(e) {
    //   e.stopPropagation();
    //   props.setShowMenu(true);
    // }

  const selected = props.projectRisks.selected.toLowerCase();
  const color = props.projectRisks.options[selected].color;

  return (
    <Container color={color}>
      {/* <header>
        <div className="left">
          <h4>Client Management</h4>
        </div>
      </header> */}
      <div className="createClient">
        <h6>Create Client</h6>
        <div className="image">
          <img src={addIcon} alt="add"/>
        </div>
      </div>
    </Container>
  );
}

export default connect((state) => state, { setSelected })(ClientHeader);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  /* border: 1px solid black; */
  position: fixed;
  padding: 20px;
  background-color: #e5e5e5;
  width: calc(100% - 40px);
  max-width: 1500px;
  z-index: 1;

  /* header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  } */
  .createClient {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* width: 100%; */
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 5px 0px 5px 15px;
    .image {
      width: 40px;
      margin: 0px 10px 0px 10px;
      &:hover {
        cursor: pointer;
      }
      img {
        margin-top: 4px;
        max-width: 100%;
        height: auto;
      }
    }
  }
`;
