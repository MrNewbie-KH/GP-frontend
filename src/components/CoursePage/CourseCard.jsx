// import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useState } from "react";
import Button from "../Button";
import InfoItem from "./InfoItem";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CourseCard({ information }) {
  const token = localStorage.getItem("token");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPOP, setShowPOP] = useState(false);
  const nav = useNavigate();
  const AddToCart = () => {
    axios
      .post(
        `https://e-learning-platform-uwoj.onrender.com/user/add-to-cart?courseId=${information.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        if (response.data.message === "Course added to cart") {
          toast.success("Course added to cart");
        } else {
          toast.error("already in cart");
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching courses:", error);
        toast.error("Failed to add item to cart!");
      });
  };

  function formatDuration(seconds) {
    const pad = (num) => String(num).padStart(2, "0");

    if (seconds < 3600) {
      const minutes = Math.ceil(seconds / 60);
      return `${pad(minutes)} min`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      return `${hours}hr${remainingMinutes}min`;
    }
  }

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleProcessPayment = () => {
    if (paymentMethod === "paypal") {
      console.log(information);
      window.location.href = `https://e-learning-platform-uwoj.onrender.com/payment/create/${information.id}/${token}`;
    } else if (paymentMethod === "vodafone") {
      axios
        .post(
          "https://e-learning-platform-uwoj.onrender.com/enroll-course",
          {
            couponCode: "",
            courseId: information.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            nav("/course/" + information.id);
          }, 2000);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
          toast.error("Something went wrong");
        });
    } else if (!information.price) {
      {
        axios
          .post(
            "https://e-learning-platform-uwoj.onrender.com/enroll-course",
            {
              couponCode: "",
              courseId: information.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            toast.success(response.data.message);
            setTimeout(() => {
              nav("/course/" + information.id);
            }, 2000);
          })
          .catch((error) => {
            console.error("Error fetching courses:", error);
            toast.error("Something went wrong");
          });
      }
    }
  };

  return (
    <>
      <div className="course-card-viewer">
        <img src={information.imageUrl} alt="" />
        {!information.isSubscribed ? (
          <>
            <div className="course-card-info">
              <div>
                {" "}
                {information.price ? (
                  <p>Price {information.price} EGP</p>
                ) : (
                  <p>Free</p>
                )}
              </div>
              <div className="course-card-buttons">
                <button className="button" onClick={AddToCart}>
                  Add to cart
                </button>{" "}
                <button
                  className="button"
                  onClick={() => {
                    console.log(information.price);
                    !information.price
                      ? handleProcessPayment()
                      : setShowPOP(!showPOP);
                  }}
                >
                  Buy now
                </button>
              </div>
            </div>
            {/* <p>30 days money back</p> */}
          </>
        ) : (
          <></>
        )}
        <ul className="info-List-course-card">
          <li>
            <span>language</span>
            <span>{information.language}</span>
          </li>
          <li>
            <span>level</span>
            <span>{information.level}</span>
          </li>
          {information.duration ? (
            <li>
              <span>Duration</span>
              <span>{formatDuration(information.duration)}</span>
            </li>
          ) : (
            <></>
          )}
          <li>
            <span>Students</span>
            <span>{information.numberOfEnrollments}</span>
          </li>
          <li>
            <span>Rating</span>
            <span>
              {information.averageRating} ({information.numberOfRatings}{" "}
              ratings)
            </span>
          </li>
        </ul>
        <ToastContainer position="bottom-center" />
      </div>
      <div>
        {showPOP ? (
          <div className="payment-popup">
            <div className="popup-content">
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
                      The amount you will be charged by PayPal is{" "}
                      {(information.price * 0.021).toFixed(2)} $
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
            {paymentMethod && (
              <button className="submit-button" onClick={handleProcessPayment}>
                Procceed
              </button>
            )}
          </div>
        ) : null}
      </div>{" "}
    </>
  );
}

export default CourseCard;
