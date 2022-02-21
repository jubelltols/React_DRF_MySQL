import React from 'react'

import { useSlot } from '../../hooks/useSlot'
import SlotTable from "../../components/Slot/SlotTable"

export default function Bikes() {
    const { slot, deleteSlot, changeStatusSlot } = useSlot()

    return (
        <SlotTable slot={slot} deleteSlot={deleteSlot} changeStatusSlot={changeStatusSlot} />
    )
}