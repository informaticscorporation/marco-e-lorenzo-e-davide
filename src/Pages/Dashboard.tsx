import { useContext, useState } from "react";
import { AppContext } from "../Context";


function Dashboard() {
  const { addProduct } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [qty, setQty] = useState(0);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="titolo"
      />
      <input
        type="number"
        value={price}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPrice(parseInt(event.target.value))
        }
        placeholder="prezzo"
      />
      <input
        type="text"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        placeholder="categoria"
      />
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="descrizione"
      />
      <input
        type="text"
        value={image}
        onChange={(event) => setImage(event.target.value)}
        placeholder="immagine"
      />
      <input
        type="number"
        value={qty}
        onChange={(event) => setQty(parseInt(event.target.value))}
        placeholder="qty"
      />
      <button
        type="button"
        onClick={() =>
          addProduct(title, description, price, image, qty, category)
        }
      >
        AGGIUNGI
      </button>
    </div>
   
  );
}
export default Dashboard;
