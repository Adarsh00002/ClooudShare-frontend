import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { userCreditContext } from "../Context/userCreditContext";
import RazorpayCloneModal from "../Components/RazorpayCloneModal";
import { apiEndpoints } from "../Util/EndPoint";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { pricingPlans } from "../assets/data";

const Subscription = () => {
  const { credits, fetchUserCredits } = useContext(userCreditContext);
  const { getToken } = useAuth();

  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    fetchUserCredits();
  }, [fetchUserCredits]);

  const buyPlan = (p) => {
    setPlan(p);
    setOpen(true);
  };

  const paymentSuccess = async (payment) => {
    setOpen(false);
    try {
      const token = await getToken();
     
      await axios.post(
        apiEndpoints.UPDATE_CREDIT,
        {
          paymentId: payment.paymentId,
          amount: payment.amount,
          plan: plan.name,
          status: payment.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUserCredits();
    } catch (error) {
      console.error("❌ Failed to update credits", error);
    }
  };

  return (
    <DashboardLayout activeMenu="Subscription">
     
      <div className="max-w-7xl mx-auto px-8 py-10">

        
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-3xl p-10 shadow-xl mb-12 flex items-center justify-between">
          <div>
            <p className="text-xl font-medium opacity-90">
              Your Current Credits
            </p>
            <h2 className="text-5xl font-extrabold mt-2">
              {credits}
            </h2>
          </div>
          <div className="text-right max-w-sm">
            <p className="text-base opacity-80">
              Use credits to upload and process files without interruption.
            </p>
          </div>
        </div>

        
        <div className="grid md:grid-cols-3 gap-10">
          {pricingPlans.map((p, index) => (
            <div
              key={index}
              className={`border rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 relative ${
                p.highlighted ? "bg-purple-50 border-purple-400" : "bg-white"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-4 right-6 bg-purple-700 text-white text-sm px-4 py-1.5 rounded-full font-semibold shadow">
                  Recommended
                </div>
              )}

              <h3 className="text-3xl font-bold mb-3 text-gray-900">
                {p.name}
              </h3>

              <p className="text-gray-500 mb-6 text-base">
                {p.description}
              </p>

              <p className="text-4xl font-extrabold mb-8 text-gray-900">
                ₹{p.price}
              </p>

              <ul className="text-gray-700 mb-8 space-y-3 text-base">
                {p.features.map((f, i) => (
                  <li key={i}>✅ {f}</li>
                ))}
              </ul>

              <button
                onClick={() =>
                  buyPlan({
                    amount: Number(p.price),
                    credits: Number(p.price),
                    name: p.name,
                  })
                }
                className={`w-full py-4 rounded-2xl text-lg font-semibold transition duration-300 ${
                  p.highlighted
                    ? "bg-purple-700 hover:bg-purple-800 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      
      <RazorpayCloneModal
        open={open}
        amount={plan?.amount}
        onClose={() => setOpen(false)}
        onSuccess={paymentSuccess}
      />
    </DashboardLayout>
  );
};

export default Subscription;
