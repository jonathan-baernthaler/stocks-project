import { Button, InputNumber, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { sellStock } from "../../../state/actions/portfolio";
import { Stock } from "../../../state/reducers/portfolio";

const Body = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const StyledInput = styled(InputNumber)`
  margin-right: 10px;
`;

const StyledText = styled(Typography.Text)`
  font-weight: bold;
  margin-right: 10px;
`;

type Props = {
  sharesHeld: Stock;
  price: number;
};

export const SellStock: React.FC<Props> = ({ sharesHeld, price }) => {
  const [qtty, setQtty] = useState<number>(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (value: string | number | undefined) =>
    //@ts-ignore
    setQtty(value ?? 0);

  const onClick = () => {
    dispatch(
      sellStock({
        symbol: sharesHeld.symbol,
        price,
        qtty,
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
      <StyledText>{`of ${sharesHeld.qtty}`}</StyledText>
      <Button type="primary" onClick={onClick}>
        Sell
      </Button>
    </Body>
  );
};
