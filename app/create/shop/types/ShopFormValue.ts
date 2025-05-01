import { Employee } from '@/app/search/employees/types/employee';
import { Stocks } from '@/app/search/stocks/types/Stocks';
import { Supplier } from '@/app/search/suppliers/types/Suppliers';
import { Warehouse } from '@/app/search/warehouses/types/Warehouses';

export interface ShopFormValues {
  name: string;
  city: string;
  launchedDate: string;
  closedDate: string;
  areaValue: number;

  locationId: string | null;
  stocks: Stocks[];
  suppliers: Supplier[];
  employees: Employee[];
  warehouses: Warehouse[]
}
