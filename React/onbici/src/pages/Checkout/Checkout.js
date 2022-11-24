import React  from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Checkout from "../../components/Checkout/Checkout";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <Checkout />
            </Elements>
        </div>
    )
}