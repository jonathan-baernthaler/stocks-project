import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSpecificShare } from "../../state/selectors/portfolio";
import { Spinner } from "../core/Spinner";
import { BuyStock } from "./components/BuyStock";
import { SearchBar } from "./components/SearchBar";
import { SellStock } from "./components/SellStock";
import { Chart } from "./components/Chart";
import { Profile } from "./components/Profile";
import { Financials } from "./components/Financials";

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 70px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Search = styled(SearchBar)`
  margin-bottom: 50px;
`;

export const StockDetails = () => {
  const [stockData, setStockData] = useState<any>();
  const [chartPeriod, setChartPeriod] = useState<number>(5);
  const { ticker } = useParams();
  const sharesHeld = useSpecificShare(ticker);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          `https://fmpcloud.io/api/v3/company/profile/${ticker}?apikey=${process.env.REACT_APP_FMP_TOKEN}`,
          `https://fmpcloud.io/api/v3/quote/${ticker}?apikey=${process.env.REACT_APP_FMP_TOKEN}`,
          `https://fmpcloud.io/api/v3//historical-price-full/${ticker}?timeseries=${chartPeriod}&apikey=${process.env.REACT_APP_FMP_TOKEN}`
        ];

        const results = await Promise.all(
          urls.map(async url => {
            let response = await fetch(url);
            return response.json();
          })
        );

        setStockData({
          companyProfile: results[0].profile,
          realTimeQuote: results[1][0],
          chartData: results[2].historical.reverse()
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [chartPeriod, ticker]);

  if (!stockData) {
    return <Spinner />;
  }

  const { companyProfile, realTimeQuote, chartData } = stockData;

  return (
    <>
      <Header>
        <Search size={300} />
      </Header>
      <Content>
        <Profile companyProfile={companyProfile} />
        <Chart
          chartData={chartData}
          chartPeriod={chartPeriod}
          setChartPeriod={setChartPeriod}
        />
        <Financials realTimeQuote={realTimeQuote} />
      </Content>
      <Footer>
        {sharesHeld && (
          <SellStock sharesHeld={sharesHeld} price={companyProfile.price} />
        )}
        <BuyStock price={companyProfile.price} symbol={ticker!} />
      </Footer>
    </>
  );
};
