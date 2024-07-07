import React, { useEffect, useState } from "react";
import "./Payment.css";
import Header from "../components/Home/Header";
import axios from "axios";
import OrderDetails from "./../components/Cart/OrderDetails";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState(204.47); // amount in EGP
  const [usdAmount, setUsdAmount] = useState((amount * 0.021).toFixed(2)); // Example amount in USD for PayPal
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://e-learning-platform-uwoj.onrender.com/user/get-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);
  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleProcessPayment = () => {
    if (paymentMethod === "paypal") {
      alert(`Payment processed in USD via PayPal: ${usdAmount} $`);
      // Implement PayPal payment processing
    } else if (paymentMethod === "vodafone") {
      alert(`Payment processed via Vodafone Cash ${amount} EGP`);
      // Implement Vodafone Cash payment processing
    }
  };

  return (
    <>
      <Header />
      <h1>Checkout</h1>
      <div className="payment-page">
        <div className="payment-details-container">
          <div className="payment-method">
            <h2>Payment method</h2>
            <div className="payment-methods">
              <div className="payment-option">
                <div className="radio-container">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => handlePaymentMethod("paypal")}
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
                {paymentMethod === "paypal" && (
                  <div className="payment-details">
                    <p>
                      In order to complete your transaction, we will transfer
                      you over to PayPal's secure servers.
                    </p>
                    <p>
                      ⚠️ Unfortunately, PayPal does not support payments in EGP,
                      therefore your payment will be in USD.
                    </p>
                    <p>
                      The amount you will be charged by PayPal is {usdAmount} $
                    </p>
                  </div>
                )}
              </div>

              <div className="payment-option">
                <div className="radio-container">
                  <input
                    type="radio"
                    id="vodafone"
                    name="paymentMethod"
                    value="vodafone"
                    checked={paymentMethod === "vodafone"}
                    onChange={() => handlePaymentMethod("vodafone")}
                  />
                  <img
                    src="https://www.egblog.news/wp-content/uploads/2024/03/melwmat_aktr_en_fwdafwn_kash_wazay_astlf_mn_vodafone_cash_8364b32049-800x500.webp"
                    alt="Vodafone Cash"
                  />
                  <label htmlFor="vodafone">Vodafone</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <OrderDetails courses={courses} />
          </div>
        </div>
        <div className="summary">
          <h2>Summary</h2>
          <p>
            Original Price: <span>£9,799.95</span>
          </p>
          <p>
            Total: <span>£9,799.95</span>
          </p>
          <button className="complete-checkout" onClick={handleProcessPayment}>
            Proceed
          </button>
        </div>
      </div>
    </>
  );
}

export default Payment;
