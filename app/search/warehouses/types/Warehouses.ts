import { Product } from '../../products/types/products';
import { Shop } from '../../shops/types/Shop';

export interface Warehouse {
    id:         string;
    name:       string;
    size:    number;
    count:      number;
    lastDepositDate: string;
    shops:       Shop;
    product:Product;

}
