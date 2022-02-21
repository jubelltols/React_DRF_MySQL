import React from 'react'

import { useBikes } from '../../hooks/useBikes'
import BikesTable from "../../components/Bike/BikesTable"

export default function Bikes() {
    const { bikes, deleteBike, changeStatusBike } = useBikes()

    return (
        <BikesTable bikes={bikes} deleteBike={deleteBike} changeStatusBike={changeStatusBike} />
    )
}