export type ListPage = {
  name: string;
  link: string;
};

export type VegetableAndFruit = {
  type: "Fruit" | "Vegetable";
  name: string;
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
    title: string;
  };
  address: {
    address: string;
    coordinates: {
      lat: string;
      lng: string;
    };
  };
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface MemberTableProps {
  paginatedUsers: User[];
}
