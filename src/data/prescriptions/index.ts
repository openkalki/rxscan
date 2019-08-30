import P1 from "./prescription-1";
import P2 from "./prescription-2";
import P3 from "./prescription-3";

interface IPrescriptionData {
  [index: string]: Object;
}

const PrescriptionData: IPrescriptionData = {
  "92838847653726356478": P1,
  "02938472618394763827": P2,
  "44288477590037564534": P3
};

export { PrescriptionData };
