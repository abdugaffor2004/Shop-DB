import { Category } from '@/app/search/products/types/products'; 
import { Shop } from '@/app/search/shops/types/Shop';

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  costPrice: number;
  brand: string;
  weight: number;
  size: number;
  color: string;
  quantityInWarehouse: number;
  isActive: boolean;
  createdAt: string;
  category: Category[];
  shops: Shop[];
}
