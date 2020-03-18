import React, { useState } from "react";
import styled from "styled-components";
import { InputNumber, Button, Typography } from "antd";

const StyledInput = styled(InputNumber)``;

const Body = styled.div`
  display: flex;
`;

type Props = {
  onClick: (amount: number) => void;
  holdStock: number;
};

export const SellStock: React.FC<Props> = ({ onClick, holdStock }) => {
  const [amount, setAmount] = useState<number>(0);
  const onChange = (value: number | undefined) => setAmount(value ?? 0);
  return (
    <Body>
      <StyledInput
        min={1}
        max={holdStock}
        defaultValue={amount}
        onChange={onChange}
      />
      <Typography.Text>{`of ${holdStock}`}</Typography.Text>
      <Button type="primary" onClick={() => onClick(amount)}>
        Sell
      </Button>
    </Body>
  );
};
