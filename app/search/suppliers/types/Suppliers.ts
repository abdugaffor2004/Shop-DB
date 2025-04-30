import { Shop } from '../../shops/types/Shop';

export interface Supplier {
    id:         string;
    name:       string;
    phoneNumber:    string;
    email:      string;
    address:    string;
    city:       string;
    region:     string;
    country:    string;
    shop:       Shop;
}
