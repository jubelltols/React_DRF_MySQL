import { t } from "i18next";
import React from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from "react-i18next";

import SpinnerLoading from "../../components/Spinner/SpinnerLoading"
import { useAuth } from '../../hooks/useAuth'

export default function Signup() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { signup, status } = useAuth();
    const { t } = useTranslation("global");

    return ( 
        <div style={{minHeight: "75vh"}}>
            { status.loading ? (
                <SpinnerLoading/>
            ) : (
                <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-neutral-content">
                        <div className="w-full bg-base-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-2xl font-bold leading-tight tracking-tight">
                                    {t("signup")}
                                </h1>
                                <form className="space-y-4 md:space-y-6 needs-validation needs-validation" onSubmit={handleSubmit(signup)}>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="w-full">
                                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium">{t("first_name")}</label>
                                            <input className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" placeholder="Adam" {...register("first_name", {required: true, maxLength: 80})} />
                                            {errors.first_name && errors.first_name.type === "maxLength" && <span className="text-danger">{t("max_lenght_80")}</span> }
                                            {errors.first_name?.type === 'required' && <span className="text-danger">{t("first_name_required")}</span>}
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium">{t("last_name")}</label>
                                            <input className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" placeholder="Robin" {...register("last_name", {required: true, maxLength: 100})} />
                                            {errors.last_name && errors.last_name.type === "maxLength" && <span className="text-danger">{t("max_lenght_80")}</span> }
                                            {errors.last_name?.type === 'required' && <span className="text-danger">{t("last_name_required")}</span>}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium">{t("username")}</label>
                                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="text" placeholder="adam_robin" {...register("username", {required: true, minLength: 3})} />
                                            {errors.username && errors.username.type === "minLength" && <span className="text-danger">{t("min_lenght_3")}</span> }
                                            {errors.username?.type === 'required' && <span className="text-danger row">{t("username_required")}</span>}
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="text" placeholder="adam_robin@example.com" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />
                                            {errors.email && errors.email.type === "pattern" && <span className="text-danger">{t("incorrect_format_email")}</span> }
                                            {errors.email?.type === 'required' && <span className="text-danger">{t("email_required")}</span>}
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium">{t("password")}</label>
                                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="password" placeholder="********" {...register("password", {required: true, minLength: 8})} />
                                            {errors.password && errors.password.type === "minLength" && <span className="text-danger">{t("min_lenght_8")}</span> }
                                            {errors.password?.type === 'required' && <span className="text-danger">{t("password_required")}</span>}
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="password2" className="block mb-2 text-sm font-medium">{t("repeat_password")}</label>
                                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="password" placeholder="********" {...register("password2", 
                                            {required: true, minLength: 8, validate:{matchesPreviousPassword: (value) => { 
                                            return value === getValues("password") || "Password don't match";}}})} />
                                            {errors.password2 && errors.password2.type === "minLength" && <span className="text-danger">{t("min_lenght_8")}</span> }
                                            {errors.password2?.type === 'matchesPreviousPassword' && <span className="text-danger">{errors.password2.message}</span>}
                                            {errors.password2?.type === 'required' && <span className="text-danger">{t("repeat_password_required")}</span>}
                                        </div>
                                    </div>
                                    <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100" type="submit" control-id="ControlID-20">{t("signup")}</button>   
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                )
            }
        </div>
    )
}