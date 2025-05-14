import { Category } from '@/app/search/products/types/products';

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  costPrice: number;
  brand: string;
  weight: number;
  size: string;
  color: string;
  quantityInWarehouse: number;
  isActive: boolean;
  createdAt: string;
  categoryId: string | null;
  shops: { id: string }[];

  category: Omit<Category, 'id'>;
}
