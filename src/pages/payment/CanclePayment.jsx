import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CanclePayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get("bookingId");

  const handleCancelTour = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this tour?\nThis action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BOOKING_SERVICE_API_URL}/cancelTourByTourist/${bookingId}`
      );

      alert(res.data.message || "Tour cancelled successfully.");
      navigate("/"); // or redirect to a success page
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to cancel the tour. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Cancel Tour
        </h2>

        <p className="text-gray-600 mb-6">
          You are about to cancel your tour booking.
          <br />
          This action <b>cannot be undone</b>.
        </p>

        <button
          onClick={handleCancelTour}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium w-full"
        >
          Confirm Cancel Tour
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-gray-500 hover:underline text-sm"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CanclePayment;
