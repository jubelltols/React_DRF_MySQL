import React from 'react'
import { useForm } from 'react-hook-form'

import SpinnerLoading from '../Spinner/SpinnerLoading'
import { useAuth } from '../../hooks/useAuth'
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const { changePassword, status } = useAuth()
    const { t } = useTranslation("global");

    return (
        <div className="w-full p-8">
            { status.loading ? (
                <SpinnerLoading/>
            ) : (
                    <form className="space-y-4 md:space-y-6 needs-validation" onSubmit={handleSubmit(changePassword)}>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">{t("old_password")}</label>
                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="password" placeholder="Old Password" {...register("old_password", {required: true, minLength: 8})} />
                            {errors.old_password?.type === 'required' && <span className="text-danger">{t("old_password_requires")}</span>}
                            {errors.old_password && errors.old_password.type === "minLength" && <span className="text-danger">{t("min_lenght_8")}</span> }
                            {status.error && <span className="text-danger">{t("old_password_incorrect")}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">{t("password")}</label>
                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="password" placeholder="Password" {...register("password", {required: true, minLength: 8})} />
                            {errors.password?.type === 'required' && <span className="text-danger">{t("password_requires")}</span>}
                            {errors.password && errors.password.type === "minLength" && <span className="text-danger">{t("min_lenght_8")}</span> }
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">{t("repeat_password")}</label>
                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="password" placeholder="Repeat Password" {...register("password2", {required: true, minLength: 8,
                            validate:{matchesPreviousPassword: (value) => { return value === getValues("password") || "Password don't match";}}})} />
                            {errors.password2?.type === 'required' && <span className="text-danger">{t("repeat_password_requires")}</span>}
                            {errors.password2 && errors.password.type === "minLength" && <span className="text-danger">{t("min_lenght_8")}</span> }
                            {errors.password2?.type === 'matchesPreviousPassword' && <span className="text-danger">{errors.password2.message}</span>}
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