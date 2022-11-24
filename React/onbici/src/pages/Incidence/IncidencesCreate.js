import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";

import { useIncidences } from '../../hooks/useIncidences'
import { useTranslation } from "react-i18next";

export default function IncidencesCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createIncidence } = useIncidences();
    const { id } = useParams();
    const { t } = useTranslation("global");

    return (
        <section className="min-h-screen bg-base-content">
            <div className="flex flex-col items-center justify-center max-w-5xl mx-auto lg:py-16 px-6 py-8">
                <div className="grid grid-cols-3 mb-3 self-start">
                    <div className="col-span-2">
                        <p className="mb-4 text-4xl font-bold text-base-100">{t("incidence_create")}</p>
                    </div>
                </div>
                <div className="w-full bg-base-100 rounded-lg shadow">
                    <div className="p-16 sm:p-10 space-y-4 md:space-y-6">
                        <form className="space-y-4 md:space-y-6 needs-validation" onSubmit={handleSubmit(createIncidence)}>
                            {id === "null" ?
                                <div className="col-sm-12">
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium">{t("station")}</label>
                                    <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="number" placeholder="station" {...register("station", {required: true})} />
                                    {errors.station?.type === 'required' && <span className="text-danger">{t("station_required")}</span>}
                                </div>
                                :
                                <div className="col-sm-12 d-none">
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium">{t("station")}</label>
                                    <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="number" defaultValue={id} placeholder="station" {...register("station", {required: true})} />
                                    {errors.station?.type === 'required' && <span className="text-danger">{t("station_required")}</span>}
                                </div>
                            }
                        <div className="row g-3 mt-1">
                            <div className="col-sm-12">
                                <label htmlFor="status" className="block mb-2 text-sm font-medium">{t("incidence_title")}</label>
                                <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" placeholder="title" {...register("title", {required: true, maxLength: 50, minLength: 5})} />
                                {errors.title && errors.title.type === "mminLength" && <span className="text-danger">{t("min_lenght_5")}</span> }
                                {errors.title && errors.title.type === "maxLength" && <span className="text-danger">{t("max_lenght_200")}</span> }
                                {errors.title?.type === 'required' && <span className="text-danger">{t("incidence_title_required")}</span>}
                            </div>
                        </div>
                        <div className="row g-3 mt-1">
                            <div className="col-sm-12">
                            <label htmlFor="status" className="block mb-2 text-sm font-medium">{t("incidence_description")}</label>
                                <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" type="text" placeholder="description" {...register("description", {required: true, maxLength: 198, minLength: 5})} />
                                {errors.description && errors.description.type === "mminLength" && <span className="text-danger">{t("min_lenght_5")}</span> }
                                {errors.description && errors.description.type === "maxLength" && <span className="text-danger">{t("max_lenght_200")}</span> }
                                {errors.description?.type === 'required' && <span className="text-danger">{t("incidence_description_required")}</span>}
                            </div>
                        </div>
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
                                <select className='border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ' {...register("status", { required: true })}>
                                    <option value="active">active</option>
                                    <option value="disable">disable</option>
                                </select>
                                {errors.status?.type === 'required' && <span>Status is required</span>}
                            </div>
                            <p className="text-sm font-light pt-2">
                                <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100" type="submit" control-id="ControlID-20">{t("create_incidence")}</button>    
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}