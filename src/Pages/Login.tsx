import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context";

function Login() {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    login(email, password);
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%"
      }}
    >
      <div style={{ width: "600px", height: "600px", borderRadius: "15px", boxShadow: "rgba(0, 0, 0, 0.50) 0px 1px 4px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            flexDirection: "column",
            gap: "62px",
          }}
        >
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "4rem",
              fontFamily: "Roboto",
            }}
          >
            Login
          </h2>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "100px" }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-arround",
                gap: "1rem",
              }}
            >
              <div style={{ width: "12rem" }}>
                <input
                className="input-field"
                  style={{ width: "100%", fontSize: "1rem",color:"#fbf1f1",fontSizeAdjust:"1rem",backgroundColor:"rgb(41, 39, 88)",border:"none",padding:"5px",borderRadius:"5px" }}
                  placeholder="Inserisci la tua email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div style={{ width: "12rem" }}>
                <input
                className="input-field"
                style={{ width: "100%", fontSize: "1rem",color:"#fbf1f1",fontSizeAdjust:"1rem",backgroundColor:"rgb(41, 39, 88)",border:"none",padding:"5px",borderRadius:"5px" }}
                  placeholder="Inserisci la tua password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "#292758",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontFamily: "Roboto",
                  scrollBehavior: "smooth",
                  fontSize: "1rem",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#454080";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#292758";
                }}
              >
                Login
              </button>
            </div>

            {error && <div style={{ color: "red" }}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
