import { Shop } from '@/app/search/shops/types/Shop';


export interface EmployeeFormValues {
  firstName: string;
  lastName: string;
  position: string;
  acceptDate: string;
  terminationDate: string;
  email:string;
  phonenumber:string;
  shopId: string | null;
}
