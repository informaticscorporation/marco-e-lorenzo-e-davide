import { ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product, TContext, Table, User } from "./declaration";

export const AppContext = createContext<TContext>({
  dataLoaded: false,
  products: [],
  users: {},
  cart: [],
  paid: false,

  login: () => {},
  logout: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  setCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  setIsAdmin: () => {},
  gestProva: () => {},
  prova: false,
  setProva: () => {},
  isAdmin: false,
  checkout: () => {},
  //getTotalAvailableProduct: () => 0,
  onCheckoutSuccess: () => {},
  quantity: 0,
  updateProduct: () => {},
  mostra: false,
  setMostra: () => {},
});

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [products, setProducts] = useState<Array<Product>>([]);
  let [users, setUsers] = useState<Table<User>>({});
  const [cart, setCart] = useState<Array<Product>>([]);
  const [paid, setPaid] = useState<boolean>(false);
  const [username, setUsername] = useState(localStorage.email);
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [userReg, setUserReg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [prova, setProva] = useState(false);
  const [mostra, setMostra] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  

  const gestProva = () => setProva(!prova);
  if (!!localStorage.users) users = JSON.parse(localStorage.users);
  
  useEffect(() => {
    checkAdmin();
  }, []);

  function checkAdmin() {
    const user = localStorage.user;
    if (user) {
      const parsedUser = JSON.parse(localStorage.user);
      if (parsedUser[0].admin == true) {
        setIsAdmin(true);
      }
    }
  }

  async function getUser(email: User["email"], password: User["password"]) {
    try {
      const response = await fetch(`
        http://localhost:3000/users?email=${email}
      `);
      if (!response.ok) {
        throw new Error("Errore nella richiesta dell'utente");
      }
      const data = await response.json();

      if (!response.ok) {
        setUserReg("Email non valida");
        return alert("Email non valida");
      }

      if (!data[0]) {
        setUserReg("Email non valida");
        return alert("Email non valida");
      }

      if (data[0].password !== password) {
        setUserReg("Password non valida");
        return alert("Password non valida");
      }

      data[0].admin == "true" ? setIsAdmin(true) : setIsAdmin(false);

      localStorage.setItem("user", JSON.stringify(data));
      checkAdmin();
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }

  async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await getProducts();
        setDataLoaded(true);
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
      }
    }
    fetchData();
  }, []);



  // LOGIN
  function login(email: User["email"], password: User["password"]) {
    if (!localStorage.getItem("user")) {
      getUser(email, password);
    }
  }

  // LOGOUT
  function logout() {
    localStorage.removeItem("user");
    setIsAdmin(false);
  }

 

  // ADD TO CART

  function addToCart(productId: number | string) {
    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd) {
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );
      if (existingProductIndex !== -1) {
        const updatedCart = cart.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }

          return item;
        });
        setCart(updatedCart);
      } else {
        const updatedCart = [...cart, { ...productToAdd, qty: 1 }];
        setCart(updatedCart);
      }
    }
    setQuantity(quantity + 1);
  }

  //REMOVE FROM CART

  function removeFromCart(id: Product["id"]) {
    const existProd = cart.find((product) => product.id === id);

    if (!!existProd && existProd!.qty === 1) {
      const newCart = cart.filter((product) => product.id !== id);
      setCart(newCart);
    }

    if (!!existProd && existProd!.qty > 1) {
      const newCart = cart.map((product) =>
        product.id === id ? { ...product, qty: product.qty - 1 } : product
      );
      setCart(newCart);
      if (!!existProd && existProd!.qty > 1) {
        const newCart = cart.map((product) =>
          product.id === id ? { ...product, qty: product.qty - 1 } : product
        );
        setCart(newCart);
      }
      setQuantity(quantity - 1);
    }
    setQuantity(quantity - 1);
  }

  // CHECKOUT
  function checkout() {
    let newProd: Array<Product> = [];

    for (let i = 0; i < cart.length; i++)
      newProd = products.map((product) =>
        product.id === cart[i].id
          ? { ...product, qty: product.qty - cart[i].qty }
          : product
      );

    setProducts(newProd);
    setPaid(true);
    onCheckoutSuccess();
  }

  function onCheckoutSuccess() {
    setPaid(false);
    setCart([]);
    setQuantity(0);
  }

  function addProduct(
    title: Product["title"],
    description: Product["description"],
    price: Product["price"],
    image: Product["image"],
    qty: Product["qty"],
    category: Product["category"]
  ) {
    //let newId: number = uuidv4();
    //newId = newId+1;*/
    const productData = {
      id: uuidv4(),
      title,
      price,
      category,
      description,
      image,
      qty,
    };

    PostProducts(productData);
  }

  async function updateProduct(product: Product) {
    //debugger;
    const { title, description, qty, price, category, image } = product;

    const productId = product.id;
    const response = await fetch(
      `http://localhost:3000/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          qty,
          price,
          category,
          image,
        }),
      }
    );

    setProducts(
      products.map((item) =>
        item.id === product.id
          ? { ...item, title, description, qty, price, category, image }
          : item
      )
    );

    if (!response.ok) {
      throw new Error("Errore durante l'aggiunta del prodotto");
    } else {
      alert("Product Updated");
    }
  }

  async function removeProduct(product: Product) {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${product.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del prodotto");
      }

      const updatedProducts = products.filter((item) => item.id !== product.id);
      setProducts(updatedProducts);
    } catch (error: unknown) {
      console.error("Si è verificato un errore:", (error as Error).message);
    }
  }

  async function PostProducts(productData: Product) {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta del prodotto");
      }

      const newProduct = await response.json();
      console.log("Nuovo prodotto aggiunto:", newProduct);
      setProducts([...products, productData]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AppContext.Provider
      value={{
        dataLoaded,
        products,
        users,
        cart,
        paid,
        login,
        logout,
        setCart,
        addToCart,
        removeFromCart,
        addProduct,
        removeProduct,
        setIsAdmin,
        isAdmin,
        //testing
        gestProva,
        prova,
        setProva,
        mostra,
        setMostra,
        //----//
        checkout,
        onCheckoutSuccess,
        quantity,
        updateProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
