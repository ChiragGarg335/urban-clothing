import "./payment-form.scss";

import { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../../contexts/cartDropdownContext";
import { UserContext } from "../../contexts/userContext";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { totalAmount } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  // const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    console.log("entered");
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    //   setIsProcessingPayment(true);
    const details={
        amount:10000
    }
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {'amount':1000},
    }).then((res) => {
        return res.json();
      });
    
    //   const clientSecret = response.paymentIntent.client_secret;
    console.log("reached");
    const {
      paymentIntent: { client_secret },
    } = response;
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Yihua Zhang",
        },
      },
    });

    //   setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
    }
  };
  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>Credit Card : </h2>
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
