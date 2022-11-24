import React, { useContext, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';

import SpinnerLoading from "../Spinner/SpinnerLoading";
import { useSubscription } from '../../hooks/useSubscription'
import AuthContext from '../../context/AuthContext'
import PricingCard from './PricingCard'

export default function ChangeSubscription () {
    const [ error, setError ] = useState(null);
    const { updateSubscription, status, setStatus } = useSubscription();
    const { subscription } = useContext(AuthContext);
    const { t } = useTranslation("global");
    const { register, handleSubmit, formState: { errors } } = useForm();

    const radios = [
        { title: 'rates_basic_title', description: "rates_basic_description", price:"5€", value: 'price_1Kwkx4DJ1sJyb9oO4xq9j6CH' },
        { title: 'rates_general_title', description: "rates_general_description", price:"15€", value: "price_1KwkxWDJ1sJyb9oOhEpWn968" }
    ];
    
    const handleChange = (event) => {
        if (event.error) {
            setError(event.error.message);
        } else {
            setError(null);
        }
        setStatus({ loading: false, error: false, error_message:"" })
    }

    const handleSubmitUpdate = async (data, event) => {
        event.preventDefault();
        const priceId = data.price;

        updateSubscription({ priceId })
    };

    return (
        <>
            { status.loading ? (
                <SpinnerLoading/>
            ) : (
                <section className="min-h-screen bg-gray-900">
                    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto lg:py-16 px-6 py-8">
                        <div className="grid grid-cols-3 mb-3 self-start">
                            <div className="col-span-2">
                                <p className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">{t("subscription_change")}</p>
                            </div>
                        </div>
                        <div className="w-full bg-base-100 rounded-lg shadow">
                            <div className="p-16 sm:p-10 space-y-4 md:space-y-6">
                                {<form onSubmit={handleSubmit(handleSubmitUpdate)} className="needs-validation">
                                    <label className="block mb-2 text-sm font-medium" htmlFor="plan">
                                        {t("select_subscription")}
                                    </label>
                                    <div>
                                        <ul className="grid grid-cols-2 gap-x-2 m-4 max-w-full mx-auto">
                                            {radios.map((radio, index) => (
                                                <PricingCard register={register} price={radio} index={index} subscription={subscription}/>
                                            ))}
                                        </ul>
                                    </div>
                                    <label className="block mb-2 text-sm font-medium" htmlFor="card-element">
                                        {t("credit_card")}
                                    </label>
                                    <CardElement id="card-element" onChange={handleChange} />
                                    {errors.price && <div className="card-errors" role="alert">{t('required_price')}</div>}
                                    <div className="card-errors" role="alert">{error}</div>
                                    <div className="card-errors" role="alert">{status.error_message}</div>
                                    <div className="text-sm font-light pt-2">
                                        <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100" type="submit" control-id="ControlID-20">Submit Payment</button>    
                                    </div>
                                </form>}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};