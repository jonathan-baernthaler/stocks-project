import { Button, InputNumber, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { sellStock } from "../../state/actions/portfolio";
import { Stock } from "../../state/reducers/portfolio";

const Body = styled.div`
  display: flex;
`;

const StyledInput = styled(InputNumber)``;

type Props = {
  sharesHeld: Stock;
  price: number;
};

export const SellStock: React.FC<Props> = ({ sharesHeld, price }) => {
  const [qtty, setQtty] = useState<number>(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (value: number | undefined) => setQtty(value ?? 0);

  const onClick = () => {
    dispatch(
      sellStock({
        symbol: sharesHeld.symbol,
        price,
        qtty
      })
    );
    history.push("/");
  };

  return (
    <Body>
      <StyledInput
        min={0}
        max={sharesHeld.qtty}
        defaultValue={qtty}
        onChange={onChange}
      />
      <Typography.Text>{`of ${sharesHeld.qtty}`}</Typography.Text>
      <Button type="primary" onClick={onClick}>
        Sell
      </Button>
    </Body>
  );
};
