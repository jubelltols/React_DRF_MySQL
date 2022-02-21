import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import RentButtons from './RentButtons'
import { useRent } from "../../hooks/useRent"

export default function StationsCard ({ station }) {
    const [rentClick, setRentClick ]= useState(false)
    const {isRent} = useRent();
    const click_rent = () => (e) => {
        e.stopPropagation();  
        setRentClick(!rentClick)
    }

    return (
        <div className="col">
            <div className="card shadow-sm">

                {station.image != null ?
                    <img className="bd-placeholder-img card-img-top" width="100%" height="175" src={"http://127.0.0.1:8000" + station.image} alt=""/>
                    :
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <rect width="100%" height="100%" fill="#55595c"></rect>
                    </svg>
                } 
                <div className="card-body">
                    <h5 className="card-title">{station.name}</h5>
                    <div className='d-flex justify-content'>
                        <p className="card-text">Free slots: {station.free_slots}</p>
                        <p className='ms-3 me-3'>|</p>
                        <p className="card-text">Free Bikes: {station.free_bikes}</p>
                    </div>
                    { rentClick ?
                                <div className='d-flex justify-content'>
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-1">
                                        {station.slots.map((slot, index) => (
                                            <RentButtons key={index} slot={slot} index={index} click_rent={click_rent}/>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div className="d-flex justify-content">
                                    <button className="btn btn-dark text-light p-0 me-2">
                                        <Link className="nav-link m-0 text-white" to={`/incidences/create/${station.id}`}>Incidences</Link>
                                    </button>
                                    <button className="btn btn-dark p-2" onClick={click_rent()}>
                                        {isRent ? "Leave bike" :  "Rent a bike"}
                                    </button>
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}