import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "../components/portfolio/Dashboard";
import { Stocks } from "../components/stocks/Stocks";
import { Sidebar } from "../components/sidebar/SideBar";
import styled from "styled-components";

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <MainLayout>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/stocks" component={Stocks} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};
