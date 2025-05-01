export interface SupplierFormValues {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  region: string;
  country: string;
  shops: { id: string }[];
}
