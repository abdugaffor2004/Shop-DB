import { Shop } from '../../shops/types/Shop';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  acceptDate: string;
  terminationDate: string;
  email: string;
  phoneNumber: string;
  shop: Shop;
}
