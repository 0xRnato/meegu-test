export interface IUser {
  id: number;
  name: string;
  birthdate: string;
  document: string;
  acceptedTermsAndConditions: boolean;
  zipcode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ICreateUser {
  name: string;
  birthdate: string;
  document: string;
  zipcode: string;
  acceptedTermsAndConditions?: boolean;
}

export interface IUpdateUser {
  name?: string;
  birthdate?: string;
  document?: string;
  acceptedTermsAndConditions?: boolean;
  zipcode?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}
