import React from "react";
import { MedicineData } from "../data/medicine";
import Layout from "../components/Layout";
//@ts-ignore
import { Heading, Button, Text } from "@kiwicom/orbit-components";
import styled from "styled-components";
import TestPrescription from "../data/prescriptions/prescription-1";
import IPrescription from "../models/Prescription";
import IDrug from "../models/Drug";
import IPrescriptionItem from "../models/PrescriptionItem";

let TestPrescription2 = TestPrescription;

//@ts-ignore
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
  flex-direction: column;
`;

const ShowScannerButton = styled.div`
  position: fixed;
  bottom: 20px;
`;

export enum ScannerType {
  PRESCRIPTION,
  MEDICINE
}

interface IScannerProps {
  scannerType: ScannerType;
  scannerHeading?: string;
}

interface IScannerState {
  currentPrescription: IPrescription;
  isFetchingData: boolean;
  isPageLoading: boolean;
  scannerType?: ScannerType;
  scannerHeading?: string;
}

class Scanner extends React.Component<IScannerProps, IScannerState> {
  state: IScannerState = {
    currentPrescription: TestPrescription2,
    isFetchingData: true,
    isPageLoading: true,
    scannerHeading: ""
  };

  constructor(props: Readonly<IScannerProps>) {
    super(props);
    this.state.currentPrescription = JSON.parse(window.localStorage.getItem(
      "currentPrescription"
    ) as string);

    if (!this.state.currentPrescription) {
      this.state.scannerType = ScannerType.PRESCRIPTION;
    } else {
      this.state.scannerType = ScannerType.MEDICINE;
    }

    this.state.isFetchingData = false;
  }

  setStateAsync(state: any) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  getHeading(scannerType: ScannerType) {
    const currentItem = this.getCurrentItem() as IDrug;
    let currentItemName = currentItem ? currentItem.name : "Drug";
    if (
      this.state.currentPrescription &&
      this.state.currentPrescription.remainingItems &&
      this.state.currentPrescription.remainingItems.length === 0
    ) {
      return "Prescription Complete";
    }
    return scannerType === ScannerType.PRESCRIPTION
      ? "Scan a prescription"
      : `Scan ${currentItemName}`;
  }

  lookupDrugInfo(drugBarcode: string): IDrug | false {
    return (MedicineData[drugBarcode] as IDrug) || false;
  }

  async updateRemainingItems(prescription: IPrescription) {
    let remainingItems: string[] = [];

    Object.keys(prescription.items)
      .sort()
      .map(function(sortedKey) {
        if (prescription.items[sortedKey].quantity > 0) {
          remainingItems.push(sortedKey);
        }
      });

    await this.setStateAsync({
      ...this.state,
      currentPrescription: {
        ...prescription,
        remainingItems: remainingItems
      }
    });
  }

  getCurrentItem() {
    let currentItem;
    if (this.state.currentPrescription) {
      if (this.state.currentPrescription.remainingItems) {
        currentItem = this.lookupDrugInfo(
          this.state.currentPrescription.remainingItems[0]
        );
      }
    }

    console.log("Current item is:", currentItem);

    return currentItem;
  }

  async updatePrescription(prescription: IPrescription) {
    await this.setStateAsync({
      ...this.state,
      currentPrescription: prescription
    });

    window.localStorage.setItem(
      "currentPrescription",
      JSON.stringify(prescription)
    );

    await this.updateRemainingItems(prescription);

    await this.updateHeading(ScannerType.MEDICINE);

    alert("Checked Medicine!");
  }

  isDrugValid(prescription: IPrescription, drugBarcode: string): IDrug | false {
    const medicineInfo = this.lookupDrugInfo(drugBarcode);
    let isValid = false;

    if (medicineInfo && TestPrescription) {
      //This is where we check if the prescription item is valid
      isValid = TestPrescription.items[drugBarcode] ? true : false;
    }

    return isValid ? (medicineInfo as IDrug) : false;
  }

  async validateDrug(prescription: IPrescription, drugBarcode: string) {
    const drug = this.isDrugValid(prescription, drugBarcode);

    if (drug) {
      console.log(
        "Original Prescription Item",
        drugBarcode,
        prescription.items[drugBarcode]
      );
      console.log("Drug Item", drug);

      //This function replaces code below

      await this.updatePrescription({
        ...this.state.currentPrescription,
        items: {
          ...this.state.currentPrescription.items,
          [drugBarcode]: {
            ...this.state.currentPrescription.items[drugBarcode],
            quantity:
              prescription.items[drugBarcode].quantity - drug.quantity.value
          }
        }
      });

      console.log(
        "Prescription After Calculation",
        drugBarcode,
        this.state.currentPrescription
      );
      return true;
    } else {
      return false;
    }
  }

  showScanner() {
    let scanner: any = null;
    try {
      Dynamsoft.BarcodeScanner.createInstance({
        UIElement: document.getElementById("scanner-container"),
        onFrameRead: (results: any) => {},
        onUnduplicatedRead: (txt: any, result: any) => {
          this.validateScannedBarcode(txt);
        }
      }).then((s: any) => {
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

        scanner.show().catch((ex: any) => {
          console.log(ex);
          //alert("ex.message || ex");
          //scanner.hide();
        });
      });
    } catch (e) {
      console.log("Problem initilising barcode scanner");
    }
  }

  async componentDidMount() {
    this.showScanner();
    /* This is to initialise the state after retriving a prescription from local storage */
    if (this.state.currentPrescription) {
      await this.updateRemainingItems(this.state.currentPrescription);
      await this.updateHeading(ScannerType.MEDICINE);
    } else {
      await this.updateHeading(ScannerType.PRESCRIPTION);
    }

    console.log(
      "this is saved prescription at startup",
      this.state.currentPrescription
    );

    await this.setStateAsync({
      ...this.state,
      isPageLoading: false
    });
    console.log("State after page has loaded", this.state);
  }

  validateScannedBarcode(barcode: string) {
    if (this.state.currentPrescription.remainingItems) {
      if (this.state.currentPrescription.remainingItems.length !== 0) {
        let isDrugValid = this.validateDrug(
          this.state.currentPrescription,
          barcode
        );

        isDrugValid
          ? alert("The medicine is correct!")
          : alert("Wrong medicine!");
      }
    }
  }

  testDrugScanning() {
    if (this.state.currentPrescription.remainingItems) {
      if (this.state.currentPrescription.remainingItems.length !== 0) {
        this.validateDrug(
          this.state.currentPrescription,
          this.state.currentPrescription.remainingItems[0]
        );
      } else {
        console.log("No Items left! Your prescription is complete <3");
      }
    } else {
      throw new Error("remaningItems array does not exist!");
    }
  }

  async updateHeading(scannerType: ScannerType) {
    return await this.setStateAsync({
      ...this.state,
      scannerType: scannerType,
      scannerHeading: this.getHeading(scannerType)
    });
  }

  async testPrescriptionScanning() {
    //This will take in a scanned prescription later

    await this.updatePrescription(TestPrescription2);
    //Test of moving this makes the code simpler
    //await this.updateHeading(ScannerType.MEDICINE);
  }

  getScanButton() {
    return (
      <Button
        component={ShowScannerButton}
        onClick={() => {
          this.state.scannerType === ScannerType.MEDICINE
            ? this.testDrugScanning()
            : this.testPrescriptionScanning();
        }}
        size="large"
      >
        {this.state.scannerType === ScannerType.MEDICINE
          ? "Scan Drug"
          : "Scan Prescription"}
      </Button>
    );
  }

  render() {
    let currentItem;
    if (
      this.state.currentPrescription &&
      this.state.currentPrescription.remainingItems
    ) {
      if (this.state.currentPrescription.remainingItems.length !== 0) {
        currentItem = this.state.currentPrescription.items[
          this.state.currentPrescription.remainingItems[0]
        ];
      }
    }

    return (
      <Layout padding="0">
        <ScannerContainer id="scanner-container">
          <ScanMedicineHeader>
            <ScanMedicineTitleContainer>
              <Heading type="display">{this.state.scannerHeading}</Heading>
              <Text size="large">
                {currentItem &&
                  `${currentItem.quantity} ${currentItem.units} remaining`}
              </Text>
            </ScanMedicineTitleContainer>
          </ScanMedicineHeader>

          <video className="dbrScanner-video" playsInline={true} />
          {this.getScanButton()}
        </ScannerContainer>
      </Layout>
    );
  }
}

export default Scanner;
