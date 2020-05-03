import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;

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
    max-width: 1500px;
    z-index: 1;
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
    .titles {
      display: grid;
      grid-template-columns: 1fr 90px 90px 1fr 75px 20px;
      column-gap: 5px;
      margin: 20px 0 10px 66px;
      /* padding: 20px 0; */
      h6 {
        background-color: #f5f5f5;
        padding: 10px 0;
        border-radius: 5px;
      }
    }
  }
  .contents {
    margin-top: 125px;
    width: 100%;
    max-width: 1500px;
  }
`;