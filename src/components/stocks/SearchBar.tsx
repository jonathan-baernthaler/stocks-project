import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import { OptionsType } from "rc-select/lib/interface";
import { useHistory } from "react-router-dom";

const getOptions = (
  data: Array<{ symbol: string; name: string }>
): OptionsType =>
  data.map(entry => ({
    value: entry.symbol,
    label: `${entry.symbol} - ${entry.name}`
  }));

type Props = {
  size?: number;
};

export const SearchBar: React.FC<Props> = ({ size = 600 }) => {
  const [ticker, setTicker] = useState<string>("");
  const [options, setOptions] = useState<OptionsType>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://fmpcloud.io/api/v3/search/?query=${ticker}&limit=3&exchange=NASDAQ&apikey=${process.env.REACT_APP_FMP_TOKEN}`;
        const result = await fetch(url);
        const json = await result.json();
        setOptions(getOptions(json));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [ticker]);

  return (
    <AutoComplete
      options={options}
      onChange={(ticker: string) => setTicker(ticker)}
      onSelect={ticker => history.push(`/stocks/${ticker}`)}
      style={{ width: size }}
    >
      <Input.Search placeholder="enter a ticker symbol to get the current stock quotes"></Input.Search>
    </AutoComplete>
  );
};
