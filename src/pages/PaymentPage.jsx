import { PayPalButtons } from "@paypal/react-paypal-js";

const totalAmount = 10; 

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-150 to-blue-200 p-6">
      <div className="backdrop-blur-xl bg-white/60 shadow-2xl border border-white/30 rounded-3xl p-12 w-full max-w-lg min-h-[550px] animate-fadeIn">


        <h1 className="text-4xl font-extrabold text-center mb-16 tracking-wide drop-shadow-sm">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Secure Checkout
        </span>
        <span className="ml-2">💳</span>
        </h1>


        {/* Product Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">
            Tour Package
          </h2>

          <div className="flex justify-between items-center bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <span className="text-gray-700 text-lg">Total Amount</span>
            <span className="text-2xl font-semibold text-blue-700">${totalAmount}</span>
          </div>
        </div>

        {/* PayPal Button */}
        <div className="mt-auto pt-9">
          <PayPalButtons
            style={{
              layout: "vertical",
              shape: "rect",
              height: 45,
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: { 
                      currency_code:"USD",
                      value: totalAmount.toString()
                   },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert("Payment Successful! Thank you, " + details.payer.name.given_name);
              });
            }}
            onError={(err) => {
              console.error(err);
              alert("Payment failed. Please try again.");
            }}
          />
        </div>

      </div>
    </div>
  );
}