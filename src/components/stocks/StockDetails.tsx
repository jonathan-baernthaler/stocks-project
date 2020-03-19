import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useShares } from "../../state/selectors/portfolio";
import { Spinner } from "../core/Spinner";
import { BuyStock } from "./BuyStock";
import { SearchBar } from "./SearchBar";
import { SellStock } from "./SellStock";
import { StockChart } from "./StockChart";
import { StockProfile } from "./StockProfile";
import { StockRatios } from "./StockRatios";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 70px;
  width: 100%;
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Search = styled(SearchBar)`
  margin-bottom: 50px;
`;

const ContentHeader = StockProfile;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const StockDetails = () => {
  const [stockData, setStockData] = useState<any>();
  const [chartPeriod, setChartPeriod] = useState<number>(5);
  const { ticker } = useParams();
  const sharesHeld = useShares(ticker);

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
    <Body>
      <Header>
        <Search size={300} />
      </Header>
      <>
        <ContentHeader companyProfile={companyProfile} />
        <Content>
          <StockChart
            chartData={chartData}
            chartPeriod={chartPeriod}
            setChartPeriod={setChartPeriod}
          />
          <StockRatios realTimeQuote={realTimeQuote} />
        </Content>
        <ContentFooter>
          {sharesHeld && (
            <SellStock sharesHeld={sharesHeld} price={companyProfile.price} />
          )}
          <BuyStock price={companyProfile.price} symbol={ticker!} />
        </ContentFooter>
      </>
    </Body>
  );
};
