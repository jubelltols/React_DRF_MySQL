import React from "react";
import { useTranslation } from "react-i18next";

export default function PricingCard ({price, register, index, subscription}) {
    const { t } = useTranslation("global");

    return (
        <li className="relative" key={index}>
            <input {...register("price", { required: true })} className="sr-only peer" type="radio" value={price.value} name="price" disabled={subscription?.price === price.value ? true : false} id={price.title}  />
            <label className="flex flex-col p-10 text-center bg-white border border-gray-300 rounded-lg cursor-pointer 
                focus:outline-none hover:bg-gray-50 peer-checked:ring-primary-focus peer-checked:ring-2 peer-checked:border-transparent" htmlFor={price.title}>
                <h3 className="mb-1 text-sm font-semibold">{t(price.title)}</h3>
                <div className="flex justify-center items-baseline">
                    <span className="mr-2 text-7xl font-extrabold">{price.price}</span>
                    <span className="text-gray-500">/month</span>
                </div>
            </label>  
        </li>
    );
};