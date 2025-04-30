import { Shop } from '../../shops/types/Shop';

export interface Category{
    id: string;
    name: string;
    description: string;
}
export interface Product {
    id: string;
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
    category: Category;
    shop:       Shop;
}
