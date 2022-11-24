import React from 'react'
import { Link } from 'react-router-dom'

import IncidencesLine from './IncidencesLine'

export default function IncidencesTable ({ incidences, deleteIncidence, changeStatusIncidences }) {

    return  (
        <section className="min-h-screen bg-base-content">
            <div className="max-w-5xl px-4 py-8 mx-auto lg:py-16">
                <div className="grid grid-cols-3 mb-3">
                    <div className="col-span-2">
                        <p className="mb-4 text-4xl font-bold text-base-100">Incidences</p>
                    </div>
                    <div className="text-right">
                        <Link to="/incidences/create/null" className="btn btn-primary rounded-md font-bold">Create Incidences</Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Actions</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Modified At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                incidences.map(( incidence, index ) => (
                                    <IncidencesLine key={index} incidence={incidence} deleteIncidence={deleteIncidence} changeStatusIncidences={changeStatusIncidences}/>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}