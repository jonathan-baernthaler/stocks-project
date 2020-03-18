import React, { useState } from "react";
import styled from "styled-components";
import { InputNumber, Button } from "antd";
import { useCurrentBalance } from "../../state/selectors/portfolio";

const StyledInput = styled(InputNumber)``;

type Props = {
  price: number;
  onClick: (amount: number) => void;
};

export const BuyStock: React.FC<Props> = ({ onClick, price }) => {
  const [amount, setAmount] = useState<number>(0);
  const currentBalance = useCurrentBalance();

  const onChange = (value: number | undefined) => setAmount(value ?? 0);

  return (
    <div style={{ marginRight: 100 }}>
      <StyledInput
        min={1}
        max={Math.floor(currentBalance / price)}
        defaultValue={amount}
        onChange={onChange}
      />
      <Button type="primary" onClick={() => onClick(amount)}>
        Buy
      </Button>
    </div>
  );
};
