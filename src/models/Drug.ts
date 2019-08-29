interface IDrug {
  barcode: string;
  name: string;
  strength: {
    value: number;
    unit: string;
  };
  quantity: {
    value: number;
    unit: string;
  };
}

export default IDrug;
