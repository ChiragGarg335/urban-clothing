import "./payment-form.scss";

import { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../../contexts/cartDropdownContext";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { totalAmount } = useContext(CartContext);

  const paymentHandler = async (e) => {
    console.log("entered");
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalAmount * 100 }),
    }).then((res) => {
      return res.json();
    });

    console.log("reached");

    if (response.error) {
      // Report to the browser that the payment failed.
      console.log(response.error);
    } else {
      // Report to the browser that the confirmation was successful, prompting
      // it to close the browser payment method collection interface.
      console.log("Successful Transaction");
      // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        response.paymentIntent.client_secret
      );
      if (error) {
        console.log(error);
        return;
      }
      if (paymentIntent.status === "succeeded") {
        console.log("Payment Completed");
      } else {
        console.warn(
          `Unexpected status: ${paymentIntent.status} for ${paymentIntent}`
        );
      }
    }
  };
  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>Payment : </h2>
        <CardElement />
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          className="button"
          onClick={paymentHandler}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};
export default PaymentForm;
