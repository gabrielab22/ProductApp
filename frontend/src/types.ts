export interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  availability: number;
  companyId: number;
}

export interface Company {
  birth: string;
  country: string;
  employee: number;
  id: number;
  name: string;
}
