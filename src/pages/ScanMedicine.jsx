import React from "react";
import TestData from "../data/medicine/Atorvastatin-40mg";
import Layout from "../components/Layout";
import styled from "styled-components";

const Dynamsoft = window.Dynamsoft;

const ScannerContainer = styled.div`
  margin: 0 auto;
  align-items: center;
  background: pink;
`;

const ScanMedicineTitleContainer = styled.div`
  padding: 20px;
`;

const ScanMedicineTitle = styled.span`
  font-size: 1.8em;
  margin: 10px auto;
`;

class ScanMedicine extends React.Component {
  showScanner() {
    let scanner = null;
    Dynamsoft.BarcodeScanner.createInstance({
      UIElement: document.getElementById("scanner-container"),
      onFrameRead: results => {},
      onUnduplicatedRead: (txt, result) => {
        if (TestData.barcode === parseInt(txt)) {
          alert(`${TestData.name} is the right medicine! `);
        } else {
          alert("This medicine is incorrect, you nearly killed someone!");
        }
        //alert(`Chandni the barcode is ${txt}`);
      }
    }).then(s => {
      scanner = s;
      scanner.updateVideoSettings({
        video: { width: 720, height: 720, facingMode: "environment" }
      });

      let runtimeSettings = scanner.getRuntimeSettings();
      // Specify which symbologies are to enabled
      runtimeSettings.BarcodeFormatIds = Dynamsoft.EnumBarcodeFormat.TwoD;
      // By default, the library assumes accurate focus and good lighting. The settings below are for more complex environments. Check out according API descriptions for more info.
      runtimeSettings.localizationModes = [2, 0, 0, 0, 0, 0, 0, 0];
      runtimeSettings.deblurLevel = 0;
      // Discard results which have a low confidence score.
      // runtimeSettings.minResultConfidence = 1;

      runtimeSettings.region.measuredByPercentage = 1;
      runtimeSettings.region.left = 25;
      runtimeSettings.region.top = 25;
      runtimeSettings.region.right = 25;
      runtimeSettings.region.bottom = 25;

      scanner.updateRuntimeSettings(runtimeSettings);

      let scanSettings = scanner.getScanSettings();
      // Disregard duplicated results found in a specified time period
      scanSettings.duplicateForgetTime = 2000;
      // Set a interval so that the CPU can relax
      scanSettings.intervalTime = 2;
      scanner.setScanSettings(scanSettings);

      scanner.show().catch(ex => {
        console.log(ex);
        alert("ex.message || ex");
        scanner.hide();
      });
    });
  }
  render() {
    return (
      <Layout>
        <button
          onClick={() => {
            this.showScanner();
          }}
        >
          show scanner
        </button>
        <ScannerContainer id="scanner-container">
          <ScanMedicineTitleContainer>
            <ScanMedicineTitle>
              Scan <b>{TestData.name}</b>
            </ScanMedicineTitle>
          </ScanMedicineTitleContainer>
          <video class="dbrScanner-video" playsinline="true" />
        </ScannerContainer>
      </Layout>
    );
  }
}

export default ScanMedicine;
