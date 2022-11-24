import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

import RentButtons from './RentButtons'
import { useRent } from "../../hooks/useRent"

export default function StationsCard ({ station, onlyMap }) {
    const [rentClick, setRentClick]= useState(false)
    const {isRent} = useRent();
    const { t } = useTranslation("global");
    const click_rent = () => (e) => {
        e.stopPropagation();  
        setRentClick(!rentClick)
    }

    return (
        
        <div className="card w-96 bg-base-100">
            <figure>
            {station.image != null ?
                    <img className="object-cover h-60 w-96" src={"http://127.0.0.1:8000" + station.image} alt=""/>
                    :
                    <svg className="object-cover h-60 w-96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <rect width="100%" height="100%" fill="#55595c"></rect>
                    </svg>
                } 
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-xl">{station.name}</h2>
                <div className="grid grid-cols-2 gap-4 w-full pt-2">
                    <p><span className='font-bold'>{t("free_slot")}</span> {station.free_slots}</p>
                    <p><span className='font-bold'>{t("free_bike")}</span> {station.free_bikes}</p>            
                </div>
                <div className="card-actions">
                    {!onlyMap ? (
                        <div className='grid grid-row-2 gap-4 w-full pt-2'> 
                            <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100">
                                <Link to={`/incidences/create/${station.id}`}>{t("incidences")}</Link>
                            </button>
                            <div className="collapse w-full font-medium rounded-lg text-sm text-center bg-base-content text-base-100">
                                <input type="checkbox" className="peer" /> 
                                <div className="collapse-title">
                                    {isRent ? <p>{t("leave_bike")}</p> : <>{t("get_bike")}</>}
                                </div>
                                <div className="collapse-content"> 
                                    <div className="grid grid-cols-3 gap-4">
                                        {station.slots.map((slot, index) => (
                                            <div>                               
                                                <RentButtons key={index} slot={slot} index={index} click_rent={click_rent}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>) : ""
                    }
                </div>
            </div>
        </div>
    )
}