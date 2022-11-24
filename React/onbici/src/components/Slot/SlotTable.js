import React from 'react'
import { Link } from 'react-router-dom'

import SlotLine from './SlotLine'

export default function SlotTable ({ slot, deleteSlot, changeStatusSlot }) {

    return  (
        <section className="min-h-screen base-content bg-base-content">
            <div className="max-w-5xl px-4 py-8 mx-auto lg:py-16">
                <div className="grid grid-cols-3 mb-3">
                    <div className="col-span-2">
                        <p className="mb-4 text-4xl font-bold text-base-100">Slots</p>
                    </div>
                    <div className="text-right">
                        <Link to="/slot/create" className="btn btn-primary rounded-md font-bold">Create Slots</Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Actions</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Modified At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                slot.map(( slot, index ) => (
                                    <SlotLine key={index} slot={slot} deleteSlot={deleteSlot} changeStatusSlot={changeStatusSlot}/>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}