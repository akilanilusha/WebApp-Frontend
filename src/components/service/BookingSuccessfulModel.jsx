import { Check } from "lucide-react";

export default function BookingSuccessfulModel({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white text-gray-900 rounded-xl shadow-xl w-[380px] p-8 text-center">
        
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
          <Check className="text-green-600 w-7 h-7" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">
          Payment successful
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          Your booking has been confirmed successfully.
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-2 rounded-lg font-medium"
        >
          Go back to dashboard
        </button>
      </div>
    </div>
  );
}
