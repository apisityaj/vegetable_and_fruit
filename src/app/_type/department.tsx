export interface User {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  hair: { color: string };
  company: { department: string };
  address: { postalCode: string };
}

export interface TransformedData {
  [key: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: {
      Black: number;
      Blond: number;
      Chestnut: number;
      Brown: number;
      [key: string]: number;
    };
    addressUser: { [key: string]: string };
    minAge?: any;
    maxAge?: any;
  };
}
