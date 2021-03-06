import { useSelector } from "react-redux";
import { State } from "../reducers/portfolio";

export const useSpecificShare = (ticker: string | undefined) => {
  return useSelector(({ portfolio }: State) =>
    portfolio.filter(element => element.symbol === ticker)
  )[0];
};

export const useCurrentBalance = () => {
  return useSelector((state: State) => state.currentBalance);
};

export const usePortfolio = () => {
  return useSelector((state: State) => state.portfolio);
};
