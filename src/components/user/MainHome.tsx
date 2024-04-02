import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import i from "../../assets/i.png";
import iconaSearch from "../../assets/iconaSearch.png";
import { Product } from "../../declaration";
import EuroIcon from "@mui/icons-material/Euro";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Loader from "../utility/Loader";

function MainHome() {
  const { products, addToCart, dataLoaded} = useContext(AppContext);

  const [filteredProducts, setFilteredProducts] =
    useState<Array<Product>>(products);

    const [loading, setLoading] = useState(!dataLoaded);

    useEffect(() => {
      setLoading(true); 
      setTimeout(() => {
        if (dataLoaded) {
          setFilteredProducts(products);
        }
        setLoading(false); 
      }, 200); 
    }, [dataLoaded, products]);
  // SEARCH BAR
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    const filteredArray = products.filter((product) =>
      product.title.toLowerCase().includes(searchText)
    );
    setFilteredProducts(filteredArray);
  };

  const navigate = useNavigate();

  const navigateToProduct = (productId: number | string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      {loading && <Loader />}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "34rem",
            backgroundColor: "rgb(222, 222, 222)",
            gap: "113px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "3rem", fontFamily: "Roboto" }}>
              Collections
            </h1>
            <div
              style={{
                fontSize: "1.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontFamily: "Roboto" }}>
                you can explore and shop many different collections
              </p>
              <p style={{ fontFamily: "Roboto" }}>from various brands here.</p>
            </div>
            <button
              style={{
                backgroundColor: "#292758",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "Roboto",
                scrollBehavior: "smooth",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#454080";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#292758";
              }}
              onClick={() => {
                window.scrollTo(0, 600);
              }}
            >
              Shop Now
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: "8",
                height: "400px",
                width: "320px",
                border: "3px solid #ccc",
                borderTopLeftRadius: "160px",
                borderBottomRightRadius: "160px",
              }}
            ></div>
            <img
              src={i}
              style={{
                position: "relative",
                zIndex: "9",
                height: "400px",
                width: "320px",
                borderTopLeftRadius: "160px",
                borderBottomRightRadius: "160px",
                marginLeft: "-344px",
                marginTop: "-20px",
              }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1 style={{ fontFamily: "Roboto" }}>Prodotti</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <img src={iconaSearch} width="30" alt="search" />
            <input
              type="text"
              onChange={searchHandler}
              placeholder="Search products"
            />
          </div>
        </div>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {loading ? (
            <div><Loader /></div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                style={{
                  width: "300px",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "15px",
                }}
              >
                <li
                  key={product.id}
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "15px",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  }}
                >
                  <div style={{ height: "250px", width: "200px" }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={product.image}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div>
                      <h2 style={{ fontSize: "20px" }}>{product.title}</h2>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <CategoryIcon /> {product.category}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "28px",
                            justifyContent: "space-around",
                          }}
                        >
                          <p style={{ display: "flex", alignItems: "center" }}>
                            <EuroIcon />
                            {product.price}
                          </p>
                          <p style={{ display: "flex", alignItems: "center" }}>
                            <Inventory2Icon />
                            {product.qty}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        style={{
                          padding: "10px",
                          backgroundColor: "rgb(41, 39, 88)",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontFamily: "Roboto",
                        }}
                        onClick={() => navigateToProduct(product.id)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#454080";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#292758";
                        }}
                      >
                        Visualizza Dettagli
                      </button>
                      <button
                        style={{
                          padding: "10px",
                          backgroundColor: "rgb(41, 39, 88)",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontFamily: "Roboto",
                        }}
                        onClick={() => {
                          setLoading(true); 
                          addToCart(product.id);
                          setLoading(false); 
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#454080";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#292758";
                        }}
                      >
                        Aggiungi al Carrello
                      </button>
                    </div>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MainHome;
