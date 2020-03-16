import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;
const Container = styled.div`
  width: 256px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 160px;
  border-radius: 4px;
`;

export const Footer = () => {
  const onClick = () => {
    console.log("click");
  };

  return (
    <Container>
      <Logo>{"<Logo/>"}</Logo>
      <StyledButton type="primary" onClick={onClick}>
        Logout
      </StyledButton>
    </Container>
  );
};
