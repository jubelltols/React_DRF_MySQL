import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

import AuthContext from "../../context/AuthContext"
import { useSubscription } from "../../hooks/useSubscription"

export default function Subscription() {
    const { t } = useTranslation("global");
    const { subscription } = useContext(AuthContext);
    const { cancelSubscription, reactiveSubscription } = useSubscription();

    return (
        <>
            {subscription ? (
                <div className="w-full bg-base-100 p-10">
                    <div className="stats text-base-100 flex flex-row">
                        <div className="stat items-center flex-row-3 bg-primary m-3 rounded-xl shadow-lg">
                            <div className="relative">
                                <div className="" type="radio" name="price" />
                                    <div className="flex flex-col p-10 text-center">
                                        <h3 className="mb-1 text-sm font-semibold">
                                            {subscription.stripe_price_id === 'price_1Kwkx4DJ1sJyb9oO4xq9j6CH' ? t('rates_basic_title') : ''}
                                            {subscription.stripe_price_id === 'price_1KwkxWDJ1sJyb9oOhEpWn968' ? t('rates_general_title') : ''}
                                        </h3>
                                        <div className="flex justify-center items-baseline">
                                            <span className="mr-2 text-7xl font-extrabold">
                                                {subscription.stripe_price_id === 'price_1Kwkx4DJ1sJyb9oO4xq9j6CH' ? t('5€') : ''}
                                                {subscription.stripe_price_id === 'price_1KwkxWDJ1sJyb9oOhEpWn968' ? t('15€') : ''}
                                            </span>
                                            <span className="text-base-100">/month</span>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                            <div className="stat flex-row-9">
                                <div className="text-lg font-extrabold text-primary">Informacion suscripción</div>
                                <div className="grid gap-3">
                                    <div>
                                        <div className="flex items-center p-1"><span className="text-base-content w-52 text-sm font-bold">{t("period_start")}</span><p className='text-base-content'>{new Date(subscription.period_start).toLocaleString()}</p></div>
                                        <div className="flex items-center p-1"><span className="text-base-content w-52 text-sm font-bold">{t("period_end")}</span><p className='text-base-content'>{new Date(subscription.period_end).toLocaleString()}</p></div>
                                        <div className="flex items-center p-1"><span className="text-base-content w-52 text-sm font-bold">{t("cancel_at_period_end")}</span><p className='text-base-content'>{subscription.cancel_at_period_end === true ? t("yes") : t("no")}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row m-3">
                            <div className='col-sm-12 col-md-4 p-1 w-full'>
                                {subscription.cancel_at_period_end ? 
                                    <div className="text-sm font-light pt-2">
                                        <button className='w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-base-content text-base-100' onClick={(e)=>{reactiveSubscription()}}>
                                            {t("subscription_reactive")}
                                        </button>
                                    </div>
                                    :
                                    <div className="text-sm font-light pt-2">
                                        <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-base-content text-base-100" onClick={(e)=>{cancelSubscription(true)}}>
                                            {t("cancel_at_period_end")}
                                        </button>
                                    </div>
                                }
                            </div>
                            <div className='col-sm-12 col-md-4 p-1 w-full'>
                                <div className="text-sm font-light pt-2">
                                    <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-base-content text-base-100"  onClick={(e)=>{cancelSubscription(false)}}>
                                        {t("subscription_cancel_immediately")}
                                    </button>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-4 p-1 w-full'>
                                <div className="text-sm font-light pt-2">
                                    <Link to="/change-subscription" className="inline-flex justify-center w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-base-content text-base-100">
                                        {t("subscription_change")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>)
                :   <div className="flex flex-col max-w-5xl mx-auto items-center justify-center lg:py-16 px-6 py-8 min-h-16">
                        <h1>{t("without_subscription")}</h1>
                        <Link to="/checkout" className="btn btn-primary mt-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100">
                            <h4>{t("button_register")}</h4>
                        </Link>
                    </div>
        }
    </>
    );
}