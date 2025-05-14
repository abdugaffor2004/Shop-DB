import { Location } from '@/app/search/location/types/location';

export interface ShopFormValues {
  name: string;
  city: string;
  launchedDate: string;
  closedDate: string;
  areaValue: number;

  locationId: string | null;
  stocks: { id: string }[];
  suppliers: { id: string }[];
  employees: { id: string }[];
  warehouses: { id: string }[];

  location: Omit<Location, 'id'>;
}
