import IPrescriptionItem from "./PrescriptionItem";

interface IPrescription {
  barcode: string;
  remainingItems?: string[];
  items: {
    [barcode: string]: {
      quantity: number;
      units: string;
    };
  };
}

export default IPrescription;
