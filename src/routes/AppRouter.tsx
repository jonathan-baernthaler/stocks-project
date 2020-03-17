import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Sidebar } from "../components/sidebar/SideBar";
import { Dashboard } from "../components/portfolio/Dashboard";
import { StockSearch } from "../components/stocks/StockSearch";
import { StockDetails } from "../components/stocks/StockDetails";
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
          <Route path="/stocks" component={StockSearch} exact />
          <Route path="/stocks/:ticker" component={StockDetails}></Route>
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};
