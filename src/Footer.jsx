import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <Container>
      <a href="https://jamesgrantham.me/"  target="_blank">developed by James Grantham</a>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  /* z-index: 10; */
  bottom: 0;
  background-color: black;
  width: 100%;
  padding: 5px 15px;
  opacity: 0.3;

  a {
    color: white;
    font-size: 0.8rem;
  }
`;
