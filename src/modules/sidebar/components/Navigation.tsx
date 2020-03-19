import React from "react";
import { Menu } from "antd";
import { PieChartOutlined, StockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <Menu style={{ width: 256 }} mode="inline">
      <Menu.Item key="dashboard">
        <PieChartOutlined />
        <NavLink to="/">Portfolio</NavLink>
      </Menu.Item>
      <Menu.Item key="stocks">
        <StockOutlined />
        <NavLink to="/stocks">Stocks</NavLink>
      </Menu.Item>
    </Menu>
  );
};
