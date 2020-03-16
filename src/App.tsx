import React, { useEffect } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { AppRouter } from "./routes/AppRouter";

const Body = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

// const iexRequest = (endpoint: string) => {
//   const baseUrl = "https://cloud.iexapis.com/stable";
//   const token = process.env.REACT_APP_IEX_TOKEN;
//   return `${baseUrl}/${endpoint}?token=${token}`;
// };

function App() {
  // useEffect(() => {
  //   fetch(iexRequest("stock/AAPL/quote"))
  //     .then(response => {
  //       if (response.ok) return response.json();
  //     })
  //     .then(data => console.log(data));
  // }, []);

  return (
    <Body>
      <AppRouter />
    </Body>
  );
}

export default App;
