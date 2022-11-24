import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from "react-i18next";
import SpinnerLoading from '../Spinner/SpinnerLoading'

import { useAuth } from '../../hooks/useAuth'

export default function UpdateUser() {
    const { t } = useTranslation("global");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { updateUser, status, user } = useAuth();

    return (
        <div className="w-full bg-base-100 p-8">
            { status.loading ? (
                <SpinnerLoading/>
                ) : ( 
                    <form className="space-y-4 md:space-y-6 needs-validation" onSubmit={handleSubmit(updateUser)}>
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium">{t("first_name")}</label>
                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="text" defaultValue={user.first_name} placeholder="Adam" {...register("first_name", {required: true, maxLength: 80})} />
                            {errors.first_name && errors.first_name.type === "maxLength" && <span className="text-danger">{t("max_lenght_80")}</span> }
                            {errors.first_name?.type === 'required' && <span className="text-danger">{t("first_name_required")}</span>}
                        </div>
                        <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium">{t("last_name")}</label>
                                <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="text"  defaultValue={user.last_name} placeholder="Robin" {...register("last_name", {required: true, maxLength: 100})} />
                                {errors.last_name && errors.last_name.type === "maxLength" && <span className="text-danger">{t("max_lenght_80")}</span> }
                                {errors.last_name?.type === 'required' && <span className="text-danger">{t("last_name_required")}</span>}
                        </div>
                        <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium">{t("username")}</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text">@</span>
                                    <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="text"  defaultValue={user.username} placeholder="adam_robin" {...register("username", {required: true, minLength: 3})} />
                                </div>
                                {errors.username && errors.username.type === "minLength" && <span className="text-danger">{t("min_lenght_3")}</span> }
                                {errors.username?.type === 'required' && <span className="text-danger row">{t("username_required")}</span>}
                        </div>
                        <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">{t("email")}</label>
                                <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " type="text"  defaultValue={user.email} placeholder="adam_robin@example.com" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />
                                {errors.email && errors.email.type === "pattern" && <span className="text-danger">{t("incorrect_format_email")}</span> }
                                {errors.email?.type === 'required' && <span className="text-danger">{t("email_required")}</span>}
                                {status.error && <span className="text-danger">Some incorrect field</span>}
                        </div>
                        <p className="text-sm font-light pt-2">
                            <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100" type="submit" control-id="ControlID-20">{t("update_profile")}</button>    
                        </p>
                    </form>
                )
            }
        </div>
    );
}