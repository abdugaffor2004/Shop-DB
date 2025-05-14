import { Shop } from '../../shops/types/Shop';

export interface Location {
  id: string;
  region: string;
  climate: string;
  populationCount: number;

  shops: Shop[];
}
