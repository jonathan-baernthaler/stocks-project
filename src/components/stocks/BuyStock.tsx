import React, { useState } from "react";
import styled from "styled-components";
import { InputNumber, Button } from "antd";
import { useCurrentBalance } from "../../state/selectors/portfolio";
import { useDispatch } from "react-redux";
import { buyStock } from "../../state/actions/portfolio";
import { useHistory } from "react-router-dom";

const StyledInput = styled(InputNumber)``;

type Props = {
  symbol: string;
  price: number;
};

export const BuyStock: React.FC<Props> = ({ price, symbol }) => {
  const [qtty, setQtty] = useState<number>(0);
  const currentBalance = useCurrentBalance();
  const history = useHistory();
  const dispatch = useDispatch();

  const onChange = (value: number | undefined) => setQtty(value ?? 0);

  const onClick = () => {
    dispatch(buyStock({ symbol, price, qtty }));
    history.push("/");
  };

  return (
    <div style={{ marginRight: 100 }}>
      <StyledInput
        min={0}
        max={Math.floor(currentBalance / price)}
        defaultValue={qtty}
        onChange={onChange}
      />
      <Button type="primary" onClick={onClick}>
        Buy
      </Button>
    </div>
  );
};
