import React  from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'

export default function NotFound() {
    const { t } = useTranslation("global");

    return (
        <section className="bg-base-content min-h-screen">
            <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                <div className="mx-auto  text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-base-100 md:text-4xl">{t("not_found")}</p>
                    <p className="mb-4 text-lg font-light text-base-200">{t("not_found_description")}</p>
                    <Link to={`/`} className="inline-flex text-base-100 bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">{t("back_home")}</Link>
                </div>   
            </div>
        </section>
    )
}