import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function Homepage() {
    const { t } = useTranslation("global");

    return (
        <div>
            <div className="hero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://img.freepik.com/vector-gratis/alquiler-bicicletas-concepto-diseno-isometrico_1284-21936.jpg?w=740&t=st=1652378712~exp=1652379312~hmac=48f6ea82c8644fcb6daba44e07304f7808485c43ab8b0f449631e16e4a5e58aa" className="max-w-sm" alt=""/>
                    <div>
                        <h1 className="text-5xl font-bold">{t("home_title")}</h1>
                        <p className="py-6">{t("home_description")}</p>
                        <button className="btn btn-primary">
                            <Link to="/signup">
                                {t("button_register")}
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex bg-primary text-primary-content">
                <div className="flex-1">
                    <div class="col-span-3 row-span-3 mx-2 grid place-items-center items-center gap-4 w-full">
                        <img src="http://127.0.0.1:8000/media/svg/bici.svg"  alt="bike" height="200" width="200" />
                    </div>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">45</h2>
                        <p>{t("home_number_bike")}</p>
                    </div>
                </div>
                <div className="flex-1">
                <div class="col-span-3 row-span-3 mx-2 grid place-items-center items-center gap-4 w-full">
                        <img src="http://127.0.0.1:8000/media/svg/totem.svg"  alt="totem" height="200" width="200" />
                    </div>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">15</h2>
                        <p>{t("home_number_station")}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-6 mb-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1">
                <div className="rounded-lg lg:block m-3">
                    <div className="card bg-primary-content shadow-xl min-h-full p-3">
                        <Link to="/howItsWork">
                            <div className="card-body">
                                <h2 className="card-title">{t("home_work_title")}</h2>
                                <p>{t("home_work_description")}</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-y-8">
                    <div className="card bg-primary text-base-100 shadow-xl p-3 m-3">
                        <Link to="/rates">
                            <div className="card-body">
                                <h2 className="card-title">{t("home_plan_title")}</h2>
                                <p>{t("home_plan_description")}</p>
                            </div>
                        </Link>
                    </div> 
                    <div className="card bg-primary-focus text-base-100 shadow-xl p-3 m-3">
                        <Link to="/map">
                            <div className="card-body">
                                <h2 className="card-title">{t("home_map_title")}</h2>
                                <p>{t("home_map_description")}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}