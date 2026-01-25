import React from "react";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SuccessPayment() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // values passed from payment redirect
  const tourId = params.get("tourId");
  const referenceId = params.get("reference");
  const amount = params.get("amount");
  const currency = params.get("currency") || "LKR";

  const handleDownloadInvoice = () => {
    if (!tourId) return;

    window.open(
      `http://localhost:8087/paymentcontroller/invoice/${tourId}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-10 text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle size={88} className="text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8">
          Thank you for your payment. Your tour booking has been successfully
          confirmed.
        </p>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-gray-500">Booking Reference</span>
            <span className="font-semibold text-gray-800">
              {referenceId || "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Amount Paid</span>
            <span className="font-semibold text-green-600">
              {currency} {amount}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleDownloadInvoice}
            disabled={!tourId}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium"
          >
            <Download size={18} />
            Download Invoice
          </button>

          <button
            onClick={() => navigate("/trips")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            View My Trips
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          A confirmation email with your invoice has been sent to your email
          address.
        </p>
      </div>
    </div>
  );
}

export default SuccessPayment;
