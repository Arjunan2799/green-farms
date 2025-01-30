import React from "react";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex justify-between items-center mb-6">
        <button>
          <img src="/assets/backarrow.png" alt="Back" className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Checkout</h1>
        <div></div>
      </header>

      <div className="bg-blue-100 text-blue-600 text-center py-2 rounded-lg mb-4">
        <span>Your order will be delivered on </span>
        <span className="font-semibold">16th Nov Saturday</span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="/assets/grass.png"
            alt="Order"
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div>
            <p className="font-semibold">3 Items</p>
            <button className="text-blue-500">View Details</button>
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-700 mb-2">Delivery to</h3>
          <p className="text-gray-500">
            Tower B-1802, Smondo 2 Apartment, Neotown, Chennai, 600100
          </p>
          <button className="text-blue-500 mt-2">Change</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-bold mb-4">Payment methods</h3>
        {[
          { method: "Pay Via UPI", icon: "/assets/upi_pay.png" },
          { method: "Scan QR", icon: "/assets/qr_code.png" },
          { method: "Debit/Credit Card", icon: "/assets/credit_card.png" },
          {
            method: "Cash on Delivery",
            icon: "/assets//account_balance_wallet.png",
          },
        ].map((payment, index) => (
          <button
            key={index}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-2 shadow-sm w-full"
          >
            <div className="flex items-center space-x-4">
              <img
                src={payment.icon}
                alt={payment.method}
                className="h-6 w-6"
              />
              <span>{payment.method}</span>
            </div>
            <span>₹36</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
