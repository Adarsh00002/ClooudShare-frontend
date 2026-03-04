import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import MyFiles from "./Pages/MyFiles";
import PublicFileView from "./Pages/PublicFileView";
import Subscription from "./Pages/Subscription";
import { Upload } from "lucide-react";
import Transactions from "./Pages/Transactions";
import Uploads from "./Pages/Upload";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import UserCreditProvider from "./Context/userCreditContext";

const App=()=>{
  return(

   <UserCreditProvider>
     <BrowserRouter>
     <Toaster />
     <Routes>
        <Route path="/" element={<Landing />} />
         <Route path="/dashboard" element={
            <>
            <SignedIn><Dashboard/></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
            </>
         } />
          <Route path="myfiles" element={
            <>
            <SignedIn><MyFiles/></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />
            <Route path="/subscription" element={
               <>
            <SignedIn><Subscription/></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
            </>
            } />
             <Route path="/upload" element={
               <>
            <SignedIn><Uploads/></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
            </>
             } />
              <Route path="transactions" element={
               <>
            <SignedIn><Transactions/></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
            </>
              } />
              <Route path="file/:fileId" element={
                <>
                <PublicFileView />
                </>
              } />
              <Route path="/" element={<RedirectToSignIn/>} />
     </Routes>
     </BrowserRouter>
     </UserCreditProvider>
  )
}
export default App;