import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { StockProfile } from "./StockProfile";
import styled from "styled-components";
import { StockSearch } from "./StockSearch";
import { StockChart } from "./StockChart";
import { StockRatios } from "./StockRatios";
import { BuyStock } from "./BuyStock";
import { Spinner } from "../base-ui/Spinner";
import { useDispatch } from "react-redux";
import { buyStock, sellStock } from "../../state/actions/portfolio";
import { SellStock } from "./SellStock";
import { useStockInPortfolio } from "../../state/selectors/portfolio";

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

const SearchBar = styled(StockSearch)`
  margin-bottom: 50px;
`;

const ContentHeader = StockProfile;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const StockDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stockDetails, setStockDetails] = useState<any>();
  const [chartPeriod, setChartPeriod] = useState<number>(5);
  const { ticker } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const stockInPortfolio = useStockInPortfolio(ticker);

  useEffect(() => {
    const baseUrl = "https://fmpcloud.io/api/v3";
    const apiKey = `apikey=${process.env.REACT_APP_FMP_TOKEN}`;

    let fetchCompanyProfile = fetch(
      `${baseUrl}/company/profile/${ticker}?${apiKey}`
    );
    let fetchRealTimeQuote = fetch(`${baseUrl}/quote/${ticker}?${apiKey}`);
    let fetchChartData = fetch(
      `${baseUrl}/historical-price-full/${ticker}?timeseries=${chartPeriod}&${apiKey}`
    );

    Promise.all([fetchCompanyProfile, fetchRealTimeQuote, fetchChartData])
      .then(files => Promise.all(files.map(files => files.json())))
      .then(data => {
        setStockDetails({
          companyProfile: data[0].profile,
          realTimeQuote: data[1][0],
          chartData: data[2].historical.reverse()
        });
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [chartPeriod, ticker]);

  if (isLoading) {
    return <Spinner />;
  }

  const onBuy = (amount: number) => {
    dispatch(
      buyStock({
        symbol: ticker!,
        price: companyProfile.price,
        qtty: amount
      })
    );
    history.push("/");
  };

  const onSell = (amount: number) => {
    dispatch(
      sellStock({
        symbol: ticker!,
        price: companyProfile.price,
        qtty: amount
      })
    );
    history.push("/");
  };

  const { companyProfile, realTimeQuote, chartData } = stockDetails;

  return (
    <Body>
      <Header>
        <SearchBar size={300} />
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
          {stockInPortfolio && (
            <SellStock onClick={onSell} holdStock={stockInPortfolio?.qtty} />
          )}
          <BuyStock onClick={onBuy} price={companyProfile.price} />
        </ContentFooter>
      </>
    </Body>
  );
};
