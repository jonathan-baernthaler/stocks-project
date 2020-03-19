import React from "react";
import { Progress } from "antd";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledProgress = styled(Progress)`
  animation: ${rotate} 2s linear infinite;
`;

export const Spinner = () => (
  <Body>
    <StyledProgress type="circle" percent={70} format={() => null} width={50} />
  </Body>
);
