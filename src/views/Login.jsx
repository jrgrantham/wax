import React from "react";
import styled from "styled-components";

export default function Login(props) {
  return (
    <Container>
      <div className="contents">
        <h4>
          Risk Assessments R Us
        </h4>
        <input type="text" placeholder='email address' />
        <input type="password"  placeholder='password' />
        <button onClick={() => props.history.push('/')}>Login</button>
        <p>
          send me my password
        </p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  height: 100vh;
  h4 {
    margin-bottom: 20px
  }
  p {
    font-size: 0.8rem;
    color: grey;
    margin-top: 20px;
  }
  ::placeholder {
    color: grey;
  }
  input {
    font-size: 0.8rem;
    padding: 10px;
  }
  button {
    font-size: 0.8rem;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  .contents {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 250px;
    /* border: 1px solid red */
    
  }
`;
