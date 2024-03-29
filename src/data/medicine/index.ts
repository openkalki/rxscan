import IDrug from "../../models/Drug";

/* Prescription 1 */
import Drug1 from "./5012617009791";
import Drug2 from "./5012617019783";
import Drug3 from "./5060149311141";
import Drug4 from "./5000123104307";
import Drug5 from "./5023497400615";
import Drug6 from "./5021691032076";
import Drug7 from "./5017123055164";
import Drug8 from "./5012854010178";
import Drug9 from "./5021730030926";
import Drug10 from "./5017007014515";
import Drug11 from "./5060013941627";
import Drug12 from "./5012727912189";

interface IMedicineData {
  [index: string]: IDrug;
}

interface IBarcodeMap {
  [index: string]: string;
}

export const MedicineData: IMedicineData = {
  "5012617009791": Drug1,
  "5012617019783": Drug2,
  "5060149311141": Drug3,
  "5000123104307": Drug4,
  "5023497400615": Drug5,
  "5021691032076": Drug6,
  "5017123055164": Drug7,
  "5012854010178": Drug8,
  "5021730030926": Drug9,
  "5017007014515": Drug10,
  "5060013941627": Drug11,
  "5012727912189": Drug12
};

export const BarcodeMapping: IBarcodeMap = {
  "5012617009791": "5012617009791",
  "5012617019783": "5012617019783",
  "5060149311141": "5060149311141",
  "5050650001051": "5060149311141",
  "8901175007479": "5060149311141",
  "5017007023364": "5060149311141",
  "5000123104307": "5000123104307",
  "5023497400615": "5023497400615",
  "5021691032076": "5021691032076",
  "5051089990183": "5021691032076",
  "5017123055164": "5017123055164",
  "5012854010178": "5012854010178",
  "5021730030926": "5021730030926",
  "5055132708367": "5021730030926",
  "5017007014515": "5017007014515",
  "5060013941627": "5060013941627",
  "5012727912189": "5012727912189",
  "5060013940927": "5012727912189"
};

export const normailseBarcode = (barcode: string) => {
  if (barcode) {
    const normalisedBarcode = BarcodeMapping[barcode];
    return normalisedBarcode ? normalisedBarcode : false;
  }

  return false;
};
