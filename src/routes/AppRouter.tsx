import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Sidebar } from "../modules/sidebar/SideBar";
import { Dashboard } from "../modules/portfolio/Dashboard";
import { StockDetails } from "../modules/stocks/StockDetails";
import styled from "styled-components";
import { NotFound } from "./NotFound";
import { StockSearch } from "../modules/stocks/StockSearch";

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
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
