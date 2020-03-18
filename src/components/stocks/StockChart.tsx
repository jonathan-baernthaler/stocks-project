import React from "react";
import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";
import styled from "styled-components";
import moment from "moment";
import { Radio } from "antd";

const Body = styled.div`
  margin-left: 60px;
  margin-top: 50px;
  margin-right: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type Props = {
  chartData: Array<{
    date: string;
    close: number;
  }>;
  chartPeriod: number;
  setChartPeriod: React.Dispatch<React.SetStateAction<number>>;
};

export const StockChart: React.FC<Props> = ({
  chartData,
  chartPeriod,
  setChartPeriod
}) => {
  return (
    <Body>
      <Header>
        <Radio.Group
          value={chartPeriod}
          onChange={e => setChartPeriod(e.target.value)}
        >
          <Radio.Button value="5">5</Radio.Button>
          <Radio.Button value="15">15</Radio.Button>
          <Radio.Button value="30">30</Radio.Button>
        </Radio.Group>
      </Header>
      <LineChart width={500} height={250} data={chartData}>
        <XAxis
          dataKey="date"
          tickFormatter={date => moment(date).format("DD.MM")}
          tickLine={false}
        />
        <YAxis dataKey="close" tickLine={false} />
        <Tooltip />
        <Line type="linear" dataKey="close" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </Body>
  );
};
