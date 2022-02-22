import React from 'react'

import { useRent } from "../../hooks/useRent"

export default function RentButtons ({ slot, index, click_rent, setRentClick }) {
    const {rent, isRent, start_rent, end_rent} = useRent()

    const startRent = (slot) => (e) => {
        e.stopPropagation();
        const data = {
            "start_slot": slot.id,
            "bike": slot.bike.id
        }
        start_rent(JSON.stringify(data))
        setRentClick(false)
        click_rent()
    }

    const endRent = (slot) => (e) => {
        e.stopPropagation();
        const data = {
            "end_slot": slot.id
        }
        end_rent(JSON.stringify(data), rent.id)
        setRentClick(false)
        click_rent()
    }

    return (
        <div className='m-2'>
            {isRent ? 
                <div /* className={slot.status === "disable" ? "d-none" : "m-3"} */>
                    <button key={index} className="btn btn-primary" disabled={slot.bike} onClick={endRent(slot)}>
                        Bicycle {index+1}
                    </button>
                </div>
                :
                <div /* className={slot.status === "disable" ? "d-none" : "m-3"} */>
                    <button key={index+1} className="btn btn-warning" disabled={!slot.bike && slot.status !== "active"} onClick={startRent(slot)}>
                        Bicycle {index+1}
                    </button>
                </div>
            }
        </div>
    )
}