import React from "react";
import "./Payment.css";
import Header from "../components/Home/Header";

function Payment() {
  return (
    <>
      <Header />
      <div className="payment-page">
        <div className="payment-info">
          <h1>Order Summary</h1>
          <p>
            Total: <span>$1000</span>
          </p>
          <p>
            Payment method: <span>Credit Card</span>
          </p>
          <p>
            Billing address: <span>1234 Street Name</span>
          </p>
        </div>
        <div className="payment-btn">
          <button>Pay Now</button>
        </div>
      </div>
    </>
  );
}

export default Payment;
