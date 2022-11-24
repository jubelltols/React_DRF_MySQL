import React  from "react";
import { useTranslation } from "react-i18next";
import GoogleMaps from "../../components/Rent/GoogleMaps"

import { useStations } from '../../hooks/useStations'

export default function Map() {
    const { t } = useTranslation("global");
    const {stations} = useStations()

    return (
        <div>
            <div className="hero p-5 bg-base-100">
                <div className="hero-content text-center">
                    <div className="mx-auto max-w-screen-md text-center p-3">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold">{t("map_title")}</h2>
                        <p className="font-light sm:text-xl ">{t("map_description")}</p>
                    </div>
                </div>
            </div>
            <GoogleMaps stations={stations} onlyMap={true}/>
        </div>
    )
}