export interface StockFormValues {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  fixedDiscount: number;
  shops: { id: string }[];
}
