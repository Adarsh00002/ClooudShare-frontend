import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import { AlertCircle, Loader2, Receipt } from "lucide-react";
import axios from "axios";
import { apiEndpoints } from "../Util/EndPoint";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        const response = await axios.get(
          apiEndpoints.FETCH_TRANSATION,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError(
          "Failed to load your transaction history. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [getToken]);

 
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const formatAmount = (amount) => `₹${amount}`;

 
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="p-6">
      
        <div className="flex items-center gap-2 mb-6">
          <Receipt className="text-purple-600" />
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>

      
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

       
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Loading transactions...</span>
          </div>
        ) : transactions.length === 0 ? (
         
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No Transactions Yet
            </h3>
            <p className="text-gray-500">
              You have not made any credit purchases yet. Visit the Subscription
              page to buy credits.
            </p>
          </div>
        ) : (
          <>
           
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Credits Added
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Payment ID
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(transaction.transactionDate)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.planId
                          ? transaction.planId.charAt(0) +
                            transaction.planId.slice(1).toLowerCase() +
                            " Plan"
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatAmount(transaction.amount)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.creditAdded}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-center">
                        {transaction.paymentId
                          ? transaction.paymentId.substring(0, 12) + "..."
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="flex justify-end items-center gap-4 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-4 py-2 rounded-lg font-medium
                  ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }
                `}
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-4 py-2 rounded-lg font-medium
                  ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }
                `}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
