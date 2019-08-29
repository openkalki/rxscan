/* Prescription 1 */
import Drug1 from "./5012617009791";
import Drug2 from "./5012617019783";

interface IMedicineData {
  [index: string]: Object;
}

const MedicineData: IMedicineData = {
  "5012617009791": Drug1,
  "5012617019783": Drug2
};

export { MedicineData };
