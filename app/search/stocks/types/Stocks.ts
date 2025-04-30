import { Shop } from '../../shops/types/Shop';

export interface Stocks {
    id:string;
    title:string;
    description:string;
    startDate:string;
    endDate:string;
    discountPercentage: number;
    fixedDiscount:    number;
    shop:       Shop;
}
