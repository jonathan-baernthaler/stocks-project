export const AAPLinPortfolio = {
  currentBalance: 0,
  portfolio: [
    {
      symbol: "AAPL",
      qtty: 1000
    }
  ]
};

export const buyAAPL = {
  type: "BUY_STOCK" as "BUY_STOCK",
  payload: {
    symbol: "AAPL",
    qtty: 100,
    price: 250
  }
};

export const sellSomeAAPL = {
  type: "SELL_STOCK" as "SELL_STOCK",
  payload: {
    symbol: "AAPL",
    qtty: 500,
    price: 250
  }
};

export const sellAllAAPL = {
  type: "SELL_STOCK" as "SELL_STOCK",
  payload: {
    symbol: "AAPL",
    qtty: 1000,
    price: 250
  }
};
