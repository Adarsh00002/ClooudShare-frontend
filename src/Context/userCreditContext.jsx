import { useAuth } from "@clerk/clerk-react";
import { createContext, useCallback, useEffect, useState } from "react";
 import axios from "axios"; 
 import toast from "react-hot-toast";
 import { apiEndpoints } from "../Util/EndPoint";

export const userCreditContext = createContext();

const UserCreditProvider = ({ children }) => {
  const [credits, setCredits] = useState(5); 
  const [loading, setLoading] = useState(false);
  const { getToken, isSignedIn } = useAuth();

  const fetchUserCredits = useCallback(async () => {
    
    if (!isSignedIn) {
      setCredits(0);
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      
      const res = await axios.get(apiEndpoints.GET_CREDIT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     


      if (res.data && typeof res.data.credits !== 'undefined') {
        setCredits(res.data.credits);
      }
    } catch (e) {
      console.error("Credit Fetch Error:", e);
    } finally {
      setLoading(false);
    }
   
  
  }, [getToken, isSignedIn]);

  useEffect(() => {
    fetchUserCredits();
  }, [fetchUserCredits]);


  return (
    <userCreditContext.Provider
      value={{ credits, setCredits, fetchUserCredits, loading }}
    >
      {children}
    </userCreditContext.Provider>
  );
};

export default UserCreditProvider;