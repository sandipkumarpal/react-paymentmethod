import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axis";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
};

const PaymentForm = (props) => {
  const [isSuccess, setIssuccess] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("https://2k9ml.csb.app/payment", {
          amount: 1000,
          id
        });
        if (response.data.success) {
          console.log("Payment Successful!");
          setIssuccess(true);
        }
      } catch (error) {
        console.log({ error });
        setIssuccess(false);
      }
    } else {
      console.log(error.message);
      setIssuccess(false);
    }
  };
  return (
    <div>
      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        "Success"
      )}
    </div>
  );
};

export default PaymentForm;
