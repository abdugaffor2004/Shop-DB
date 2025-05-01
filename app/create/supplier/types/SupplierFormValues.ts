import { Shop } from "@/app/search/shops/types/Shop";

export interface SupplierFormValues {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    region: string;
    country: string;
    shop: Shop[]
  }
  