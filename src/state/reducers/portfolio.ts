export type Stock = {
  symbol: string;
  qtty: number;
};

export type ActionPayload = {
  symbol: string;
  price: number;
  qtty: number;
};

export type Action =
  | {
      type: "BUY_STOCK";
      payload: ActionPayload;
    }
  | {
      type: "SELL_STOCK";
      payload: ActionPayload;
    }
  | {
      type: "@@INIT";
    };

export const portfolioDefaultState = {
  currentBalance: 100000,
  portfolio: [] as Array<Stock>
};

export type State = typeof portfolioDefaultState;

const buyStock = (state: State, input: ActionPayload) => {
  const { symbol, price, qtty } = input;
  const { currentBalance, portfolio } = state;
  const newBalance = currentBalance - price * qtty;
  const i = portfolio.findIndex(element => element.symbol === symbol);
  if (i >= 0) {
    portfolio[i] = {
      ...portfolio[i],
      qtty: portfolio[i].qtty + qtty
    };
  } else {
    portfolio.push({ symbol, qtty });
  }
  return { ...state, currentBalance: newBalance };
};

const sellStock = (state: State, input: ActionPayload) => {
  const { symbol, price, qtty } = input;
  const { currentBalance, portfolio } = state;
  const newBalance = currentBalance + price * qtty;
  const i = portfolio.findIndex((element: any) => element.symbol === symbol);
  if (portfolio[i].qtty > qtty) {
    portfolio[i] = {
      ...portfolio[i],
      qtty: portfolio[i].qtty - qtty
    };
  } else {
    portfolio.splice(i, 1);
  }
  return { ...state, currentBalance: newBalance };
};

export const portfolioReducer = (
  state = portfolioDefaultState,
  action: Action
) => {
  switch (action.type) {
    case "BUY_STOCK":
      return buyStock(state, action.payload);
    case "SELL_STOCK":
      return sellStock(state, action.payload);
    default:
      return state;
  }
};
