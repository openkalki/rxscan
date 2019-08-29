/* Prescription 1 */
import Drug1 from "./5021691032069";
import Drug2 from "./5012617009791";
import Drug3 from "./5012617019783";

interface IMedicineData {
  [index: string]: Object;
}

const MedicineData: IMedicineData = {
  "5021691032069": Drug1,
  "5012617009791": Drug2,
  "5012617019783": Drug3
};

export { MedicineData };
