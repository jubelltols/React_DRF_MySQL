import { useState } from 'react'

import { useStations } from '../../hooks/useStations'
import StationsList from "../../components/Rent/StationsList"
import GoogleMaps from '../../components/Rent/GoogleMaps'
import { useTranslation } from "react-i18next";
import SpinnerLoading from "../../components/Spinner/SpinnerLoading";
import Toast from "../../components/Toast";

export default function Rent() {
    const {stations} = useStations()
    const [status, setStatus] =  useState(localStorage.getItem("statusStations") === "true" ? true : false)
    const { t } = useTranslation("global");
    
    var changeStatus = () => {
        setStatus(!status)
        localStorage.setItem('statusStations', !status)
    };

    return (
        stations.length === 0 ? <SpinnerLoading />
        :<div>
            <div className="btn-group p-3 grid grid-cols-2 max-w-full" role="group">
                <button className={status === true ? "btn btn-active" : "btn"} onClick={changeStatus}>{t("list_stations")}</button>
                <button className={status === false ? "btn btn-active" : "btn"} onClick={changeStatus}>{t("map")}</button>
            </div>
            {status ?
                <StationsList stations={stations}/>
                :
                <GoogleMaps stations={stations} onlyMap={false}/>
            } 
            <Toast/>
        </div>
    )
}