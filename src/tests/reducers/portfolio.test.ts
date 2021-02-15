import {
  portfolioReducer,
  portfolioDefaultState
} from "../../state/reducers/portfolio";
import {
  buyAAPL,
  sellSomeAAPL,
  AAPLinPortfolio,
  sellAllAAPL
} from "../fixtures/portfolio";

test("should setup default State", () => {
  expect(portfolioReducer(undefined, { type: "@@INIT" })).toEqual(
    portfolioDefaultState
  );
});

test("should buy 100 Stocks of AAPL", () => {
  expect(portfolioReducer(portfolioDefaultState, buyAAPL)).toEqual({
    currentBalance: 75000,
    portfolio: [
      {
        symbol: "AAPL",
        qtty: 100
      }
    ]
  });
});

test("correctly sell some of AAPL", () => {
  expect(portfolioReducer(AAPLinPortfolio, sellSomeAAPL)).toEqual({
    currentBalance: 125000,
    portfolio: [
      {
        symbol: "AAPL",
        qtty: 500
      }
    ]
  });
});

test("correctly sell all of AAPL", () => {
  expect(portfolioReducer(AAPLinPortfolio, sellAllAAPL)).toEqual({
    currentBalance: 250000,
    portfolio: []
  });
});
