import React from 'react'

import { useRent } from "../../hooks/useRent"

export default function RentButtons ({ slot, index, click_rent }) {
    const {rent, isRent, start_rent, end_rent} = useRent()

    const startRent = (slot) => (e) => {
        e.stopPropagation();
        const data = {
            "start_slot": slot.id,
            "bike": slot.bike.id
        }
        start_rent(JSON.stringify(data))
        click_rent()
    }

    const endRent = (slot) => (e) => {
        e.stopPropagation();
        const data = {
            "end_slot": slot.id
        }
        end_rent(JSON.stringify(data), rent.id)
        click_rent()
    }

    return (
        <div className=''>
            {isRent ?
                <div>
                    <p>Dejar bici</p>
                    <button key={index} className="btn btn-primary p-2" disabled={slot.bike} onClick={endRent(slot)}>
                        Bicycle {index+1}
                    </button>
                </div>
                :
                <div>
                    <p>Coger bici</p>
                    <button key={index+1} className="btn btn-warning p-2" disabled={!slot.bike} onClick={startRent(slot)}>
                        Bicycle {index+1}
                    </button>
                </div>
            }
        </div>
    )
}