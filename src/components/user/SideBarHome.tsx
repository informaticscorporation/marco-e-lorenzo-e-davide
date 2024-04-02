import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import iconaSearch from "../../assets/iconaSearch.png";
import wl from "../../assets/wl.png";
import Cart from "../utility/Cart";

function SideBarHome() {
  const {
    quantity,
    isAdmin,
    gestProva,
    mostra,
    setMostra,
    logout,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    
    navigate("/login");
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          backgroundColor: "rgb(222 222 222)",
        }}
      >
        <div>
          <img src={iconaSearch} width="30" alt="search" />
        </div>

        <div>
          <img src={wl} width="100" alt="" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
          }}
        >
          
          <button type="button" onClick={logout}>
            LOGOUT
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleLoginClick}
          >
            Login
          </button>
          <AccountCircleIcon />
          <div
            style={{
              display: quantity > 0 ? "flex" : "none",
              position: "relative",
              background: "red",
              color: "white",
              width: "18px",
              height: "19px",
              borderRadius: "29px",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              top: "-8px",
              right: "-65px",
              zIndex: "11",
            }}
          >
            {quantity}
          </div>
          

          <Cart/>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "rgb(222 222 222)",
          height: "1px",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "1px",
            backgroundColor: "#80808059",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        ></div>
      </div> 
    </div>
  );
}
export default SideBarHome;
