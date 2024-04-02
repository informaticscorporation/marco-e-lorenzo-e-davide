import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EuroIcon from "@mui/icons-material/Euro";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";

function ProdottoSingolo() {
  const { productId } = useParams();
  const { products, addToCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    
    setTimeout(() => {
      const productData = products.find((product) => product.id === productId);
      setProduct(productData);
      setLoading(false);
    }, 1000); 
  }, [productId, products]);

  if (loading) {
    return (
      <div
        className="loader"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (!product) {
    navigate("/error");
    return null; 
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "45px",
        width: "100%",
        gap: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <button
          style={{
            backgroundColor: "#292758",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "Roboto",
            paddingRight: "12px",
          }}
          onClick={() => navigate("/")}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#454080";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#292758";
          }}
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: "300px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "34px",
            width: "700px",
          }}
        >
          <h1 style={{ fontFamily: "Roboto" }}>{product.title}</h1>
          <p style={{ fontFamily: "Roboto" }}>
            Descrizione: {product.description}
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p style={{ fontFamily: "Roboto" }}>
              <CategoryIcon />
              {product.category}
            </p>
            <p style={{ fontFamily: "Roboto" }}>
              <EuroIcon />
              {product.price}
            </p>
            <p style={{ fontFamily: "Roboto" }}>
              <Inventory2Icon />
              {product.qty}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                width: "265px",
                padding: "10px",
                backgroundColor: "rgb(41, 39, 88)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontFamily: "Roboto",
              }}
              onClick={() => addToCart(product.id)}
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
      </div>
    </div>
  );
}

export default ProdottoSingolo;
