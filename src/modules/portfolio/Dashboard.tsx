import { Col, Row, Statistic, Table } from "antd";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CompanyProfile } from "../../api/schemas/profile";
import { Stock } from "../../state/reducers/portfolio";
import {
  useCurrentBalance,
  usePortfolio,
} from "../../state/selectors/portfolio";
import { SearchBar } from "../stocks/components/SearchBar";

const Body = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Stats = styled.div`
  width: 100%;
  display: flex;
  flex-direction: flex-start;
  margin-bottom: 50px;
`;
const Search = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

type portfolioQuote = {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: string;
};

const formatResults = (results: CompanyProfile[]) =>
  results.map(
    ({ symbol, profile: { companyName: name, price, changesPercentage } }) => ({
      symbol,
      name,
      price,
      changesPercentage,
    })
  );

const getQtty = (symbol: string, portfolio: Stock[]) => {
  const stock = portfolio.find((element) => element.symbol === symbol);
  return stock!.qtty;
};

export const Dashboard = () => {
  const [portfolioQuote, setPortfolioQuote] = useState<portfolioQuote[]>([]);
  const currentBalance = useCurrentBalance();
  const portfolio = usePortfolio();

  const urls = portfolio.map(
    (entry) =>
      `https://fmpcloud.io/api/v3/company/profile/${entry.symbol}?apikey=${process.env.REACT_APP_FMP_TOKEN}`
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!urls.length) {
        return setPortfolioQuote([]);
      }
      try {
        const results = await Promise.all(
          urls.map(async (url) => {
            let response = await fetch(url);
            return (response.json() as unknown) as CompanyProfile;
          })
        );
        setPortfolioQuote(formatResults(results));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = portfolioQuote.map((element, index: number) => ({
    key: index,
    symbol: element.symbol,
    name: element.name,
    qtty: getQtty(element.symbol, portfolio),
    price: element.price,
    change: element.changesPercentage,
  }));

  const portfolioValue = data.reduce(
    (acc, curr) => acc + curr.qtty * curr.price,
    0
  );

  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol: string) => (
        <Link to={`/stocks/${symbol}`}>{symbol}</Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qtty",
      dataIndex: "qtty",
      key: "qtty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => numeral(price).format("$0,0.00"),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (str: string) => {
        const num = (str.slice(1, -2) as unknown) as number;
        const color = num > 0 ? "green" : "red";
        return <span style={{ color }}>{`${num}%`}</span>;
      },
    },
  ];

  return (
    <Body>
      <Search>
        <SearchBar size={300} />
      </Search>
      <Stats>
        <Row gutter={50}>
          <Col span={50}>
            <Statistic
              title="Current Balance:"
              value={numeral(currentBalance).format("$0,0")}
            />
          </Col>
          <Col span={50}>
            <Statistic
              title="Portfolio Value:"
              value={numeral(portfolioValue).format("$0,0")}
            />
          </Col>
        </Row>
      </Stats>
      <Table dataSource={data} columns={columns} style={{ width: "100%" }} />
    </Body>
  );
};
