import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Scanner from "./pages/Scanner";
import GetStarted from "./pages/GetStarted";
import { ScannerType } from "./pages/Scanner";

const PrescriptionScannerPage: React.FC = props => {
  return <Scanner scannerType={ScannerType.PRESCRIPTION} {...props} />;
};

const MedicineScannerPage: React.FC = props => {
  return <Scanner scannerType={ScannerType.MEDICINE} {...props} />;
};

const App: React.FC = props => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={GetStarted} />
        <Route path="/scan-prescription/" component={PrescriptionScannerPage} />
        <Route path="/scan-medicine/" component={MedicineScannerPage} />
      </BrowserRouter>
    </div>
  );
};

export default App;
