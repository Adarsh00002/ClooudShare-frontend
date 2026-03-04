import { useUser } from "@clerk/clerk-react";
import { Children } from "react";
import Navbar from "../Components/Navbar";
import SideMenu from "../Components/SideManu";

const DashboardLayout=({children,activeMenu}) =>{

    const {user}=useUser();

    return(
        <div>
           {/* Navbar component goes here  */}
          <Navbar  activeMenu={activeMenu}/>
           {user && (
            <div className="flex">

                <div className="max-[1080px]:hidden">
                    {/*Side Menu goes here  */}
                    <SideMenu activeMenue={activeMenu} />

                </div>
                <div className="grow  sm:mx-5 overflow-hidden sm:overflow-auto mt-15 sm:mt-20 ">
                        {children}
                </div>
            </div>

           )}
        </div>
    )
}

export default DashboardLayout;
