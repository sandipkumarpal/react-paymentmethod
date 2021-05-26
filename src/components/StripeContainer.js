import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51IuetqSCouSkGuIuFZWoKYt3ebiKYkq6WtmWJw9TkJNHcxQBo3d04t2BR323gb78BX73jskfoNz0bLP0RzDcoZ3p00MydVeFpk";

const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
