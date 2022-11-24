import { t } from "i18next";
import React from "react";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

import SpinnerLoading from "../../components/Spinner/SpinnerLoading"
import { useAuth } from '../../hooks/useAuth'

export default function Signin() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, status } = useAuth();
    const { t } = useTranslation("global");
    
    return (
        <div>
            { status.loading ? (
                <SpinnerLoading/>
            ) : (
                <section className="min-h-screen bg-neutral-content">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-neutral-content">
                        <div className="w-full bg-base-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight">
                                    {t("signin")}
                                </h1>
                                <form className="space-y-4 md:space-y-6 needs-validation" onSubmit={handleSubmit(signin)}>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium" htmlFor="username">{t("username")}</label>
                                        <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="text" placeholder="Username" {...register("username", {required: true})} />
                                        {errors.username?.type === 'required' && <span className="text-danger">{t("username_required")}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium">{t("password")}</label>
                                        <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="password" placeholder="Password" {...register("password", {required: true, minLength: 8})} />
                                        {errors.password && errors.password.type === "minLength" && <span className="text-danger">{t("min_lenght_8")}</span> }
                                        {errors.password?.type === 'required' && <span className="text-danger">{t("password_required")}</span>}
                                        {status.error && <span className="text-danger">{t("incorrect_user_password")}</span>}
                                    </div>
                                    <button type="submit" className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100">Sign in</button>
                                    <p className="text-sm font-light">
                                        {t("not_account_quest")} <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t("create_one")}</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                )
            }
        </div>
    );
}