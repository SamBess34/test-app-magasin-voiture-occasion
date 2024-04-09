export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ICar {
  _id: string;
  make: string;
  model: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
}

export interface INewCar {
  make: string;
  model: string;
  image: string;
  price: number;
  description: string;
  available: boolean;
}

export interface HeaderProps {
  onSearch: (value: string) => void;
  cars: ICar[];
}

export interface IdGetOneCarRequestParams {
  params: { id: string };
}

export interface IEmailDeleteUserequestParams {
  params: { email: string };
}

export interface IDeleteAccountModalProps {
  onDelete: () => void;
}

export interface IContactFormData {
  name: string;
  email: string;
  message: string;
}
