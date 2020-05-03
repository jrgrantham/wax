import styled from "styled-components";
export const Container = styled.div`
  .checkDelete {
    display: flex;
    justify-content: flex-end;
    .button {
      /* border: 1px solid red; */
      height: 40px;
      border-radius: 5px;
      padding: 0.6rem 2rem;
      margin: auto 20px;
      &:hover {
        cursor: pointer;
      }
    }
    .cancel {
      background-color: green;
      color: white;
    }
    .delete {
      background-color: red;
      color: white;
    }
  }

  .risk {
    display: grid;
    grid-template-columns: 1fr 90px 90px 1fr 75px 20px;
    column-gap: 5px;
    margin-bottom: 10px;
    &:hover > .icon {
      opacity: 1;
    }
    textarea,
    input {
      border: none;
      resize: none;
      padding: 10px 5px;
      overflow: auto;
      /* Hide scrollbar for IE and Edge */
      -ms-overflow-style: none;
      /* Hide scrollbar for Chrome, Safari and Opera */
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .description {
      justify-content: flex-start;
      align-items: center;
      margin-right: 20px;
    }
    .flag {
      /* margin: 5px; */
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      min-height: 50px;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
    }
    .probability {
      /* margin-right: 5px; */
    }
    .consequence {
      /* margin-left: 5px; */
    }
    .high {
      background-color: rgba(250, 0, 0, 0.4);
    }
    .medium {
      background-color: rgba(250, 125, 0, 0.2);
    }
    .low {
      background-color: rgba(0, 125, 0, 0.1);
    }
    .owner {
      text-align: center;
      background-color: rgba(180, 180, 180, 0.4);
    }
    .tbc {
      border: 1px solid black;
      background-color: transparent;
    }
    .addRisk {
      width: 100%;
      justify-content: flex-end;
      padding: 10px;
      img {
        border-radius: 50%;
        width: 25px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .even {
      background-color: #f0f0f0;
    }
    .odd {
      background-color: #e0e0e0;
    }
    .mitigation {
      padding-left: 10px;
    }
    .icon {
      opacity: 0;
      margin: auto;
      padding-right: 5px;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transition: transform 0.3s;
      &:hover {
        cursor: pointer;
        transform: scale(1.5);
      }
      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;
