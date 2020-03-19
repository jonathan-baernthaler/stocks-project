import React from "react";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const StockSearch = () => (
  <Body>
    <SearchBar size={600} />
  </Body>
);
