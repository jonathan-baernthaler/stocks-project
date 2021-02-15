import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { AppRouter } from "./routes/AppRouter";
import { portfolioReducer } from "./state/reducers/portfolio";
import { composeWithDevTools } from "redux-devtools-extension";

const Body = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const store = createStore(portfolioReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <Body>
        <AppRouter />
      </Body>
    </Provider>
  );
}

export default App;
