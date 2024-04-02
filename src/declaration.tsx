export interface Product {
  id: number | string;
  title: string;
  price: number | number;
  category: string;
  description: string;
  image: string;
  qty: string | number;
}

export interface User {
  email: string;
  password: string;
  name: string;
  admin: boolean;
  first: boolean;
}

export interface Table<T> {
  [key: string]: T;
}

export interface TContext {
  dataLoaded: boolean;
  products: Array<Product>;
  users: Table<User>;
  cart: Array<Product>;
  paid: boolean;
  login: (
    email: User["email"],
    password: User["password"]
  ) => void;
  logout: () => void;
  addToCart: (productId: number | string) => void;
  setCart: (cart: Array<Product>) => void;
  removeFromCart: (productId: Product["id"]) => void;
  addProduct: (
    title: Product["title"],
    description: Product["description"],
    price: Product["price"],
    image: Product["image"],
    qty: Product["qty"],
    category: Product["category"]
  ) => void;
  removeProduct: (product: Product) => void;
  setIsAdmin: (admin: boolean) => void;
  gestProva: () => void;
  setProva: (prova: boolean) => void;
  checkout: () => void;
  onCheckoutSuccess: () => void;
  isAdmin: boolean;
  prova: boolean;
  quantity: number;
  updateProduct: (product: Product) => void;
  mostra: boolean;
  setMostra: (mostra: boolean) => void;
}
