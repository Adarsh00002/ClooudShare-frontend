import { SignedIn, SignIn, UserButton } from "@clerk/clerk-react";
import { Menu, Share2, Wallet, X } from "lucide-react"; 
import { Link } from "react-router-dom"; 
import { useContext, useEffect, useState } from "react";
import SideMenu from "./SideManu";
import CreditsDisplay from "./CreaditsDisplay";
import { userCreditContext } from "../Context/userCreditContext";

const Navbar = ({ activeMenu }) => {

    const [openSideMenu, setOpensideMenu] = useState(false);
    const {credits, fetchUserCredits} =useContext(userCreditContext);

useEffect(()=>{
    fetchUserCredits();

},[fetchUserCredits])
    return (
        <div>
            <div className="flex items-center justify-between gap-5 bg-white w-full border border-b border-gray-200/50 backdrop-blur-[2px] py-4 sm:px-7 fixed  top-0 z-30">

                <div className="flex items-center gap-5">
                    <button 
                        onClick={() => setOpensideMenu(!openSideMenu)}
                        className="block lg:hidden text-black hover:bg-gay-100 p-1 rounded transition-colors"
                    >
                        {openSideMenu ? <X className="text-2xl" /> : <Menu className="text-2xl" />}
                    </button>

                    <div className="flex items-center gap-2">
                        <Share2 className="text-blue-600" />
                        <span className="text-lg font-medium text-black truncate">
                            Cloud Share
                        </span>
                    </div>
                </div>

                <SignedIn>
                    <div className="flex items-center justify-center gap-4">
                        
                        
                        <Link to="/subscription">
                            <CreditsDisplay credits={credits} />
                        </Link>

                        <div className="relative">
                            <UserButton />
                        </div>
                    </div>
                </SignedIn>

                {openSideMenu && (
                    <div className="fixed w-64 top-[68px] left-0 right-0 bg-white shadow-xl lg:hidden z-20">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
