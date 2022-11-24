import React from 'react'

import { useRent } from "../../hooks/useRent"
import { useTranslation } from "react-i18next";

export default function RentButtons ({ slot, index, click_rent }) {
    const {rent, isRent, start_rent, end_rent} = useRent()
    const { t } = useTranslation("global");

    const startRent = (slot) => (e) => {
        e.stopPropagation();
        const data = {
            "start_slot": slot.id,
            "bike": slot.bike.id
        }
        start_rent(JSON.stringify(data))
    }

    const endRent = (slot) => (e) => {
        e.stopPropagation();
        const data = {
            "end_slot": slot.id
        }
        end_rent(JSON.stringify(data), rent.id)
    }

    return (
        <>
            {isRent ?
                <button key={index} className="btn btn-primary p-2" disabled={slot.bike} onClick={endRent(slot)}>
                    {t("bike")} {index+1}
                </button>
                :
                <button key={index+1} className="btn btn-warning p-2" disabled={!slot.bike} onClick={startRent(slot)}>
                    {t("bike")} {index+1}
                </button>
            }
        </>
    )
}