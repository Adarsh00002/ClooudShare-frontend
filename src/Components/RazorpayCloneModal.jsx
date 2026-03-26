import { useState } from "react";

const RazorpayCloneModal = ({ open, amount, onClose, onSuccess }) => {
  const [tab, setTab] = useState("upi");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const payNow = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      
      onSuccess({
        paymentId: "FAKE_PAY_" + Date.now(),
        amount: amount,
        status: "SUCCESS",
        method: tab,
      });

    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="font-semibold text-lg">Razorpay Secure</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Amount */}
        <div className="px-5 py-4 bg-gray-50">
          <p className="text-sm text-gray-500">Paying</p>
          <h3 className="text-2xl font-bold">₹{amount}</h3>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {["upi", "card", "wallet"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium ${
                tab === t
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5">
          {tab === "upi" && (
            <input className="w-full border p-2 rounded" placeholder="Enter UPI ID" />
          )}

          {tab === "card" && (
            <>
              <input className="w-full border p-2 rounded mb-2" placeholder="Card Number" />
              <div className="flex gap-2">
                <input className="w-1/2 border p-2 rounded" placeholder="MM/YY" />
                <input className="w-1/2 border p-2 rounded" placeholder="CVV" />
              </div>
            </>
          )}

          {tab === "wallet" && (
            <select className="w-full border p-2 rounded">
              <option>Paytm</option>
              <option>PhonePe</option>
              <option>Amazon Pay</option>
            </select>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            disabled={loading}
            onClick={payNow}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            {loading ? "Processing..." : "Pay Securely"}
          </button>

          <p className="text-xs text-center text-gray-400 mt-2">
            Secured by Razorpay (Demo)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RazorpayCloneModal;
