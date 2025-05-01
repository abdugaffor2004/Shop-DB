import { Shop } from '@/app/search/shops/types/Shop';


export interface StockFormValues {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  fixedDiscount: number;
  shops: Shop[]
}
