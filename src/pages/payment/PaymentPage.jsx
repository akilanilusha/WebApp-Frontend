import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function PaymentPage() {
  const { tourId } = useParams();

  const [booking, setBooking] = useState(null);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(true);

  const orderIdRef = useRef(null);

  /* =========================
     FETCH BOOKING
  ========================= */
  useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line
  }, []);

  async function fetchBooking() {
    try {
      const res = await fetch(
        `http://localhost:8087/bookingservice/api/v1/get_booking_by_id/${tourId}`
      );

      if (!res.ok) throw new Error("Booking not found");

      const data = await res.json();
      setBooking(data);
    } catch (err) {
      console.error("Failed to fetch booking", err);
    }
  }

  /* =========================
     PREPARE HASH
  ========================= */
  useEffect(() => {
    if (booking) prepareHash();
    // eslint-disable-next-line
  }, [booking]);

  async function prepareHash() {
    const reference = booking.referenceId;
    const amount = Number(
      booking.routeDetails.bookingPrice
    ).toFixed(2);

    const currency = "LKR";

    if (!orderIdRef.current) {
      orderIdRef.current = `${reference}-${Date.now()}`;
    }

    const response = await fetch(
      `http://localhost:8087/paymentcontroller/getHash` +
        `?orderId=${orderIdRef.current}` +
        `&amount=${amount}` +
        `&currency=${currency}`
    );

    const hashValue = await response.text();
    setHash(hashValue);
    setLoading(false);
  }

  /* =========================
     SUBMIT PAYMENT
  ========================= */
  function submitPayment() {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.payhere.lk/pay/checkout";

    const amount = Number(
      booking.routeDetails.bookingPrice
    ).toFixed(2);

    const currency = "LKR";

    const fields = {
      merchant_id: "1233436",

      return_url:
        `${import.meta.env.VITE_WEB_APP_URL}/payment-success` +
        `?tourId=${tourId}` +
        `&reference=${booking.referenceId}` +
        `&amount=${amount}` +
        `&currency=${currency}`,

      cancel_url:
        `${import.meta.env.VITE_WEB_APP_URL}/payment-cancel` +
        `?tourId=${tourId}` +
        `&reference=${booking.referenceId}`,

      notify_url:
        `${import.meta.env.VITE_PAYMENTSERVICE_API_URL}/notify`,

      order_id: orderIdRef.current,
      items: "TripGenix Tour Package",
      currency,
      amount,

      first_name: booking.bookingDetails.nameOfBooker,
      last_name: "",
      email: booking.bookingDetails.bookerEmail,
      phone: booking.bookingDetails.bookerPhone,
      address: booking.tripDetails.startLocation,
      city: "Sri Lanka",
      country: "Sri Lanka",

      hash,
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  /* =========================
     LOADING
  ========================= */
  if (loading || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Preparing payment…
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      
      {/* LEFT — TERMS */}
      <div className="lg:w-1/2 w-full bg-gray-200 p-8 lg:p-12">
        <h1 className="text-3xl font-bold mb-6">
          Terms & Conditions
        </h1>

        <ul className="list-disc list-inside space-y-4 text-gray-700">
          <li>Payments are processed securely.</li>
          <li>Amount shown is final and confirmed.</li>
          <li>Refunds follow company policy.</li>
          <li>By paying, you agree to our platform rules.</li>
        </ul>
      </div>

      {/* RIGHT — PAYMENT */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-2 bg-blue-600"></div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Confirm Payment
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Reference</span>
                <span className="font-medium">
                  {booking.referenceId}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Amount</span>
                <span className="font-semibold text-blue-600">
                  LKR {Number(
                    booking.routeDetails.bookingPrice
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <hr className="my-6" />

            <button
              onClick={submitPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl text-lg font-semibold"
            >
              💳 Pay Now
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              🔒 Secure payment powered by PayHere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
