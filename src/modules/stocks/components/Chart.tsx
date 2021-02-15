import React from "react";
import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";
import styled from "styled-components";
import moment from "moment";
import { Radio } from "antd";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 60px;
  flex: 1;
`;

type Props = {
  chartData: Array<{
    date: string;
    close: number;
  }>;
  chartPeriod: number;
  setChartPeriod: React.Dispatch<React.SetStateAction<number>>;
};

export const Chart: React.FC<Props> = ({
  chartData,
  chartPeriod,
  setChartPeriod
}) => {
  return (
    <Body>
      <Radio.Group
        value={chartPeriod}
        onChange={e => setChartPeriod(e.target.value)}
      >
        <Radio.Button value="5">5</Radio.Button>
        <Radio.Button value="15">15</Radio.Button>
        <Radio.Button value="30">30</Radio.Button>
      </Radio.Group>
      <LineChart width={500} height={250} data={chartData} margin={{ top: 10 }}>
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
