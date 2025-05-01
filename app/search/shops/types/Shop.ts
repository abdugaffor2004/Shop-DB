import { Employee } from '../../employees/types/employee';
import { Location } from '../../location/types/location';

export interface Shop {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  launchedDate: string;
  closedDate: string;
  areaValue: number;
  location: Location;

  employees: Employee[];
}
