import React from 'react'

import { useIncidences } from '../../hooks/useIncidences'
import IncidencesTable from "../../components/Incidence/IncidencesTable";

export default function Incidences() {
    const { incidences, deleteIncidence, changeStatusIncidences } = useIncidences()

    return (
        <IncidencesTable incidences={incidences} deleteIncidence={deleteIncidence} changeStatusIncidences={changeStatusIncidences} />
    )
}