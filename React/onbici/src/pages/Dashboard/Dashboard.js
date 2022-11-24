import React from "react";

import BarChart from "../../components/Dashboard/BarChart";
import PieChart from "../../components/Dashboard/PieChart";
import { useDashboard } from '../../hooks/useDashboard';
import SpinnerLoading from "../../components/Spinner/SpinnerLoading";

export default function Home() {
    const { data } = useDashboard()
    
    return (

        data.length === 0 ? <SpinnerLoading />
        : <section className="bg-base-content">
            <div className="grid grid-cols-3 gap-4 p-20">
                <div className="card bg-base-100 shadow-xl p-8 m-5 stats stats-vertical shadow">
                    <div className="stat">
                        <div className="stat-title">Most used station starting a rental:</div>
                        <div className="stat-value">{ data.stations[0].start_station }</div>

                    </div>
                    <div className="stat">
                        <div className="stat-title">Most used station ending a rental:</div>
                        <div className="stat-value">{ data.stations[0].end_station }</div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl p-10 m-5 col-span-2">
                    <BarChart className="w-2/5" chartData={data.chart} />
                </div>
                <div className="card bg-base-100 shadow-xl m-5 col-span-2">
                        <table className="table table-compact w-3/4">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Id user</th>
                                    <th>Id bike</th>
                                    <th>Start Slot</th>
                                    <th>End Slot</th>
                                    <th>Created At</th>
                                    <th>Modified At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.lasts_rents.map(( data, index ) => (
                                    <tr key={index}>
                                        <th>{index}</th>
                                        <th>{ data.id }</th>
                                        <th>{ data.user_id }</th>
                                        <th>{ data.bike_id }</th>
                                        <th>{ data.start_slot_id }</th>
                                        <th>{ data.end_slot_id }</th>
                                        <th>{ data.created_at }</th>
                                        <th>{ data.modified_at }</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                <div className="card bg-base-100 shadow-xl p-10 m-5">
                    <PieChart className="w-2/5" chartData={data.slots[0]} />
                </div>
            </div>
        </section>
    )
}