import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import styled from "styled-components";
import { OptionsType } from "rc-select/lib/interface";
import { useHistory } from "react-router-dom";

const StyledSearch = styled(AutoComplete)`
  width: 600px;
`;

const getOptions = (
  data: Array<{ symbol: string; name: string }>
): OptionsType =>
  data.map(entry => ({
    value: entry.symbol,
    label: `${entry.symbol} - ${entry.name}`
  }));

export const StockSearch = () => {
  const [ticker, setTicker] = useState<string>("");
  const [options, setOptions] = useState<OptionsType>([]);
  const history = useHistory();

  useEffect(() => {
    if (!!ticker) {
      const baseUrl = "https://fmpcloud.io/api/v3/search";
      const query = `?query=${ticker}&limit=3&exchange=NASDAQ`;
      const apiKey = `&apikey=${process.env.REACT_APP_FMP_TOKEN}`;
      const url = `${baseUrl}${query}${apiKey}`;

      fetch(url)
        .then(res => res.json())
        .then(data => setOptions(getOptions(data)));
    }
  }, [setOptions, ticker]);

  return (
    <StyledSearch
      options={options}
      onChange={(ticker: string) => setTicker(ticker)}
      onSelect={ticker => history.push(`/stocks/${ticker}`)}
    >
      <Input.Search placeholder="enter a ticker symbol to get the current stock quotes"></Input.Search>
    </StyledSearch>
  );
};
