import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ScanMedicine from "./pages/ScanMedicine";
import GetStarted from "./pages/GetStarted";

const App: React.FC = props => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={GetStarted} />
        <Route path="/scan-medicine/" component={ScanMedicine} />
      </BrowserRouter>
    </div>
  );
};

export default App;
