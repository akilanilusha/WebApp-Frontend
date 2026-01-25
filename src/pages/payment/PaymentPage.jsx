import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export default function PaymentPage() {
  const { ref } = useParams();
  const [searchParams] = useSearchParams();

  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency");

  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(true);

  const orderIdRef = useRef(null);

  if (!orderIdRef.current) {
    orderIdRef.current = `${ref}-${Date.now()}`;
  }

  const formattedAmount = Number(amount).toFixed(2);

  useEffect(() => {
    prepareHash();
    // eslint-disable-next-line
  }, []);

  async function prepareHash() {
    const response = await fetch(
      `http://localhost:8087/paymentcontroller/getHash` +
        `?orderId=${orderIdRef.current}&amount=${formattedAmount}&currency=${currency}`,
    );

    const hashValue = await response.text();
    setHash(hashValue);
    setLoading(false);
  }

  function submitPayment() {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.payhere.lk/pay/checkout";

    const fields = {
      merchant_id: "1233436",
      return_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-cancel",
      notify_url: "http://localhost:8087/payment-notify",

      order_id: orderIdRef.current,
      items: "TripGenix Tour Package",
      currency: currency,
      amount: formattedAmount,

      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",

      hash: hash,
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

  if (loading) {
    return <div className="p-10 text-center">Preparing payment…</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT SIDE — TERMS */}
      <div className="w-1/2 bg-gray-200 p-12 relative flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Terms & Conditions
        </h1>

        {/* TERMS LIST */}
        <div className="space-y-5 text-gray-700 text-base leading-relaxed overflow-y-auto pr-6">
          <p>
            Please read the following terms and conditions carefully before
            proceeding with the payment.
          </p>

          <ul className="list-disc list-inside space-y-4">
            <li>
              All payments are processed securely using encrypted payment
              gateways.
            </li>
            <li>
              The displayed amount is an estimated cost and may change depending
              on the final trip route, distance, or additional services.
            </li>
            <li>
              Any pricing changes will be communicated to you and confirmed
              before charging the payment.
            </li>
            <li>
              Cancellations and refunds are handled according to company refund
              policies.
            </li>
            <li>
              By proceeding with the payment, you agree to comply with all
              platform rules and usage policies.
            </li>
          </ul>
        </div>

        {/* CONTACT BUTTON */}
        <div className="absolute bottom-12 left-12">
          <button className="flex items-center gap-3 px-10 py-4 rounded-full bg-white border border-blue-600 text-blue-600 font-semibold shadow hover:bg-blue-50 transition">
            📞 Contact Us
          </button>
        </div>
      </div>

      {/* RIGHT SIDE — PAYMENT */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* TOP ACCENT */}
          <div className="h-2 bg-blue-600"></div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Confirm Payment
            </h2>

            {/* PAYMENT DETAILS */}
            <div className="space-y-6 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order No</span>
                <span className="font-medium text-right break-all">
                  {orderIdRef.current}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="font-medium">LKR {formattedAmount}</span>
              </div>
            </div>

            <hr className="my-6" />

            {/* TOTAL */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-semibold">Amount Due</span>
              <span className="text-2xl font-bold text-blue-600">
                LKR {formattedAmount}
              </span>
            </div>

            {/* PAY BUTTON */}
            <button
              onClick={submitPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-xl text-lg font-semibold shadow"
            >
              💳 Pay Now
            </button>

            {/* SECURITY NOTE */}
            <p className="text-xs text-gray-400 text-center mt-4">
              🔒 Secure payment. Your information is protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
