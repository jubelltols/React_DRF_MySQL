import React  from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import ChangeSubscription from "../../components/Checkout/ChangeSubscription";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export default function ChangeSubscriptionPage() {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <ChangeSubscription />
            </Elements>
        </div>
    )
}