import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { AppContext } from "../../Context";
import { useContext } from "react";
import EuroIcon from "@mui/icons-material/Euro";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";

type Anchor = "right";

export default function Cart() {
  const { cart, removeFromCart,checkout } = useContext(AppContext);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const TotalPrice = () => {
    let TotalPrice = 0;
    cart.forEach((item) => {
      TotalPrice += item.price * item.qty;
    });
    return TotalPrice.toFixed(2);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {cart.length > 0 ? cart.map((product) => (
          <ListItem key={product.id} disablePadding>
            
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "109px", height: "100px" }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={product.image}
                    alt=""
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        height: "20px",
                        width: "20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontFamily: "Roboto",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#da5353";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "red";
                      }}
                      onClick={(e) => {e.stopPropagation();removeFromCart(product.id)}}
                    >
                      x
                    </button>
                  </div>
                    <div style={{ fontFamily: "Roboto", fontSize: "16px" }}>
                      {product.title}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontFamily: "Roboto", fontSize: "16px" }}>
                      <CategoryIcon />
                      {product.category}
                    </div>
                    <div style={{ fontFamily: "Roboto", fontSize: "16px" }}>
                      <EuroIcon />
                      {product.price}
                    </div>
                    <div style={{ fontFamily: "Roboto", fontSize: "16px" }}>
                      <Inventory2Icon />
                      {product.qty}
                    </div>
                  </div>
                  
                </div>
              </div>
            
          </ListItem>
        )) : (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width: '100%',fontFamily: 'Roboto', fontSize: '3rem'}}>Carrello vuoto</div>)}
      
      </List>
      <div>
        <div>
          <p>TOTALE: € {TotalPrice()}</p>
        </div>
        <div>
          <button onClick={checkout}>paga</button>
        </div>
        
      </div>
      
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("right", true)}>
          <ShoppingBagIcon style={{ color: "black" }} />
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
