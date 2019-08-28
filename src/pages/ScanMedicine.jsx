import React from "react";
import TestData from "../data/medicine/Atorvastatin-40mg";
import Layout from "../components/Layout";
import { Heading, Button } from "@kiwicom/orbit-components";
import styled from "styled-components";

const Dynamsoft = window.Dynamsoft;

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  width: 100%;
`;

const ScanMedicineHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const ScanMedicineTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ShowScannerButton = styled.div`
  position: fixed;
  bottom: 20px;
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
      // scanner.updateVideoSettings({
      //   video: { width: 720, height: 720, facingMode: "environment" }
      // });

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
      <Layout padding="0">
        <ScannerContainer id="scanner-container">
          <ScanMedicineHeader>
            <ScanMedicineTitleContainer>
              <Heading type="display">
                Scan <b>{TestData.name}</b>
              </Heading>
            </ScanMedicineTitleContainer>
          </ScanMedicineHeader>

          <video class="dbrScanner-video" playsinline="true" />
          <Button
            component={ShowScannerButton}
            onClick={() => {
              this.showScanner();
            }}
            size="large"
            // type="secondary"
          >
            Show Scanner
          </Button>
        </ScannerContainer>
      </Layout>
    );
  }
}

export default ScanMedicine;
