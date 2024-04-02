import { useContext } from "react";
import { AppContext } from "../Context";
import MainAdmin from "../components/admin/MainAdmin";
import MainHome from "../components/user/MainHome";
import SideBarHome from "../components/user/SideBarHome";

import SideBarAdmin from "../components/admin/SideBarAdmin";


function Home() {
  const { isAdmin } = useContext(AppContext);
  return (
    <div>
      
      {isAdmin ? <SideBarAdmin /> : <SideBarHome />}
      {isAdmin ? <MainAdmin /> : <MainHome />}
      
    
    </div>
  );
}
export default Home;
