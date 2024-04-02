import { useNavigate } from "react-router-dom";
import p from "../assets/p.png";
function ErrorePage() {
    const navigate = useNavigate();
    function handleClick() { 
        navigate('/');
    }
    setTimeout(handleClick, 1000);   
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", backgroundColor: "#fefefe" }}>
           <img src={p} alt="pagina non trovata" />
        </div>
    )
}
export default ErrorePage