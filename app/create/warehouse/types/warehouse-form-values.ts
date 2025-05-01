export interface WarehouseFormValues {
  name: string;
  size: number;
  lastDepositDate: string;
  shops: { id: string }[];
  products: { id: string }[];
}
