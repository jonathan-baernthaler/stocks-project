import React from "react";
import { Table } from "antd";
import numeral from "numeral";
import styled from "styled-components";

const Body = styled.div`
  flex: 1;
  padding-bottom: 40px;
`;

type Props = {
  realTimeQuote: {
    price: number;
    yearHigh: number;
    yearLow: number;
    eps: number;
    pe: number;
    marketCap: number;
    sharesOutstanding: number;
  };
};

export const Financials: React.FC<Props> = ({ realTimeQuote }) => {
  const data = [
    {
      key: "1",
      financials: "Price",
      value: numeral(realTimeQuote.price).format("$0,0.00")
    },
    {
      key: "2",
      financials: "Year High",
      value: numeral(realTimeQuote.yearHigh).format("$0,0.00")
    },
    {
      key: "3",
      financials: "Year Low",
      value: numeral(realTimeQuote.yearLow).format("$0,0.00")
    },
    {
      key: "4",
      financials: "Earnings per Share",
      value: numeral(realTimeQuote.eps).format("$0,0.00")
    },
    {
      key: "5",
      financials: "Price Earnings",
      value: numeral(realTimeQuote.pe).format("$0,0.00")
    },
    {
      key: "6",
      financials: "Market Capitalization",
      value: numeral(realTimeQuote.marketCap).format("$0,0.00")
    },
    {
      key: "7",
      financials: "Shares Outstanding",
      value: numeral(realTimeQuote.sharesOutstanding).format("0,0.0000")
    }
  ];

  const columns = [
    {
      dataIndex: "financials",
      key: "financials"
    },
    {
      dataIndex: "value",
      key: "value"
    }
  ];
  return (
    <Body>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={false}
      />
    </Body>
  );
};
