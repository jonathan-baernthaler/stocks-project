import { Stock, Action } from "../reducers/portfolio";

export type ActionInput = Stock & { price: number };

export const buyStock = ({ symbol, qtty, price }: ActionInput): Action => ({
  type: "BUY_STOCK",
  payload: {
    symbol,
    qtty,
    price
  }
});

export const sellStock = ({ symbol, qtty, price }: ActionInput): Action => ({
  type: "SELL_STOCK",
  payload: {
    symbol,
    qtty,
    price
  }
});
