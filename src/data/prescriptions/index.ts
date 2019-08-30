import P1 from "./prescription-1";
import P2 from "./prescription-2";

interface IPrescriptionData {
  [index: string]: Object;
}

const PrescriptionData: IPrescriptionData = {
  "92838847653726356478": P1,
  "02938472618394763827": P2
};

export { PrescriptionData };
