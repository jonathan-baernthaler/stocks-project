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

const StyledProgress = styled(Progress)`
  animation: ${rotate} 2s linear infinite;
`;

export const Spinner = () => (
  <StyledProgress type="circle" percent={70} format={() => null} width={50} />
);
