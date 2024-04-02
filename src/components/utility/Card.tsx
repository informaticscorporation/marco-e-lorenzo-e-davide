import React, { useContext, useState } from "react";
import { AppContext } from "../../Context";
import { Product } from "../../declaration";

function Card({ product }: { product: Product }) {
  const { updateProduct, removeProduct, mostra} =
    useContext(AppContext);
  const [mod, setMod] = useState<boolean>(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState<number>(product.price);
  const [qty, setQty] = useState<number | string>(product.qty);
  const [description, setDescr] = useState(product.description);
  const [category, setCat] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const id = product.id;

  return (
    <>
      {mostra ? (
      
        <div
          key={product.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              alignItems: "center",
              padding: "10px",
              borderRadius: "15px",
              backgroundColor: "rgb(222, 222, 222);",
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
                <h2>{product.title}</h2>
                <div style={{ display: "flex" }}>
                  <p>Prezzo: ${product.price}</p>
                  <p>Categoria: {product.category}</p>
                  <p>qty: {product.qty}</p>
                </div>
              </div>
              <div>
                <button type="button" onClick={() => setMod(!mod)}>
                  MODIFICA PRODOTTO
                </button>
                <button type="button" onClick={() => removeProduct(product)}>
                  ELIMINA PRODOTTO
                </button>
              </div>
            </div>
          </li>
        </div>
      ) : null}

      {mod ? (
        <div>
          <input
            type="text"
            placeholder="titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="descrizione"
            value={description}
            onChange={(e) => setDescr(e.target.value)}
          />
          <input
            type="text"
            placeholder="immagine"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            placeholder="categoria"
            value={category}
            onChange={(e) => setCat(e.target.value)}
          />
          <input
            type="number"
            placeholder="quantità"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="prezzo"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <button
            type="button"
            onClick={() => {
              updateProduct({
                id,
                description,
                title,
                qty,
                image,
                price,
                category,
              });
            }}
          >
            MODIFICA
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Card;
