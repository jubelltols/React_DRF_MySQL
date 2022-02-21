import { useState } from 'react'

import { useStations } from '../../hooks/useStations'
import StationsList from "../../components/Rent/StationsList"
import GoogleMaps from '../../components/Rent/GoogleMaps'

export default function Rent() {
    const {stations} = useStations()
    const [status, setStatus] =  useState(localStorage.getItem("statusStations") === "true" ? true : false)

    var changeStatus = () => {
        setStatus(!status)
        localStorage.setItem('statusStations', !status)
    };

    return (
        <div>
            <div className="bg-dark pe-3 ps-3 btn-group d-flex p-2 bd-highlight" role="group">
                <button className={status === true ? "btn btn-light" : "btn btn-outline-light"} onClick={changeStatus}>List</button>
                <button className={status === false ? "btn btn-light" : "btn btn-outline-light"} onClick={changeStatus}>Maps</button>
            </div>
            {status ?
                <StationsList stations={stations}/>
                :
                <GoogleMaps stations={stations}/>
            } 
        </div>
    )
}