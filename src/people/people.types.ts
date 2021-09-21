export type Person = {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  entity: string;
  birthDate: string;
  email: string;
  phone: string;
  address: Address;
  isManager: boolean;
  manager?: string;
  managerId?: string;
};

export type Address = {
  street: string;
  postalCode: string;
  city: string;
};
