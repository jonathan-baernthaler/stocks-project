import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Sidebar } from "../components/sidebar/SideBar";
import { Dashboard } from "../components/portfolio/Dashboard";
import { StockSearch } from "../components/stocks/StockSearch";
import { StockDetails } from "../components/stocks/StockDetails";
import styled from "styled-components";
import { NotFound } from "./NotFound";

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 36px;
`;

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <MainLayout>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/stocks" component={StockSearch} exact />
          <Route path="/stocks/:ticker" component={StockDetails} exact></Route>
          <Route path="/" component={NotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};
