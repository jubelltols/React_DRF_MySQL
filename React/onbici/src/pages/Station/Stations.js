import React from 'react'

import { useStations } from '../../hooks/useStations'
import StationsTable from "../../components/Station/StationsTable"

export default function Bikes() {
    const { stations } = useStations()

    return (
        <StationsTable stations={stations} />
    )
}