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
        `?orderId=${orderIdRef.current}&amount=${formattedAmount}&currency=${currency}`
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
    //test

    document.body.appendChild(form);
    form.submit();
  }

  if (loading) {
    return <div className="p-10 text-center">Preparing payment…</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Confirm Payment
      </h2>

      <p><b>Order:</b> {orderIdRef.current}</p>
      <p><b>Amount:</b> LKR {formattedAmount}</p>

      <button
        onClick={submitPayment}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        💳 Pay Now
      </button>
    </div>
  );
}
