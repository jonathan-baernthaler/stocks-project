import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import styled from "styled-components";

const Container = styled.div`
  width: 256px;
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgb(240 240 240);
`;

const Wrapper = styled.div`
  width: 256px;
`;

export const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Header />
        <Navigation />
      </Wrapper>

      <Footer />
    </Container>
  );
};
