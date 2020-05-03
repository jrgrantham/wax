import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  background-color: #f0f0f0;

  .buttons {
    display: flex;
    justify-content: space-between;
    .addRisk {
      margin-right: 25px;
      display: flex;
    }
    .button {
      background-color: rgba(0, 125, 0, 0.2);
      /* border: 1px solid black; */
      border-radius: 5px;
      padding: 0.3rem 0.8rem;
      display: flex;
      justify-content: flex-end;
      &:hover {
        cursor: pointer;
      }
    }
    .middle {
      margin: 0 10px;
    }
  }

  .type {
    justify-content: center;
    align-items: center;
    writing-mode: tb-rl;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    padding: 10px;
    /* white-space: nowrap; */
    /* width: 200px; */
    /* border: 1px solid red; */
    /* border: 1px solid red; */
    border-radius: 5px;
    margin: 0 10px;
    background-color: white;
  }
  .risks {
    width: 100%;
  }
`;
