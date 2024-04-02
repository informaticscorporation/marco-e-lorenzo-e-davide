import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

function Loader() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/home');
   }
  setTimeout(handleClick, 2000);
    return (
        <div className="loader" style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '100vh'}}>
           <CircularProgress />
        </div>
    );
}
export default Loader;