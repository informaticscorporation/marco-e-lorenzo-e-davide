
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Context";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ErrorePage from "./Pages/Red";
import ProdottoSingolo from "./components/utility/ProdottoSingolo";
import Loader from "./components/utility/Loader";

function App() {
  return (
    <Router>
      <ContextProvider>
        <Routes>
          
          <Route path="/" element={<Loader />} />
          <Route path="/home"element={<Home />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/product/:productId" element={<ProdottoSingolo />} />
          <Route path="*" element={<ErrorePage />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
